# Discord Bot (Cloudflare Workers)

A simple Discord bot that runs **for free** on Cloudflare Workers.

Works great even if you're on a phone — no terminal required.

### Commands
| Command | Description |
|---------|-------------|
| `/ping` | Replies with Pong + latency |
| `/hello` | Greets you |
| `/info` | Shows bot information |

---

## Setup on Phone (No Terminal)

### Step 1 – Create the Discord Bot

1. Open this link on your phone: [Discord Developer Portal](https://discord.com/developers/applications)
2. Tap **New Application** → give it a name → Create
3. Go to the **Bot** tab → **Add Bot** → confirm
4. Tap **Reset Token** and **copy** the token (save it in your notes)
5. Go to **General Information** and copy:
   - **Application ID**
   - **Public Key**

### Step 2 – Invite the bot to your server

1. Still in the Developer Portal, go to **OAuth2 → URL Generator**
2. Check these boxes:
   - Scopes: `bot` and `applications.commands`
   - Bot Permissions: `Send Messages` + `Use Slash Commands`
3. Copy the URL at the bottom and open it
4. Choose your server and authorize

### Step 3 – Deploy on Cloudflare (all in browser)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) and sign up / log in (free)
2. In the left sidebar tap **Workers & Pages**
3. Tap **Create** → **Create Worker**
4. Give it a name (example: `discord-bot`) → **Deploy**
5. After it deploys, tap **Edit code**
6. **Delete everything** in the editor
7. Open this file on GitHub:  
   [src/index.js](https://github.com/roseplayz12345yt/discord-bot/blob/main/src/index.js)
8. Tap the **Raw** button → select all → copy
9. Paste it into the Cloudflare editor → **Save and Deploy**

### Step 4 – Add the secrets (still in browser)

1. In your Worker page, go to **Settings** → **Variables and Secrets**
2. Under **Secrets**, add these three one by one (tap “Add” each time):

   | Name | Value |
   |------|-------|
   | `DISCORD_TOKEN` | Your Bot Token |
   | `DISCORD_PUBLIC_KEY` | Your Public Key |
   | `DISCORD_APPLICATION_ID` | Your Application ID |

3. Save each one

### Step 5 – Connect Discord to your Worker

1. Copy your Worker URL (it looks like `https://discord-bot.yourname.workers.dev`)
2. Go back to [Discord Developer Portal](https://discord.com/developers/applications)
3. Select your app → **General Information**
4. Paste the Worker URL into **Interactions Endpoint URL**
5. Tap **Save Changes**  
   (Discord will test it — if it saves, it’s working!)

### Step 6 – Register the slash commands (phone friendly)

1. Open this page on your phone:  
   **[Register Commands Page](https://roseplayz12345yt.github.io/discord-bot/register.html)**  
   *(or open the `register.html` file from the repo)*

2. Paste your **Bot Token** and **Application ID**
3. Tap **Register Commands**

You should see a green success message.  
Now go to your Discord server and try typing `/ping`!

---

## That’s it!

Your bot is now live 24/7 for free on Cloudflare.

If you ever want to change the code later, just edit it again in the Cloudflare dashboard and hit Save and Deploy.
