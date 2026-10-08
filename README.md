# Discord Bot (Cloudflare Workers)

A simple Discord bot that runs **for free** on Cloudflare Workers.

**Works completely from your phone — no computer or terminal needed.**

### Commands
| Command | Description |
|---------|-------------|
| `/ping` | Replies with Pong + latency |
| `/hello` | Greets you |
| `/info` | Shows bot information |

---

## Setup Completely on Your Phone

### Step 1 – Create the Discord Bot

1. Open this link: [Discord Developer Portal](https://discord.com/developers/applications)
2. Tap **New Application** → give it a name → **Create**
3. Go to the **Bot** tab → **Add Bot** → confirm
4. Tap **Reset Token** → **Copy** the token (save it in your Notes app)
5. Go to **General Information** and copy these two things:
   - **Application ID**
   - **Public Key**

### Step 2 – Invite the bot to your server

1. Still in the Developer Portal, go to **OAuth2 → URL Generator**
2. Under **Scopes** check:
   - `bot`
   - `applications.commands`
3. Under **Bot Permissions** check:
   - `Send Messages`
   - `Use Slash Commands`
4. Copy the URL at the bottom and open it in your browser
5. Choose your server → **Authorize**

### Step 3 – Deploy the bot on Cloudflare (all in browser)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) and create a free account / log in
2. In the left menu tap **Workers & Pages**
3. Tap **Create** → **Create Worker**
4. Name it something like `discord-bot` → tap **Deploy**
5. After it deploys, tap **Edit code**
6. Delete all the code that’s already there
7. Open this link: [src/index.js (Raw)](https://raw.githubusercontent.com/roseplayz12345yt/discord-bot/main/src/index.js)
8. Select all the code → Copy
9. Paste it into the Cloudflare editor
10. Tap **Save and Deploy**

### Step 4 – Add your secrets

1. In the Worker page, go to **Settings** → **Variables and Secrets**
2. Tap **Add** under Secrets and create these three:

| Name | What to paste |
|------|---------------|
| `DISCORD_TOKEN` | Your Bot Token |
| `DISCORD_PUBLIC_KEY` | Your Public Key |
| `DISCORD_APPLICATION_ID` | Your Application ID |

### Step 5 – Connect Discord to your Worker

1. Copy your Worker URL (it looks like `https://discord-bot.xxxxx.workers.dev`)
2. Go back to the [Discord Developer Portal](https://discord.com/developers/applications)
3. Open your application → **General Information**
4. Find **Interactions Endpoint URL**
5. Paste your Worker URL there
6. Tap **Save Changes**

If it saves without an error, the connection is working!

### Step 6 – Register the slash commands (from your phone)

1. Open this page:  
   **[Register Commands](https://raw.githack.com/roseplayz12345yt/discord-bot/main/register.html)**

2. Paste your **Bot Token** and **Application ID**
3. Tap **Register Commands**

You should see a green success message.

---

### Done!

Go to your Discord server and try typing:

- `/ping`
- `/hello`
- `/info`

Your bot is now online 24/7 for free.

---

**Tip:** If the Register Commands page doesn’t open, you can also open the file directly from the GitHub repo:
https://github.com/roseplayz12345yt/discord-bot/blob/main/register.html  
Then tap the three dots → **View raw** or use a mobile browser that can run the page.
