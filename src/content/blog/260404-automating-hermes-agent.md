---
title: "Automating My Daily Life with Hermes Agent"
description: "How I went from skeptical to relying on an AI assistant for daily routines"
pubDate: '2026-04-04'
updatedDate: '2026-04-28'
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
I'm currently studying for the *permis bateau côtier* (French coastal boat license). Every evening at 7 PM Paris time, Hermes sends me three random concepts from the curriculum in the `#permis‑bateau` channel. No more "I should review something today" — the reminder is just there, consistently, every day.

### 2. Pollen Monitoring
Living in Nice means dealing with seasonal allergies. Hermes checks [lachainemeteo.com](https://www.lachainemeteo.com) every morning for cypress, birch, and grass pollen levels. If any exceed my threshold, I get an alert. If levels are safe, it stays silent. It's the perfect balance of information without noise.

### 3. Daily Tech News Briefing
At 8 AM Paris time, Hermes scrapes Hacker News, TechCrunch, and The Verge, filters for my interests (AI/LLMs, TypeScript/Go/Rust/Zig, cybersecurity, science, acquisitions, open source), and delivers a curated top‑10 digest to my `#daily‑brief` channel. I stay informed without the endless scrolling.

### 4. Quick Code Changes and Checks
Need to update a config file, run a script, or check logs? Instead of SSHing into a server, I just ask Hermes. It's like having a pair of hands on the machine 24/7, ready to handle small tasks without interrupting my flow.

All of these are defined as **skills** and **cron jobs** within Hermes. Once configured, they run automatically. I don't think about them; they're background threads in my life that only surface when they need my attention.

## The "Trigger and Forget" Workflow

This is what truly won me over. With Hermes, I'm not having a conversation with an AI — I'm delegating a job and moving on. Want a weekly quiz on the boat‑license concepts from the past seven days? Write a skill, schedule it for Saturday morning, and it's done. Want to scrape my SensCritique ratings monthly and analyze my taste in movies? There's a skill for that too. (Turns out I lean toward social sci‑fi and historical fiction.)

The agent remembers my preferences (stored in persistent memory), learns from corrections, and can even delegate complex tasks to sub‑agents. It feels less like a chatbot and more like a **digital assistant** — one that doesn't need breaks and never forgets what I've asked it to do.

## Under the Hood

For the technically curious, here's how it works:

*   **Nix Flake** — Everything is defined declaratively: the agent's model (qwen3.6‑plus via DashScope's OpenAI‑compatible endpoint), compression settings, auxiliary models for vision/search/skills, and Discord webhook targets. It's reproducible and version‑controlled.
*   **Skills** — Each recurring task is a skill: a Markdown file with step‑by‑step instructions, pitfalls, and verification steps. The agent loads them as needed.
*   **Cron Jobs** — Hermes includes a built‑in cron system that lets you schedule any prompt (with or without skills) and deliver output to Discord, local files, or other platforms.
*   **Persistent Memory** — The agent maintains a user profile and memory store across sessions, so it knows my allergies, learning goals, and even my preference for a slightly sarcastic tone in certain Discord threads.

It's not magic — it's a well‑designed harness that turns a capable LLM into a reliable, autonomous tool.

## Infrastructure‑as‑Code with Terranix

I manage my Hetzner Cloud server via **Terranix**, a Nix‑native Terraform generator. Instead of writing `.tf` files, I define the entire cloud stack in a Nix module:

```nix
# terraform/config.nix
{ config, ... }:

let
  sshConfig = import ../lib/ssh.nix;
in
{
  terraform.required_providers.hcloud = {
    source  = "hetznercloud/hcloud";
    version = "~> 1.49";
  };

  variable.hcloud_token = {
    description = "Hetzner Cloud API token";
    type        = "string";
    sensitive   = true;
  };

  provider.hcloud.token = "\${var.hcloud_token}";

  resource.hcloud_ssh_key.deployer = {
    name       = "deployer";
    public_key = sshConfig.sshPublicKey;
  };

  resource.hcloud_server.null-claw = {
    name        = "null-claw";
    server_type = "cx33";
    location    = "nbg1";
    image       = "debian-12";
    ssh_keys    = [ "\${hcloud_ssh_key.deployer.id}" ];
  };

  output.server_ip = {
    value       = "\${hcloud_server.null-claw.ipv4_address}";
    description = "Public IPv4 address of the null-claw server";
  };
}
```

The flake wraps Terraform with three simple commands:

```bash
nix run .#provision   # Creates the server (with smart SSH key import)
nix run .#deploy      # Installs NixOS via nixos-anywhere (wipes disk)
nix run .#update      # Updates in-place (preserves crons, memories, state)
nix run .#destroy     # Tears everything down
```

The `provision` command even handles the edge case where the SSH key already exists in Hetzner under a different name — it fingerprints the key, finds the matching Hetzner ID, and imports it into Terraform state before applying. No duplicate key errors.

The `update` command is the one I actually use day-to-day: it builds the new closure locally, copies it to the remote, and runs `nixos-rebuild switch` — preserving all cron jobs, memories, and session state.

## Disk Partitioning with Disko

Disk layout is handled by **disko**, also declared in Nix:

