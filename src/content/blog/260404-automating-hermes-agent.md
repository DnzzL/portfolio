---
title: "Automating My Daily Life with Hermes Agent"
description: "How I went from skeptical to relying on an AI assistant for daily routines"
pubDate: '2026-04-04'
categories: ['Automation', 'AI', 'Self‑Hosting']
heroImage: '/thumbnails/hermes-agent.svg'
tags: ['AI', 'Automation', 'Nix', 'Discord', 'Self‑Hosting']
---

# Automating My Daily Life with Hermes Agent

Over the past few months, I've been exploring AI assistants — not just as chatbots, but as tools that can genuinely automate repetitive tasks and help manage daily routines. As a developer, I was already using tools like Claude Code and OpenCode heavily for coding assistance. The broader "OpenClaw" paradigm, however, took some time to click for me. At first, it felt like yet another layer of complexity rather than a simplification.

That changed when I discovered [Hermes Agent](https://github.com/NousResearch/Hermes-Agent) from [Nous Research](https://nousresearch.com/). Unlike generic AI wrappers, Hermes is a **harness** — a framework for building persistent, autonomous assistants that can actually execute tasks. And crucially, it's **Nix‑first**, which aligns perfectly with my preference for reproducible, declarative infrastructure.

## Why Hermes?

The Nix‑first approach meant I could define my entire setup declaratively, version it, and deploy it anywhere. (My configuration is available in [hermes‑agent‑provision](https://github.com/DnzzL/hermes‑agent‑provision).)

The real breakthrough was **Discord integration**. I already spend most of my day in Discord — for work, communities, and friends. Having an assistant that lives in a channel, ready to respond to a ping, meant I didn't need another app, another tab, or another login. It's just there, accessible from my phone, my laptop, anywhere. This "trigger and forget" mindset became central to how I use Hermes.

## What It Actually Does

So what does an AI assistant in Discord actually do? For me, it's about automating the small, repetitive tasks that tend to slip through the cracks:

### 1. Learning the French Boat License
I'm currently studying for the *permis bateau côtier* (French coastal boat license). Every evening at 7 PM Paris time, Hermes sends me three random concepts from the curriculum in the `#permis‑bateau` channel. No more "I should review something today" — the reminder is just there, consistently, every day.

### 2. Pollen Monitoring
Living in Nice means dealing with seasonal allergies. Hermes checks [lachainemeteo.com](https://www.lachainemeteo.com) every morning for cypress, birch, and grass pollen levels. If any exceed my threshold, I get an alert. If levels are safe, it stays silent. It's the perfect balance of information without noise.

### 3. Daily Tech News Briefing
At 8 AM Paris time, Hermes scrapes Hacker News, TechCrunch, and The Verge, filters for my interests (AI/LLMs, TypeScript/Go/Rust/Zig, cybersecurity, science, acquisitions, open source), and delivers a curated top‑10 digest to my `#daily‑brief` channel. I stay informed without the endless scrolling.

### 4. Quick Code Changes and Checks
Need to update a config file, run a script, or check logs? Instead of SSHing into a server, I just ask Hermes. It's like having a pair of hands on the machine 24/7, ready to handle small tasks without interrupting my flow.

All of these are defined as **skills** and **cron jobs** within Hermes. Once configured, they run automatically. I don't think about them; they're background threads in my life that only surface when they need my attention.

## The "Trigger and Forget" Workflow

This is what truly won me over. With Hermes, I'm not having a conversation with an AI — I'm delegating a job and moving on. Want a weekly quiz on the boat‑license concepts from the past seven days? Write a skill, schedule it for Saturday morning, and it's done. Want to scrape my SensCritique ratings monthly and analyze my taste in movies? There's a skill for that too. (Turns out I lean toward social sci‑fi and historical fiction.)

The agent remembers my preferences (stored in persistent memory), learns from corrections, and can even delegate complex tasks to sub‑agents. It feels less like a chatbot and more like a **digital assistant** — one that doesn't need breaks and never forgets what I've asked it to do.

## Under the Hood

For the technically curious, here's how it works:

*   **Nix Configuration** — Everything is defined in a Nix module, from the agent's model (I'm using DeepSeek‑Reasoner via a custom provider) to cron schedules and Discord webhook targets. It's reproducible and version‑controlled.
*   **Skills** — Each recurring task is a skill: a Markdown file with step‑by‑step instructions, pitfalls, and verification steps. The agent loads them as needed.
*   **Cron Jobs** — Hermes includes a built‑in cron system that lets you schedule any prompt (with or without skills) and deliver output to Discord, local files, or other platforms.
*   **Persistent Memory** — The agent maintains a user profile and memory store across sessions, so it knows my allergies, learning goals, and even my preference for a slightly sarcastic tone in certain Discord threads.

It's not magic — it's a well‑designed harness that turns a capable LLM into a reliable, autonomous tool.

## Infrastructure‑as‑Code with Terranix

I manage my Hetzner Cloud server via **Terranix**, a Nix‑native Terraform generator. Instead of writing `.tf` files, I define the entire cloud stack in a Nix module:

```nix
# terraform/config.nix
{ ... }:

{
  terraform.required_providers.hcloud = {
    source  = "hetznercloud/hcloud";
    version = "~> 1.49";
  };

  variable.hcloud_token {
    description = "Hetzner Cloud API token";
    type        = "string";
    sensitive   = true;
  };

  provider.hcloud.token="\${var.hcloud_token}";

  resource.hcloud_ssh_key.deployer = {
    name       = "deployer";
    public_key = "ssh‑ed25519 AAAA…"; # Your public key
  };

  resource.hcloud_server.null‑claw = {
    name        = "null‑claw";
    server_type = "cx33";          # 8 vCPU, 16 GB RAM
    location    = "nbg1";
    image       = "debian‑12";
    ssh_keys    = [ "\${hcloud_ssh_key.deployer.id}" ];
  };

  output.server_ip = {
    value       = "\${hcloud_server.null‑claw.ipv4_address}";
    description = "Public IPv4 address";
  };
}
```

The flake wraps Terraform with three simple commands:

```bash
nix run .#provision   # Creates the server
nix run .#deploy      # Installs NixOS via nixos‑anywhere
nix run .#destroy     # Tears everything down
```

No manual Terraform steps, no scattered state files—just pure Nix.

## Local LLM with llama.cpp

Once the server is up, a systemd oneshot service downloads the GGUF model before llama‑cpp starts:

```nix
# nixos/configuration.nix (excerpt)
systemd.services.download‑llm‑model = {
  description = "Download Qwen3.5‑0.8B GGUF model";
  wantedBy    = [ "multi‑user.target" ];
  before      = [ "llama‑cpp.service" ];
  serviceConfig = {
    Type            = "oneshot";
    RemainAfterExit = true;
    User            = "root";
    ExecStart = pkgs.writeShellScript "download‑llm‑model" ''
      set ‑euo pipefail
      MODEL_DIR="/var/lib/llama‑cpp/models"
      MODEL_FILE="$MODEL_DIR/Qwen3.5‑0.8B.Q4_K_M.gguf"
      if [ -f "$MODEL_FILE" ]; then
        echo "Model already exists, skipping download."
        exit 0
      fi
      mkdir ‑p "$MODEL_DIR"
      echo "Downloading Qwen3.5‑0.8B.Q4_K_M.gguf (~527 MB)..."
      ${pkgs.curl}/bin/curl ‑L ‑‑retry 5 ‑‑retry‑delay 10 \
        ‑o "$MODEL_FILE.tmp" \
        "https://huggingface.co/…/Qwen3.5‑0.8B.Q4_K_M.gguf"
      mv "$MODEL_FILE.tmp" "$MODEL_FILE"
      echo "Download complete."
    '';
  };
};

services.llama‑cpp = {
  enable     = true;
  model      = "/var/lib/llama‑cpp/models/Qwen3.5‑0.8B.Q4_K_M.gguf";
  host       = "127.0.0.1";
  port       = 8080;
  extraFlags = [ "‑‑ctx‑size" "64000" "‑‑n‑predict" "‑1" ];
};
```

This gives me an **OpenAI‑compatible API endpoint** at `http://127.0.0.1:8080/v1`. The model is a distilled Qwen‑3.5‑0.8B that’s surprisingly capable for its size, fine‑tuned for reasoning.

## Hermes‑agent Wired to the Local LLM

With llama‑cpp serving the model, configuring hermes‑agent is a one‑liner in the model settings:

```nix
# nixos/hermes.nix
services.hermes‑agent = {
  enable = true;
  addToSystemPackages = true;

  settings.model = {
    default  = "Qwen3.5‑0.8B";
    base_url = "http://127.0.0.1:8080/v1";
  };

  environment = {
    DISCORD_REQUIRE_MENTION = "true";
    DISCORD_IGNORE_NO_MENTION = "true";
  };

  restart = "on‑failure";
  restartSec = 15;
};
```

Secrets (Discord bot token, allowed‑user IDs) are encrypted with **sops‑nix** and injected as an `EnvironmentFile` at boot—never touching the Nix store.

## Why This Stack Works

- **Terranix** keeps infrastructure definition type‑safe and reproducible.
- **llama.cpp** provides a zero‑fuss local inference endpoint that hermes‑agent can treat as “OpenAI”.
- **sops‑nix** ensures secrets stay encrypted in the repo and are only decrypted on the target server.
- The whole deployment is a single flake with two commands (`provision` + `deploy`).

The result: a personal AI assistant that runs on my own hardware, answers in Discord, and costs about €14/month on Hetzner—with no external API fees.


## From Skeptic to Daily User

I've gone from eye‑rolling at AI‑assistant hype to genuinely relying on one daily. The value isn't in having something that can write a poem or summarize an article — it's in **offloading mental overhead** to a system that never forgets, never gets bored, and is always a message away.

Hermes Agent made this real for me in a way that aligns with my workflow and infrastructure preferences. It's not a magic bullet — you still need to define what you want automated, write the skills, and set up the cron jobs. But once you do, it just works.

If you're tired of manual reminders, scattered scripts, and constant context‑switching between apps, consider giving an agent a try. Start with one small cron job — checking the weather, sending a daily quote, backing up a file — and see how it feels.

You might just find yourself, as I did, moving from skeptic to daily user.

*And if you need me, I'll be in Discord, asking Hermes to deploy this very blog post.*

---

*You can find my Hermes Agent configuration [here](https://github.com/DnzzL/hermes‑agent‑provision). The Hermes Agent project is open‑source and available on [GitHub](https://github.com/NousResearch/Hermes-Agent).*