# Discord Bot (Cloudflare Workers)

A simple Discord bot that runs **for free** on Cloudflare Workers.

**Works completely from your phone — no computer or terminal needed.**

### Commands
| Command | Description |
|---------|-------------|
| `/ping` | Replies with Pong |
| `/hello` | Greets you |
| `/info` | Shows bot information |

---

## Fix: Interactions Endpoint URL not working?

Most of the time this happens because:

1. You used the old code that required an npm package
2. The **Public Key** is wrong
3. The secrets were not saved correctly

### Do this now (updated code):

1. Go to your Worker in the [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Edit code**
3. **Delete everything** in the editor
4. Open this link and copy **all** the new code:  
   **[Latest index.js (Raw)](https://raw.githubusercontent.com/roseplayz12345yt/discord-bot/main/src/index.js)**
5. Paste it into Cloudflare → **Save and Deploy**
6. Make sure these 3 secrets exist under **Settings → Variables and Secrets**:

| Name | Value |
|------|-------|
| `DISCORD_TOKEN` | Your Bot Token |
| `DISCORD_PUBLIC_KEY` | Your **Public Key** (from General Information) |
| `DISCORD_APPLICATION_ID` | Your Application ID |

7. Go back to Discord Developer Portal → your app → **General Information**
8. Paste your Worker URL again into **Interactions Endpoint URL** and click **Save Changes**

If it still fails, double-check that you copied the **Public Key** (not the Client Secret or Bot Token).

---

## Full Phone Setup Guide

### Step 1 – Create the Discord Bot

1. Open [Discord Developer Portal](https://discord.com/developers/applications)
2. **New Application** → name it → Create
3. Go to **Bot** tab → **Add Bot**
4. Click **Reset Token** → copy the token (save it)
5. Go to **General Information** and copy:
   - **Application ID**
   - **Public Key** ← very important!

### Step 2 – Invite the bot

1. Go to **OAuth2 → URL Generator**
2. Check scopes: `bot` + `applications.commands`
3. Check permissions: `Send Messages` + `Use Slash Commands`
4. Copy the URL at the bottom → open it → invite the bot

### Step 3 – Create the Worker on Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Create Worker**
3. Name it (e.g. `discord-bot`) → **Deploy**
4. Click **Edit code**
5. Delete the default code
6. Paste the code from:  
   [https://raw.githubusercontent.com/roseplayz12345yt/discord-bot/main/src/index.js](https://raw.githubusercontent.com/roseplayz12345yt/discord-bot/main/src/index.js)
7. **Save and Deploy**

### Step 4 – Add Secrets

In the Worker → **Settings** → **Variables and Secrets** → add:

- `DISCORD_TOKEN`
- `DISCORD_PUBLIC_KEY`
- `DISCORD_APPLICATION_ID`

### Step 5 – Set Interactions Endpoint URL

1. Copy your Worker URL (looks like `https://discord-bot.xxxxx.workers.dev`)
2. In Discord Developer Portal → **General Information**
3. Paste it into **Interactions Endpoint URL**
4. Click **Save Changes**

### Step 6 – Register the commands

Open this page on your phone:  
**[Register Commands](https://raw.githack.com/roseplayz12345yt/discord-bot/main/register.html)**

Paste your Bot Token + Application ID → tap **Register Commands**

---

After that, try `/ping` in your server!