```nix
# nixos/disko.nix
{ ... }:

{
  disko.devices.disk.main = {
    type   = "disk";
    device = "/dev/sda";
    content = {
      type = "gpt";
      partitions = {
        boot = {
          size     = "1M";
          type     = "EF02";
          priority = 1;
        };
        ESP = {
          size    = "512M";
          type    = "EF00";
          content = {
            type       = "filesystem";
            format     = "vfat";
            mountpoint = "/boot";
          };
        };
        root = {
          size    = "100%";
          content = {
            type       = "filesystem";
            format     = "ext4";
            mountpoint = "/";
          };
        };
      };
    };
  };
}
```

No manual partitioning, no scattered state files—just pure Nix.

## Local LLM with llama.cpp

For lighter tasks, I run llama-cpp locally via the NixOS module. It pulls the model directly from Hugging Face — no manual download scripts needed:

```nix
# nixos/configuration.nix (excerpt)
services.llama-cpp = {
  enable     = true;
  model      = null;  # No local path — uses --hf-repo instead
  host       = "127.0.0.1";
  port       = 8080;
  extraFlags = [
    "--hf-repo" "unsloth/Qwen3.5-0.8B-GGUF:UD-Q4_K_XL"
    "--threads" "4"
    "--batch-size" "512"
    "--mlock"
    "--ctx-size" "64000"
    "--n-predict" "-1"
  ];
};
```

This gives me an **OpenAI‑compatible API endpoint** at `http://127.0.0.1:8080/v1`. The model is the Qwen‑3.5‑0.8B in UD-Q4_K_XL quantization — surprisingly capable for its size.

## Hermes‑agent Wired to DashScope

My main model runs via DashScope's OpenAI‑compatible endpoint, not locally. The hermes-agent config reflects that:

```nix
# nixos/hermes.nix
{ config, ... }:

{
  services.hermes-agent = {
    enable = true;
    addToSystemPackages = true;

    settings = {
      model = {
        base_url = "https://coding-intl.dashscope.aliyuncs.com/v1";
        default = "qwen3.6-plus";
      };
      compression = {
        enabled = true;
        threshold = 0.85;
        target_ratio = 0.20;
        protect_last_n = 20;
      };
      auxiliary = {
        compression = { model = "qwen3.6-plus"; provider = "main"; };
        vision      = { model = "qwen3.6-plus"; base_url = "..."; };
        web_extract = { model = "qwen3.6-plus"; base_url = "..."; };
        session_search = { model = "qwen3.6-plus"; base_url = "..."; };
        skills_hub  = { model = "qwen3.6-plus"; base_url = "..."; };
        mcp         = { model = "qwen3.6-plus"; base_url = "..."; };
      };
      toolsets = [ "all" ];
      max_turns = 100;
    };

    environment = {
      DISCORD_REQUIRE_MENTION = "false";
      DISCORD_IGNORE_NO_MENTION = "true";
      DISCORD_HOME_CHANNEL_ID = "827252213880586243";
    };

    restart = "on-failure";
    restartSec = 15;
  };

  # Secrets merged into Hermes' .env at activation
  sops.defaultSopsFile = ../secrets/hermes-discord.yaml;
  sops.secrets.discord_bot_token = {};
  sops.secrets.discord_allowed_users = {};
  sops.secrets.dashscope_api_key = {};

  sops.templates."hermes-env" = {
    content = ''
      DISCORD_BOT_TOKEN=${config.sops.placeholder.discord_bot_token}
      DISCORD_ALLOWED_USERS=${config.sops.placeholder.discord_allowed_users}
      OPENAI_API_KEY=${config.sops.placeholder.dashscope_api_key}
    '';
  };
}
```

Key details:

- Using `OPENAI_API_KEY` env var to force the OpenAI-compatible client, which respects the custom `base_url`.
- **Compression** is enabled with an 85% threshold — the context gets compressed before it hits the limit, protecting the last 20 messages.
- **Auxiliary models** handle compression, vision, web extraction, session search, skills hub lookups, and MCP — all running on the same DashScope endpoint.
- **Three secrets** (Discord bot token, allowed user IDs, DashScope API key) are encrypted with **sops‑nix** and injected as an `.env` file at activation — never touching the Nix store.
- `DISCORD_REQUIRE_MENTION = "false"` means Hermes responds in its home channel without needing a `@mention`.

## From Skeptic to Daily User

I've gone from eye‑rolling at AI‑assistant hype to genuinely relying on one daily. The value isn't in having something that can write a poem or summarize an article — it's in **offloading mental overhead** to a system that never forgets, never gets bored, and is always a message away.

Hermes Agent made this real for me in a way that aligns with my workflow and infrastructure preferences. It's not a magic bullet — you still need to define what you want automated, write the skills, and set up the cron jobs. But once you do, it just works. And the pace of development means it keeps getting better every week.

If you're tired of manual reminders, scattered scripts, and constant context‑switching between apps, consider giving an agent a try. Start with one small cron job — checking the weather, sending a daily quote, backing up a file — and see how it feels.

You might just find yourself, as I did, moving from skeptic to daily user.

*And if you need me, I'll be in Discord, asking Hermes to deploy this very blog post.*

---

*You can find my Hermes Agent configuration [here](https://github.com/DnzzL/hermes‑agent‑provision). The Hermes Agent project is open‑source and available on [GitHub](https://github.com/NousResearch/Hermes-Agent).*