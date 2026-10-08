/**
 * Discord Bot hosted on Cloudflare Workers
 * Supports slash commands via Discord Interactions API
 */

import { verifyKey } from 'discord-interactions';

// Environment variables (set as Cloudflare secrets)
// DISCORD_TOKEN          - Bot token
// DISCORD_PUBLIC_KEY     - Public key from Discord Developer Portal
// DISCORD_APPLICATION_ID - Application ID

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'GET') {
      return new Response('Discord Bot is running on Cloudflare Workers! 🚀', {
        headers: { 'content-type': 'text/plain' },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Verify the request really came from Discord
    const signature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');
    const body = await request.text();

    const isValid = verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
    if (!isValid) {
      return new Response('Invalid request signature', { status: 401 });
    }

    const interaction = JSON.parse(body);

    // Handle Discord PING (required)
    if (interaction.type === 1) {
      return json({ type: 1 }); // PONG
    }

    // Handle slash commands (type 2)
    if (interaction.type === 2) {
      const commandName = interaction.data.name;

      switch (commandName) {
        case 'ping':
          return json({
            type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
            data: {
              content: `🏓 Pong! Latency: ${Date.now() - Number(timestamp) * 1000}ms`,
            },
          });

        case 'hello':
          const user = interaction.member?.user || interaction.user;
          return json({
            type: 4,
            data: {
              content: `Hello <@${user.id}>! 👋 I'm a Discord bot running on **Cloudflare Workers**.`,
            },
          });

        case 'info':
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
                    { name: 'Language', value: 'JavaScript', inline: true },
                    { name: 'Commands', value: '`/ping` `/hello` `/info`', inline: false },
                  ],
                  footer: { text: 'Made with ❤️ on Cloudflare' },
                },
              ],
            },
          });

        default:
          return json({
            type: 4,
            data: {
              content: 'Unknown command.',
              flags: 64, // Ephemeral
            },
          });
      }
    }

    return new Response('Unknown interaction type', { status: 400 });
  },
};

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}
