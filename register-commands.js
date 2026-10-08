/**
 * Run this once after setting your environment variables:
 * node register-commands.js
 *
 * Or with env vars:
 * DISCORD_TOKEN=... DISCORD_APPLICATION_ID=... node register-commands.js
 */

const TOKEN = process.env.DISCORD_TOKEN;
const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

if (!TOKEN || !APPLICATION_ID) {
  console.error('Please set DISCORD_TOKEN and DISCORD_APPLICATION_ID environment variables');
  process.exit(1);
}

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong and latency',
  },
  {
    name: 'hello',
    description: 'Says hello to you',
  },
  {
    name: 'info',
    description: 'Shows information about this bot',
  },
];

async function register() {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bot ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('✅ Successfully registered commands:');
    data.forEach(cmd => console.log(`  /${cmd.name}`));
  } else {
    const text = await response.text();
    console.error('Failed to register commands:', response.status, text);
  }
}

register();
