---
title: "LLM Privacy Policies Compared: What Data Do Providers Keep — and Can They Train on It?"
description: "A deep dive into the privacy policies of ChatGPT, Claude, Gemini, Mistral, Qwen, DeepSeek, and Proton Lumo — comparing chat vs API, free vs paid."
pubDate: '2026-04-26'
categories: ['AI', 'Privacy', 'Comparison']
heroImage: '/thumbnails/llm-privacy.jpg'
tags: ['AI', 'Privacy', 'LLM', 'Data Protection', 'OpenAI', 'Anthropic', 'Google', 'Mistral', 'Proton']
---

When you paste sensitive code, proprietary business logic, or personal data into an LLM, what happens next? Does the provider store it? Can they use it to train future models? The answer depends on **which provider**, **which product** (chat vs. API), and **which plan** (free vs. paid).

Here's a detailed breakdown of the privacy policies for seven major LLM providers, as of April 2026.

---

## Quick Comparison Table

| Provider | Chat (Free) | Chat (Paid) | API (Free/Tier) | API (Paid/Enterprise) |
|----------|-------------|-------------|-----------------|----------------------|
| **OpenAI (ChatGPT)** | ✅ Used for training | ✅ Used for training | ❌ Not used | ❌ Not used |
| **Anthropic (Claude)** | ✅ Used for training (opt-out) | ✅ Used for training (opt-out) | ❌ Not used | ❌ Not used |
| **Google (Gemini)** | ✅ Used for training | ✅ Used for training | ❌ Not used | ❌ Not used |
| **Mistral AI** | ✅ Used for training (opt-out) | ✅ Used for training (opt-out) | ❌ Not used | ❌ Not used |
| **Qwen (Alibaba)** | ✅ Used for training | ✅ Used for training | ❌ Not used | ❌ Not used |
| **DeepSeek** | ✅ Used for training | ✅ Used for training | ❌ Not used | ❌ Not used |
| **Proton Lumo** | ❌ Not used | ❌ Not used | ❌ Not used | ❌ Not used |

---

## 1. OpenAI (ChatGPT / GPT API)

### ChatGPT (Free & Plus)
- **Data retention:** Conversations are stored and can be reviewed by OpenAI staff for safety and quality purposes.
- **Training usage:** Your prompts and responses **may be used to improve their models**. This applies to both free and ChatGPT Plus users.
- **Opt-out:** As of recent policy updates, there is **no user-facing opt-out** for training data usage in ChatGPT. Enterprise/Business plans offer this control.
- **Human review:** OpenAI has confirmed that contractor reviewers can read sample conversations to "improve safety."

### API (Pay-as-you-go & Enterprise)
- **Data retention:** API data is stored for abuse monitoring but is **not used for model training**.
- **Training usage:** **No.** OpenAI explicitly states: "We do not use data submitted via the API to train or improve base models."
- **Enterprise:** Additional guarantees — zero data retention options, no logging, SOC 2 compliance.

### Key Takeaway
> OpenAI has the clearest split: chat = training data, API = private. If you want privacy, use the API.

---

## 2. Anthropic (Claude)

### Claude.ai / Claude Pro (Consumer)
- **Data retention:** Conversations are stored in your account history.
- **Training usage:** **Yes, by default.** Anthropic's privacy policy (effective January 2026) states: *"We may use your Inputs and Outputs to train our models and improve our Services, unless you opt out through your account settings."*
- **Opt-out:** **Available.** You can disable training data usage in your account settings.
- **Exceptions even with opt-out:** Anthropic still uses conversations for training when:
  1. You provide explicit feedback (thumbs up/down)
  2. Content is flagged for safety review
- **Feedback:** If you rate an output, the entire conversation is stored as feedback and used for training.

### API (Commercial / Developer)
- **Data retention:** Governed by the Commercial Terms of Service and Data Processing Addendum (DPA).
- **Training usage:** **No.** The commercial terms explicitly state: *"Anthropic may not train models on Customer Content from Services."*
- **Confidentiality:** Customer Content (inputs and outputs) is treated as the customer's confidential information.
- **Enterprise:** Full DPA, SOC 2, data processing agreements.

### Key Takeaway
> Anthropic is the most transparent. Consumer = training by default (but opt-out exists). API = no training, period. The commercial terms are explicit and legally binding.

---

## 3. Google (Gemini)

