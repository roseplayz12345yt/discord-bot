# Discord Bot (Cloudflare Workers)

A simple Discord bot that runs for **free** on [Cloudflare Workers](https://workers.cloudflare.com).

It uses Discord’s **Interactions** (slash commands) so it doesn’t need a permanent WebSocket connection.

### Commands
| Command | Description |
|---------|-------------|
| `/ping` | Replies with Pong + latency |
| `/hello` | Greets you |
| `/info` | Shows bot information |

---

## 1. Create a Discord Application + Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → give it a name
3. Go to **Bot** → click **Add Bot** → confirm
4. Under **Token**, click **Reset Token** and copy it (this is `DISCORD_TOKEN`)
5. Go to **General Information** and copy the **Application ID** (`DISCORD_APPLICATION_ID`)
6. Go to **General Information** → copy the **Public Key** (`DISCORD_PUBLIC_KEY`)

### Invite the bot to your server

1. Go to **OAuth2 → URL Generator**
2. Select scopes: `bot` and `applications.commands`
3. Select permissions: `Send Messages`, `Use Slash Commands`
4. Copy the generated URL and open it in your browser to invite the bot

---

## 2. Deploy to Cloudflare Workers (Free)

### Prerequisites
- A free [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Node.js installed on your computer

### Steps

```bash
# Clone the repo
git clone https://github.com/roseplayz12345yt/discord-bot.git
cd discord-bot

# Install dependencies
npm install

# Login to Cloudflare (one-time)
npx wrangler login
```

### Set the secrets

```bash
npx wrangler secret put DISCORD_TOKEN
# paste your bot token

npx wrangler secret put DISCORD_PUBLIC_KEY
# paste the Public Key from the Developer Portal

npx wrangler secret put DISCORD_APPLICATION_ID
# paste the Application ID
```

### Deploy

```bash
npm run deploy
```

After deploying, Cloudflare will give you a URL that looks like:
```
https://discord-bot.your-username.workers.dev
```

---

## 3. Tell Discord where the bot lives

1. Go back to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to **General Information**
4. Find **Interactions Endpoint URL**
5. Paste your Cloudflare Worker URL:
   ```
   https://discord-bot.your-username.workers.dev
   ```
6. Click **Save Changes**

Discord will send a PING to verify it works. If it saves successfully, you’re good!

---

## 4. Register the slash commands

```bash
# Set the variables temporarily
export DISCORD_TOKEN="your_bot_token"
export DISCORD_APPLICATION_ID="your_application_id"

# Register the commands
npm run register
```

You should see:
```
✅ Successfully registered commands:
  /ping
  /hello
  /info
```

Now go to any server the bot is in and try typing `/ping`!

---

## Local development

```bash
npm run dev
```

This starts a local version. You’ll need a tunnel (like Cloudflare Tunnel or ngrok) if you want Discord to reach it.

---

## Notes

- Cloudflare Workers free plan is more than enough for a personal bot.
- This bot only responds to slash commands (no message content intent needed).
- You can add more commands by editing `src/index.js` and re-registering them.

---

Made for free hosting on Cloudflare Workers ⚡
