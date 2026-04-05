# AI Assistant Telegram Bot: Complete Setup Guide

**Target keyword:** ai assistant telegram bot
**Word count:** ~1,200

---

Telegram is the easiest messaging platform to connect to a self-hosted AI assistant. Create a bot in 2 minutes, add your token to OpenClaw, and chat with your AI from your phone anywhere in the world.

## Quick Answer

1. Message @BotFather on Telegram, create a bot, copy the token
2. Run `openclaw config set telegram.token YOUR_TOKEN`
3. Chat with your bot on Telegram — it now has AI with memory, browser control, and file access

## Why Telegram?

- **Easiest setup**: Bot creation takes 2 minutes, no approval process
- **Free**: No API costs for bot messaging
- **Cross-platform**: Works on iOS, Android, desktop, and web
- **Rich features**: Supports images, files, inline keyboards, and voice messages
- **Privacy**: End-to-end encryption available (secret chats)
- **No phone number sharing**: Users interact via username, not phone number

## Setup Steps

### Step 1: Create a Telegram Bot (2 minutes)

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Choose a name (e.g., "My AI Assistant")
4. Choose a username (e.g., `my_ai_assistant_bot` — must end in `bot`)
5. Copy the API token BotFather gives you

### Step 2: Install OpenClaw (if not already)

```bash
brew install ollama && ollama pull llama3
npm install -g openclaw
openclaw onboard --install-daemon
```

### Step 3: Connect Telegram

```bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw restart
```

### Step 4: Chat with Your AI

Open Telegram, find your bot, and send a message. Your self-hosted AI responds with full capabilities:
- Natural conversation with memory
- Web research ("Search for the best restaurants near me")
- File operations ("Save this as a note")
- Scheduled tasks ("Remind me at 5pm to call the dentist")

## What Your Telegram Bot Can Do

| Capability | Example |
|-----------|---------|
| Chat | "What's the weather forecast for tomorrow?" |
| Research | "Find the latest news about AI regulation" |
| Files | "Read my notes.txt and summarize it" |
| Reminders | "Remind me to buy groceries at 6pm" |
| Automation | "Every morning, send me a news digest" |
| Code | "Write a Python script that calculates compound interest" |

## Privacy

- The AI runs on YOUR hardware
- Telegram messages are encrypted in transit
- Your conversation data stays in `~/.openclaw/` on your machine
- The AI model processes everything locally if using Ollama
- Only the Telegram message transport uses the internet

## FAQ

**Can multiple people use the same bot?**
Yes. By default, OpenClaw responds to anyone who messages the bot. For private use, restrict to your Telegram user ID in the config.

**Does it work in group chats?**
Yes. Add your bot to a Telegram group and mention it with @username. It responds to mentions and direct replies.

**Can I send images and files?**
Yes. Send images or documents to the bot, and the AI can analyze them (with multimodal models like Llava or GPT-4V).

**How fast are responses?**
Depends on your AI model. With Llama 3 8B on Apple Silicon: 2-5 seconds. With cloud APIs: 1-3 seconds. With larger local models: 5-15 seconds.