### Gemini (Free & Advanced/One/AI Premium)
- **Data retention:** Governed by Google's general Privacy Policy and the Gemini-specific terms.
- **Training usage:** **Yes, by default** for free users. Google states that activity in Gemini may be used to improve Google products and services.
- **Paid plans:** Gemini Advanced / AI Premium subscribers have **more controls**. Google offers activity controls where you can pause Web & App Activity and Gemini history. However, Google's broad privacy policy still allows aggregated/anonymous usage for service improvement.
- **Human review:** Google may use human reviewers for quality improvement, consistent with its broader AI practices.

### Google AI (Gemini API / Vertex AI)
- **Data retention:** Governed by Google Cloud's Data Processing Addendum and the Gemini API Terms.
- **Training usage:** **No.** Google Cloud states that customer data submitted to the API is **not used to train Google models**. This is covered under Google Cloud's Data Processing Addendum (DPA).
- **Enterprise (Vertex AI):** Full enterprise controls — data residency options, CMEK, SOC 2, HIPAA compliance.

### Key Takeaway
> Google's chat products are embedded in its broader data ecosystem. The API side is enterprise-grade and private. Be cautious with Gemini chat for sensitive data.

---

## 4. Mistral AI

### Le Chat (Free & Premium)
- **Data retention:** Conversations are stored until you delete your account or the conversation.
- **Training usage:** **Yes, by default.** Mistral's privacy policy (effective April 2026) states: *"We use your Input and Output to train our artificial intelligence models... subject to your opt-out."*
- **Opt-out:** **Available.** You can object to the use of your input/output data for model training directly from your account settings.
- **Feedback:** Thumbs up/down ratings and associated conversations are used for training regardless of opt-out.
- **Memory feature:** Le Chat offers a "Memory" feature that stores information from past conversations for personalization. This is opt-in and controllable.

### API (Studio / Pay-as-you-go)
- **Data retention:** Input and output are kept for 30 rolling days for abuse monitoring (unless zero data retention is activated).
- **Training usage:** **No.** Mistral explicitly states: *"We do not use your Input and Output to train our artificial intelligence models when you use... the paid version of our APIs."*
- **Fine-tuning API:** Fine-tuning data is kept until you delete it or terminate your account.
- **Enterprise:** Zero data retention, no training, full DPA.

### Key Takeaway
> Mistral is GDPR-native (French company) and offers clear opt-out controls. API = private by default. Consumer chat = training by default with opt-out. One of the more privacy-conscious providers.

---

## 5. Qwen / Alibaba Cloud (DashScope)

### Qwen Chat (Tongyi Qianwen)
- **Data retention:** Conversations stored per Alibaba Cloud's data policies.
- **Training usage:** **Yes, by default.** Alibaba's terms indicate that user interactions may be used to improve their models and services.
- **Opt-out:** Limited consumer-facing opt-out controls compared to Western providers.

### API (DashScope / Alibaba Cloud)
- **Data retention:** Governed by Alibaba Cloud's Data Processing Addendum.
- **Training usage:** **No.** Enterprise API customers' data is not used for model training, consistent with standard cloud provider practices.
- **Enterprise:** Alibaba Cloud offers DPA, compliance certifications, and data residency options for enterprise customers.

### Key Takeaway
> Qwen follows the standard pattern: consumer chat = training data, API = private. Less transparency on opt-out controls compared to Mistral or Anthropic.

---

## 6. DeepSeek

### DeepSeek Chat (Free & Pro)
- **Data retention:** Conversations are stored. DeepSeek's terms are less detailed than other providers.
- **Training usage:** **Likely yes, by default.** DeepSeek's privacy terms are less explicit about training data usage, but the standard industry practice for free chat products applies.
- **Opt-out:** No clearly documented opt-out mechanism for consumer users.

### DeepSeek API
- **Data retention:** API data is processed per DeepSeek's API terms.
- **Training usage:** **No.** As with other providers, API usage is generally treated as private and not used for training.
- **Pricing:** DeepSeek's API is notably affordable, making it attractive for developers.

### Key Takeaway
> DeepSeek is the least transparent on privacy. Their policies are less detailed, and the company's Chinese jurisdiction raises additional data governance questions for Western users. Use the API for any sensitive work.

---

## 7. Proton Lumo

