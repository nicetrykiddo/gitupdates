# Telegram GitHub Webhook Bot

## 🚀 Welcome to the "Super Important" Webhook Bot

Ah, yes. Another webhook bot. Because, obviously, the world needed yet another bot to spam Telegram with GitHub events. But wait! This one is ~actually useful~ not totally useless. Enjoy this finely crafted, totally serious, production-grade masterpiece (I promise, it's not just duct tape and hope).

## 🎯 What Does This Monstrosity Do?

It listens to GitHub webhook events and sends _very important_ updates to your Telegram group or chat with **inline buttons** (because plain text is for peasants).

### 🔥 Features (That You Never Knew You Needed)

- **Push Events** – Because who doesn’t love a flood of commit messages?
- **Forks & Stars** – You’ll finally know when your repo gets some love (or pity stars).
- **Issues & PRs** – Keeping track of bugs and feature requests like a boss.
- **Releases & Security Alerts** – Because you totally read those security advisories, right?
- **Ping & Star Events** – Now you can see GitHub say "Hello" and track repo appreciation.

## 🤦‍♂️ Setup (Brace Yourself)

1. **Get a Telegram Bot Token**

   - DM [@BotFather](https://t.me/BotFather) on Telegram and ask nicely for a bot token.

2. **Create a GitHub Webhook**

   - Navigate to your repo → Settings → Webhooks → Add webhook.
   - Set the payload URL to your server (`http://your-server.com/webhook`).
   - Choose events you want to ~spam~ receive updates for.

3. **Deploy & Run**
   - Install dependencies:
     ```sh
     npm install
     ```
   - Run the server:
     ```sh
     node server.js
     ```
   - Watch it scream (or work, if you’re lucky).

## 🌟 Webhook Event Support (A.K.A. What It Understands)

| Event Type          | What Happens                                                                        |
| ------------------- | ----------------------------------------------------------------------------------- |
| `push`              | Sends commit details with a fancy compare button                                    |
| `fork`              | Alerts when your repo gets cloned by an open-source enthusiast (or a script kiddie) |
| `watch`             | Notifies when someone stars your repo (probably by mistake)                         |
| `issues`            | Lets you know when someone reports a bug you’ll ignore for months                   |
| `issue_comment`     | Shows comments on issues because opinions matter (sometimes)                        |
| `pull_request`      | Updates when a PR is created, merged, or closed (aka "Merge it already!")           |
| `release`           | Tells you when you ship a new release (that nobody will update to)                  |
| `repository`        | Alerts when the repo settings change (because why not?)                             |
| `security_advisory` | Yells at you when security issues arise (which you should definitely fix)           |
| `ping`              | Confirms that the webhook is working                                                |
| `star`              | Alerts when your repo gets some extra love 🌟                                       |

## 📌 Environment Variables (Because Hardcoding Is Bad, Apparently)

Create a `.env` file and add:

```env
BOT_TOKEN=your_telegram_bot_token
CHAT_ID=your_telegram_chat_id
```

## 🤔 License

MIT. Because even bad code deserves freedom.

## 🏆 Credits

- **Me** – For writing this, instead of doing actual work.
- **You** – For reading this far. You either care or are extremely bored.

---

### ✨ Bonus: Future Plans (If I Don't Abandon This)

- More event types? Maybe. If I feel like it.
- Docker support? Sounds fancy, might do it.
- Error handling? LOL, good one.

---

## 🌟 Code Documentation (Because I Had to Explain My Madness)

### `sendMessage(message, buttons = [])`

_I wrote this function because sending boring text messages is for amateurs._

- Takes a `message` string and an optional `buttons` array.
- Sends an inline keyboard-studded Telegram message.
- If something breaks, it's probably Telegram's fault.

### `app.post("/webhook", async (req, res) => { ... })`

_GitHub sends webhooks, I pretend to care._

- Parses incoming GitHub events and turns them into beautifully useless notifications.
- Supports multiple event types, each with custom formatting.
- If an event isn’t handled, it gets a generic message (because who has time to write handlers for everything?).

### `app.listen(3000, () => console.log(`🚀 Webhook server running on port 3000!`))`

_Yes, it runs on port 3000. No, I will not make it configurable._

- Starts the server and pretends to be professional with a logging statement.
- If it crashes, you’ll know because nothing will work.
