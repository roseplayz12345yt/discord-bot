/**
 * Discord Bot for Cloudflare Workers
 * Pure JavaScript - works when pasted into the Cloudflare editor
 */

export default {
  async fetch(request, env) {
    try {
      // Allow GET so you can test the URL in a browser
      if (request.method === 'GET') {
        return new Response('Discord Bot is online! ✅\n\nIf you see this, the Worker is running.', {
          headers: { 'content-type': 'text/plain' },
        });
      }

      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }

      const signature = request.headers.get('X-Signature-Ed25519') || '';
      const timestamp = request.headers.get('X-Signature-Timestamp') || '';
      const body = await request.text();

      const publicKey = env.DISCORD_PUBLIC_KEY;

      // Debug: if public key is missing, return a clear error
      if (!publicKey) {
        console.error('DISCORD_PUBLIC_KEY secret is missing');
        return new Response('DISCORD_PUBLIC_KEY is not set', { status: 500 });
      }

      const isValid = await verifyDiscordRequest(body, signature, timestamp, publicKey);

      if (!isValid) {
        console.error('Signature verification failed');
        return new Response('Invalid request signature', { status: 401 });
      }

      let interaction;
      try {
        interaction = JSON.parse(body);
      } catch (e) {
        return new Response('Invalid JSON', { status: 400 });
      }

      // Discord PING → must reply with PONG
      if (interaction.type === 1) {
        return json({ type: 1 });
      }

      // Slash commands
      if (interaction.type === 2) {
        const name = interaction.data?.name;

        if (name === 'ping') {
          return json({
            type: 4,
            data: { content: '🏓 Pong!' },
          });
        }

        if (name === 'hello') {
          const user = interaction.member?.user || interaction.user;
          return json({
            type: 4,
            data: {
              content: `Hello <@${user.id}>! 👋 I'm running on Cloudflare Workers.`,
            },
          });
        }

        if (name === 'info') {
          return json({
            type: 4,
            data: {
              embeds: [{
                title: 'Bot Information',
                description: 'This bot is hosted for free on Cloudflare Workers.',
                color: 0x5865f2,
                fields: [
                  { name: 'Runtime', value: 'Cloudflare Workers', inline: true },
                  { name: 'Commands', value: '`/ping` `/hello` `/info`', inline: true },
                ],
              }],
            },
          });
        }

        return json({
          type: 4,
          data: { content: 'Unknown command.', flags: 64 },
        });
      }

      return new Response('Unknown interaction type', { status: 400 });
    } catch (err) {
      console.error('Worker error:', err);
      return new Response('Internal error', { status: 500 });
    }
  },
};

function json(obj) {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * Verify Discord signature using Web Crypto (Ed25519)
 */
async function verifyDiscordRequest(body, signature, timestamp, publicKey) {
  try {
    if (!signature || !timestamp || !publicKey) return false;

    const encoder = new TextEncoder();
    const message = encoder.encode(timestamp + body);

    const publicKeyBytes = hexToUint8Array(publicKey);
    const signatureBytes = hexToUint8Array(signature);

    // Cloudflare Workers support Ed25519
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      publicKeyBytes,
      { name: 'Ed25519' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify(
      { name: 'Ed25519' },
      cryptoKey,
      signatureBytes,
      message
    );
  } catch (err) {
    console.error('verifyDiscordRequest error:', err.message);
    return false;
  }
}

function hexToUint8Array(hex) {
  // Remove any whitespace or 0x prefix just in case
  hex = hex.trim().replace(/^0x/i, '');
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}