### Lumo Chat (Free & Paid)
- **Data retention:** Conversations are stored with **zero-access encryption** — Proton cannot read your chat history. Only you can access your conversations by logging into your Proton Account.
- **Training usage:** **No.** Proton explicitly states: *"Unlike other AI assistants, it does not collect your data to train its models or keep any logs of your conversations."* This applies to both free and paid plans.
- **Opt-out:** Not needed — training data usage is disabled by design across all plans.
- **Encryption:** All chats are protected by end-to-end encryption (E2EE). Proton has no technical means to access your conversation data.
- **Jurisdiction:** Proton AG is based in Geneva, Switzerland, operating under Swiss data protection laws — among the strictest in the world.
- **Open source:** Proton's apps are open source and independently audited.
- **Business model:** Proton is funded solely by user subscriptions (no ads, no data monetization). The company is majority-owned by the non-profit Proton Foundation.

### Key Takeaway
> Proton Lumo is the **only** major AI assistant that does not use your data for training — on any plan, free or paid. Zero-access encryption means even Proton can't read your conversations. If privacy is your #1 concern, this is the clear winner.

---

## General Patterns & Recommendations
### The Universal Rule
Every major provider follows the same pattern — **with one exception**:

- **Free chat products** → Your data may be used for training *(except Proton Lumo)*
- **Paid chat plans** → Your data may still be used for training *(sometimes with opt-out; except Proton Lumo)*
- **API (pay-as-you-go)** → Your data is NOT used for training
- **API (enterprise)** → Your data is NOT used for training, with additional guarantees

Proton Lumo breaks this pattern entirely: no training data usage on any plan, free or paid, backed by zero-access encryption.

### What This Means in Practice

| Scenario | Recommended Approach |
|----------|---------------------|
| Casual questions, brainstorming | Any chat product is fine |
| Code review, debugging | Use the API or opt-out if available |
| Proprietary business logic | Always use API/Enterprise |
| Personal/sensitive data | Use API with zero-retention settings |
| Enterprise/compliance needs | Enterprise API with DPA |

### Opt-Out Availability

| Provider | Consumer Opt-Out | How to Access |
|----------|-----------------|---------------|
| OpenAI | ❌ No (for ChatGPT) | N/A |
| Anthropic | ✅ Yes | Account settings |
| Google | ⚠️ Partial | Activity controls |
| Mistral | ✅ Yes | Account settings |
| Qwen | ⚠️ Limited | Account settings |
| DeepSeek | ❌ No | N/A |
| Proton Lumo | ✅ By design | Not needed |

### Jurisdiction Matters

- **US providers** (OpenAI, Anthropic): Subject to US laws (CLOUD Act, etc.)
- **EU provider** (Mistral): GDPR-compliant, DPO contact, CNIL oversight
- **Swiss provider** (Proton): Swiss data protection laws, non-profit ownership, zero-access encryption
- **Chinese providers** (Qwen, DeepSeek): Subject to China's data laws and PIPL

---

### Recommendations

**For maximum privacy:** Use **Proton Lumo**. It's the only provider that guarantees no training data usage across all plans, backed by zero-access encryption and Swiss jurisdiction. You get a genuinely private AI experience without needing to tweak settings or pay for enterprise tiers.

**For developers building apps:** Use the **API** of any provider — they all exclude API data from training. For production workloads with compliance requirements, opt for **enterprise API plans** (OpenAI, Anthropic, Google Cloud) with a signed DPA.

**For casual users who want opt-out control:** **Anthropic** and **Mistral** offer the best consumer-facing opt-out toggles. Flip the switch in your account settings and your data won't be used for training (except for safety review and explicit feedback).

**Avoid for sensitive data:** **ChatGPT** (no opt-out), **Gemini** (embedded in Google's data ecosystem), **DeepSeek** (opaque policies, Chinese jurisdiction), and **Qwen** (limited controls). If you must use these, enable every privacy control available and assume your data could be used for training.

**The golden rule:** If a product is free, *you* are the product. The exception is Proton Lumo — they fund their privacy-first model through paid subscriptions, so even free users get genuine data protection.

---

## Bottom Line

If you care about your data not being used for training:

1. **Use Proton Lumo** — the only provider that guarantees no training data usage on any plan, backed by zero-access encryption
2. **Use the API, not the chat** — this is the universal rule across all other providers
3. **Enable opt-out** where available (Anthropic, Mistral)
4. **For enterprise needs**, get a DPA and use enterprise-tier API plans
5. **Never paste sensitive data** into free chat products — assume it will be used for training
6. **Mistral and Anthropic** offer the most transparent, user-friendly opt-out controls
7. **OpenAI** has the clearest boundary: chat = training, API = private

---

*This article is based on publicly available privacy policies and terms of service as of April 2026. Policies change frequently — always verify with the provider's current documentation before making decisions about sensitive data.*
