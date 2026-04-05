# Ollama AI Assistant: Complete Setup Guide (2026)

**Target keyword:** ollama ai assistant
**Secondary keywords:** ollama setup guide, ollama mac ai assistant, ollama deepseek setup, local ai with ollama
**Word count:** ~1,800
**Intent:** Informational (tutorial)

---

Ollama turns your computer into an AI model server. Install it, pull a model, and you have a local AI that runs without internet, without subscriptions, and without sending your data anywhere. This guide covers installation, model selection, and connecting Ollama to a full AI assistant framework.

## Quick Answer

Install Ollama with one command (`brew install ollama` on Mac), pull a model (`ollama pull llama3`), and start chatting (`ollama run llama3`). For a full assistant with memory, messaging, and browser control, connect Ollama to OpenClaw.

## What Ollama Does

Ollama is a model runner. It downloads, manages, and serves AI models on your local hardware. Think of it as Docker for AI models — it handles the infrastructure so you focus on using the AI.

**What Ollama provides:**
- One-command model downloads
- Automatic GPU acceleration (Metal on Mac, CUDA on NVIDIA)
- API server for other applications to connect to
- Model library with hundreds of pre-built models
- Quantization for running larger models on less RAM

**What Ollama does NOT provide:**
- Messaging integration (no WhatsApp, Telegram, Discord)
- Persistent memory (forgets everything when you close the chat)
- Browser automation
- File management
- Task scheduling

For those capabilities, you connect Ollama to an AI assistant framework like OpenClaw.

## Installation

### Mac
```bash
brew install ollama
```

### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows
Download the installer from [ollama.ai](https://ollama.ai/download).

### Verify Installation
```bash
ollama --version
```

## Choosing Your First Model

| Model | Parameters | Download Size | RAM Needed | Best For |
|-------|-----------|--------------|-----------|---------|
| `phi3:mini` | 3.8B | 2.3GB | 4GB | Quick answers, low-spec hardware |
| `llama3:8b` | 8B | 4.7GB | 8GB | General purpose, good quality |
| `mistral` | 7B | 4.1GB | 8GB | Balanced quality and speed |
| `deepseek-coder-v2` | 16B | 8.9GB | 12GB | Code generation and review |
| `qwen3.5:14b` | 14B | 9.0GB | 12GB | Multilingual, strong reasoning |
| `llama3:70b` | 70B | 40GB | 48GB | Highest quality (needs powerful hardware) |
| `deepseek-r1:7b` | 7B | 4.7GB | 8GB | Chain-of-thought reasoning |

**Start with `llama3:8b`** — it's the best balance of quality and hardware requirements.

## Pull and Run

```bash
# Download the model
ollama pull llama3

# Start chatting
ollama run llama3
```

Type your message and press Enter. Type `/bye` to exit.

## Using Ollama as a Local API Server

Ollama runs an API server on `localhost:11434`. Any application can connect to it:

```bash
# Test the API
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "What is the meaning of life?"
}'
```

This API is how OpenClaw, LangChain, and other frameworks connect to your local models.

## Connecting Ollama to OpenClaw

Ollama alone is a chatbot. Ollama + OpenClaw is a full AI assistant.

### Step 1: Install OpenClaw
```bash
npm install -g openclaw
```

### Step 2: Configure OpenClaw to Use Ollama
```bash
openclaw onboard --install-daemon
# Select "Ollama" as your AI provider
# Select your model (llama3, etc.)
```

### Step 3: Start Using
```bash
openclaw chat
```

Now your local Ollama model has:
- **Persistent memory** across conversations
- **Messaging** via Telegram, Discord, WhatsApp
- **Browser control** for web research
- **File access** for reading and writing documents
- **Skills** from the OpenClaw marketplace

### Alternative: OpenClaw Desktop Manager

Download OpenClaw Manager for a GUI experience. It auto-detects your Ollama installation and shows all available models in a dropdown.

## Managing Multiple Models

```bash
# List installed models
ollama list

# Pull additional models
ollama pull deepseek-coder-v2
ollama pull phi3:mini

# Switch models in conversation
ollama run deepseek-coder-v2

# Remove a model to free disk space
ollama rm phi3:mini

# Show model details
ollama show llama3
```

## Performance Optimization

### Apple Silicon (M1/M2/M3/M4)

Apple Silicon uses unified memory, meaning GPU and CPU share the same RAM pool. Ollama automatically uses Metal acceleration. A MacBook with 16GB unified memory can comfortably run 8B-14B parameter models.

### NVIDIA GPUs

Ollama auto-detects NVIDIA GPUs and uses CUDA acceleration. For best performance:
- 6GB VRAM: up to 7B models
- 12GB VRAM: up to 14B models
- 24GB VRAM: up to 34B models

### CPU-Only

Without GPU acceleration, responses are slower but functional. For CPU-only systems, use smaller models (3B-7B parameters) and expect 5-15 tokens per second.

## Advanced: Custom Modelfiles

Create a custom model with specific behavior:

```
# Save as Modelfile
FROM llama3

SYSTEM """
You are a helpful coding assistant. You write clean, well-documented code.
When asked to write code, always include error handling and comments.
Prefer Python unless the user specifies another language.
"""

PARAMETER temperature 0.3
PARAMETER num_ctx 8192
```

```bash
ollama create code-assistant -f Modelfile
ollama run code-assistant
```

## Frequently Asked Questions

**How much disk space does Ollama use?**
Each model is 2-40GB depending on size. Ollama itself is small (~50MB). Budget 10-30GB for a practical setup with 2-3 models.

**Can I run Ollama on a Raspberry Pi?**
The Pi 5 with 8GB RAM can run small models (3B parameters). Performance is limited but functional for basic chat. For better performance, use any x86/ARM machine with 16GB+ RAM.

**Does Ollama work offline?**
Yes, completely. Once the model is downloaded, no internet connection is needed. This is one of the primary advantages of local AI.

**Can I use Ollama with Python?**
Yes. Use the `ollama` Python package: `pip install ollama`. Or connect through LangChain: `pip install langchain-ollama`.

**How do I update Ollama?**
Mac: `brew upgrade ollama`. Linux: re-run the install script. Windows: download the latest installer.
