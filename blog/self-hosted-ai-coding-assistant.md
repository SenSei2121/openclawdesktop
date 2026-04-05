# Self-Hosted AI Coding Assistant: Complete Setup Guide

**Target keyword:** self hosted ai coding assistant
**Secondary:** open source ai coding assistant, self hosted ai code assistant
**Word count:** ~1,500

---

A self-hosted AI coding assistant runs on your hardware, reads your codebase, and helps you write, review, and debug code — without sending your proprietary source code to external servers. For companies with IP concerns or developers who want full control, self-hosting is the practical answer.

## Quick Answer

Install Ollama with `deepseek-coder-v2` model + OpenClaw for persistent memory and file access. Alternatively, use Continue.dev or Tabby as IDE-integrated coding assistants with local models. Setup time: 15-20 minutes.

## Why Self-Host a Coding Assistant?

**Source code privacy.** When you use GitHub Copilot or ChatGPT for code assistance, your source code is sent to external servers for processing. For proprietary codebases, this may violate security policies or NDA terms.

**No subscription.** GitHub Copilot costs $10-39/user/month. Self-hosted alternatives run on hardware you already own.

**Customization.** Fine-tune on your codebase patterns, coding style, and internal APIs.

## Option 1: OpenClaw + DeepSeek Coder (Full Assistant)

```bash
ollama pull deepseek-coder-v2
npm install -g openclaw
openclaw onboard --install-daemon
```

OpenClaw provides not just code completion but a full coding assistant: review PRs, explain code, run tests, manage files, and remember your project context across sessions.

## Option 2: Continue.dev (IDE Integration)

Continue.dev is an open-source AI code assistant that integrates directly into VS Code and JetBrains IDEs. Connect it to Ollama for fully local inference.

```bash
# Install the VS Code extension, then configure:
# Provider: Ollama
# Model: deepseek-coder-v2
```

## Option 3: Tabby (Self-Hosted Copilot Alternative)

Tabby is a self-hosted code completion engine that functions like GitHub Copilot but runs entirely on your infrastructure.

```bash
docker run -it --gpus all -p 8080:8080 tabbyml/tabby serve --model DeepseekCoder-6.7B
```

## Best Models for Coding

| Model | Parameters | Download | Strengths |
|-------|-----------|----------|-----------|
| DeepSeek Coder V2 | 16B | 8.9GB | Best overall code quality |
| Qwen 2.5 Coder | 7B-32B | 4-19GB | Strong multi-language |
| CodeLlama | 7B-34B | 4-19GB | Meta's coding model |
| StarCoder 2 | 3B-15B | 2-9GB | Good for smaller hardware |

## FAQ

**Is self-hosted coding AI as good as Copilot?**
For code completion, DeepSeek Coder V2 approaches Copilot quality for most languages. For full IDE integration and real-time suggestions, Copilot still has a smoother experience. The gap is narrowing monthly.

**What hardware do I need?**
Minimum: 12GB RAM for 7B models. Recommended: 16GB+ with GPU for real-time completions. Apple Silicon Macs with 16GB+ handle coding models well.

**Can I fine-tune on my codebase?**
Yes. Tools like Unsloth and Axolotl allow fine-tuning Ollama-compatible models on your specific codebase patterns. This typically requires a GPU with 12GB+ VRAM.
