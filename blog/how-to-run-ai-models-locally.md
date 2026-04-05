# How to Run AI Models Locally: Step-by-Step Guide

**Target keyword:** how to run ai models locally
**Word count:** ~1,500

---

Running AI models locally means downloading a pre-trained model file and using your own CPU/GPU to process prompts. No API keys, no internet connection, no subscription. This guide covers the exact steps for each platform.

## Quick Answer

Install Ollama → pull a model → run it. Three commands, five minutes.

```bash
brew install ollama       # or curl install on Linux
ollama pull llama3        # download a model (~5GB)
ollama run llama3         # start chatting
```

## What "Running Locally" Actually Means

When you use ChatGPT or Claude, your prompt travels over the internet to a data center where powerful GPUs process it. The response comes back over the internet. You pay for this service.

When you run locally, the model file sits on your hard drive. Your CPU (and optionally GPU) does all the computation. Nothing leaves your machine. You pay nothing after the initial setup.

**Trade-off:** Local models are smaller than cloud models (7B-70B parameters vs 175B+ for GPT-4), so quality is somewhat lower. For most tasks — chat, summarization, coding assistance, writing — the difference is small enough that local models work well.

## Step 1: Check Your Hardware

| Your Setup | What You Can Run | Expected Speed |
|-----------|-----------------|---------------|
| 8GB RAM, no GPU | Small models (3B-7B) | 5-10 tokens/sec |
| 16GB RAM, no GPU | Medium models (7B-14B) | 8-15 tokens/sec |
| 16GB RAM + NVIDIA GPU (6GB+) | Medium models, fast | 20-40 tokens/sec |
| 32GB+ RAM or Apple Silicon 24GB+ | Large models (34B-70B) | 15-30 tokens/sec |
| 64GB+ RAM or multiple GPUs | Largest models (70B+) | 20-50 tokens/sec |

Apple Silicon (M1/M2/M3/M4) is particularly good for local AI because it uses unified memory — your "RAM" serves double duty as "GPU memory."

## Step 2: Install a Model Runner

### Option A: Ollama (Recommended)

The simplest tool for running local models.

**Mac:** `brew install ollama`
**Linux:** `curl -fsSL https://ollama.ai/install.sh | sh`
**Windows:** Download from ollama.ai

### Option B: LM Studio

GUI application for browsing, downloading, and running models. Good for users who want a visual interface without installing OpenClaw Manager.

### Option C: llama.cpp

The lowest-level option. Compile from source for maximum performance. Best for advanced users who want to squeeze every token-per-second out of their hardware.

## Step 3: Download a Model

```bash
# General purpose
ollama pull llama3

# Coding
ollama pull deepseek-coder-v2

# Small and fast
ollama pull phi3:mini

# Best quality (needs 48GB+ RAM)
ollama pull llama3:70b
```

## Step 4: Run and Chat

```bash
ollama run llama3
```

You are now running AI locally. Type messages and get responses. Type `/bye` to exit.

## Step 5: Use in Applications

Ollama exposes an API at `localhost:11434`. Any application can connect:

```python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'llama3',
    'prompt': 'Explain quantum computing simply',
    'stream': False
})
print(response.json()['response'])
```

## Connect to a Full AI Assistant

Local models alone give you a chatbot. Connect to OpenClaw for a full assistant:

```bash
npm install -g openclaw
openclaw onboard --install-daemon
# Select Ollama as provider
```

Now your local model has persistent memory, messaging integration, browser control, and file access.

## Model Formats Explained

| Format | What It Means |
|--------|-------------|
| **GGUF** | Standard format for llama.cpp and Ollama |
| **Q4_K_M** | 4-bit quantization (4x memory reduction, small quality loss) |
| **Q8_0** | 8-bit quantization (2x memory reduction, minimal quality loss) |
| **FP16** | Full precision (no compression, best quality, most memory) |

Ollama defaults to Q4 quantization, which is the best balance of quality and memory.

## Troubleshooting

**"not enough memory"**: Use a smaller model or a more aggressive quantization.
**"very slow responses"**: Close other applications to free RAM. Use a GPU if available. Try a smaller model.
**"garbled output"**: Re-download the model: `ollama rm llama3 && ollama pull llama3`
**"ollama not found"**: Ensure Ollama is in your PATH. On Mac, restart Terminal after installation.

## FAQ

**How much does this cost?**
Free. The models are open source. Ollama is free. The only cost is electricity (negligible — similar to running a video game).

**Is it legal?**
Yes. Models like Llama 3, Mistral, Qwen, and DeepSeek are released under permissive licenses allowing local use, including commercial applications.

**Can I use it offline?**
Yes, completely. Once downloaded, the model works without internet.

**Will it slow down my computer?**
During inference (generating a response), the model uses significant CPU/GPU resources. Between prompts, resource usage drops to near zero. Close memory-intensive applications for best performance.
