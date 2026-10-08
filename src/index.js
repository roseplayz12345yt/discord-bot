/**
 * Discord Bot for Cloudflare Workers
 * Pure JavaScript - no external packages needed
 * Works when pasted directly into the Cloudflare editor
 */

export default {
  async fetch(request, env) {
    // Simple GET so you can test the URL in browser
    if (request.method === 'GET') {
      return new Response('Discord Bot is online! ✅', {
        headers: { 'content-type': 'text/plain' },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');
    const body = await request.text();

    // Verify the request really came from Discord
    const isValid = await verifyDiscordRequest(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY
    );

    if (!isValid) {
      return new Response('Invalid request signature', { status: 401 });
    }

    const interaction = JSON.parse(body);

    // Discord sends a PING when you save the Interactions Endpoint URL
    // We must reply with a PONG (type 1)
    if (interaction.type === 1) {
      return json({ type: 1 });
    }

    // Handle slash commands
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
            embeds: [
              {
                title: 'Bot Information',
                description: 'This bot is hosted for free on Cloudflare Workers.',
                color: 0x5865f2,
                fields: [
                  { name: 'Runtime', value: 'Cloudflare Workers', inline: true },
                  { name: 'Commands', value: '`/ping`  `/hello`  `/info`', inline: true },
                ],
              },
            ],
          },
        });
      }

      // Unknown command
      return json({
        type: 4,
        data: {
          content: 'Unknown command.',
          flags: 64,
        },
      });
    }

    return new Response('Unknown interaction type', { status: 400 });
  },
};

function json(obj) {
  return new Response(JSON.stringify(obj), {
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * Verify Discord interaction signature using Web Crypto API
 * (works in Cloudflare Workers with zero dependencies)
 */
async function verifyDiscordRequest(body, signature, timestamp, publicKey) {
  if (!signature || !timestamp || !publicKey) return false;

  try {
    const encoder = new TextEncoder();
    const message = encoder.encode(timestamp + body);

    // Convert hex public key to Uint8Array
    const publicKeyBytes = hexToBytes(publicKey);
    const signatureBytes = hexToBytes(signature);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      publicKeyBytes,
      { name: 'Ed25519', namedCurve: 'Ed25519' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify('Ed25519', cryptoKey, signatureBytes, message);
  } catch (err) {
    console.error('Signature verification failed:', err);
    return false;
  }
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}
