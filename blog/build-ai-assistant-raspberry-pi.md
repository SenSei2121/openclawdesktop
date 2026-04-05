# Build an AI Assistant with Raspberry Pi (2026 Guide)

**Target keyword:** build ai assistant raspberry pi
**Word count:** ~1,200

---

A Raspberry Pi 5 with 8GB RAM can run a functional AI assistant for under $100 in hardware. It won't match a Mac Studio, but it handles chat, simple automation, and smart home control as an always-on, low-power AI hub.

## Quick Answer

Buy a Raspberry Pi 5 (8GB) for ~$80. Install Ollama with `phi3:mini` (3.8B parameter model). Install OpenClaw for assistant capabilities. Connect via Telegram. Total cost: ~$100. Total setup time: 30-45 minutes.

## What the Pi Can and Cannot Do

| Task | Performance |
|------|------------|
| Basic Q&A chat | Good (5-8 tokens/sec with phi3:mini) |
| Summarization | Adequate for short texts |
| Smart home control | Good (lightweight task) |
| Telegram/Discord bot | Good |
| Code generation | Limited (small model) |
| Complex reasoning | Poor (model too small) |
| Image understanding | Not supported with small models |

## Hardware List

| Component | Model | Price | Notes |
|-----------|-------|-------|-------|
| Raspberry Pi | Pi 5, 8GB | ~$80 | The 4GB model is too limited |
| microSD | 64GB A2 | ~$10 | Fast read/write matters |
| Power supply | Official USB-C | ~$12 | Must be 5V/5A for Pi 5 |
| Case | With fan | ~$8 | Active cooling extends model running time |
| **Total** | | **~$110** | |

Optional: USB microphone ($15) + speaker ($10) for voice interaction.

## Setup Steps

### 1. Flash the OS
Flash Raspberry Pi OS (64-bit) to your microSD using Raspberry Pi Imager.

### 2. Install Ollama
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 3. Pull a Pi-Friendly Model
```bash
# Best for Pi 5 8GB
ollama pull phi3:mini    # 3.8B params, 2.3GB

# Alternative: smaller and faster
ollama pull tinyllama    # 1.1B params, 637MB
```

### 4. Install OpenClaw
```bash
# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install OpenClaw
npm install -g openclaw
openclaw onboard --install-daemon
```

### 5. Connect Telegram
During setup, add your Telegram bot token. Now chat with your Pi-based AI from your phone anywhere.

### 6. Set Up Auto-Start
```bash
# OpenClaw daemon auto-starts with --install-daemon flag
# Verify it starts on boot:
systemctl status openclaw
```

## Power and Heat Management

The Pi 5 draws ~5W idle, ~12W under load. Running AI inference continuously generates significant heat — use an active cooling case. If the Pi throttles (>80°C), responses slow down.

**Tips:**
- Use an aluminum heatsink case with fan
- Set inference to batch mode (process, then idle) rather than continuous
- Consider placing the Pi in a well-ventilated area

## Practical Use Cases for a Pi AI Assistant

1. **Smart home hub**: Control lights, thermostats, and devices via natural language
2. **Family assistant**: Shared Telegram bot for household questions and tasks
3. **Learning tool**: Kids interact with AI for homework help, safely hosted at home
4. **Security camera monitor**: Process camera feeds and alert on events
5. **Offline knowledge base**: Search personal notes and documents via AI

## FAQ

**Is the Pi 5 powerful enough for AI?**
For small models (3B parameters), yes. Responses take 3-8 seconds. For daily chat and simple automation, this is acceptable. For complex tasks, use a more powerful machine.

**Can I use a Pi 4?**
The Pi 4 (8GB) works but is significantly slower. Expect 2-3x longer response times compared to Pi 5.

**How much electricity does it use?**
~$2-5/year in electricity. Essentially free to run 24/7.

**Can I add a GPU?**
Not directly. The Pi 5 supports M.2 HATs for NVMe storage but not for GPU acceleration. For GPU-accelerated local AI, use a desktop or Mac.
