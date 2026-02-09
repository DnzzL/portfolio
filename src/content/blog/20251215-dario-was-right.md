---
title: 'Dario Was Right: The New Reality of AI Coding'
description: 'From skepticism to confession: how AI models evolved to write 90% of our code and what it means for developers.'
pubDate: '2025-12-15'
categories: ['AI', 'Development']
heroImage: '/thumbnails/opencode.webp'
tags: ['AI', 'Opencode', 'GLM', 'Productivity']
---

Remember when Dario Amodei, CEO of Anthropic, predicted that "90% of code will be made by AI in 3–6 months"? The tech community had a field day with that statement. Memes flew. Twitter threads mocked his optimism. Developers scoffed at the timeline. It felt like another case of tech CEO hyperbole.

Well, here we are, and the punchline is on us.

## The prophecy fulfilled

I talk to developers daily. The confession is always the same, delivered with a mix of awe and resignation: "I barely write code myself anymore." It's not just the early adopters or the AI enthusiasts. It's backend engineers, frontend specialists, full-stack developers—people who take pride in their craft. They're all admitting the same thing: their hands are on the keyboard less and less.

The tools got better. Much better.

## The technical leap

What changed? Everything.

Models like GPT 5.2 and Opus 4.5 brought reasoning capabilities that feel almost scary. They don't just autocomplete; they architect. They understand intent across thousands of lines of context. They catch edge cases you'd miss. They refactor with the confidence of a senior engineer who's been in the codebase for years.

But the real democratization came from an unexpected place: China.

GLM 4.7, my current daily driver, costs $6 per month. Six dollars. For a model with a generous token window, excellent reasoning, and none of the rate limiting that makes Western APIs feel like they're rationing intelligence. This isn't a toy or a compromise—it's a production-grade tool at a price point that removes all friction.

When intelligence becomes this cheap, behaviors change. You stop hoarding API calls. You stop optimizing prompts to save tokens. You just... use it. Liberally. For everything.

## The small team advantage

The impact on team productivity is staggering. I've watched three-person teams ship features that would have required a dozen engineers two years ago. The constraint is no longer typing speed or syntax knowledge—it's clarity of thought. If you can describe what you want, you can build it.

This levels the playing field in ways we're only beginning to understand. A solo developer with AI assistance can compete with funded startups. Small teams can punch above their weight class indefinitely. The barrier to building isn't technical execution anymore; it's imagination and taste.

This shift has created a new breed of weekend warrior developers who can ship products that previously required entire teams. As [Roberto Selbach observed](https://rselbach.com/your-sub-is-now-my-weekend-project), your subscription business might just become someone's weekend side project. The democratization of AI coding means that the gap between "I have an idea" and "I have a product" has collapsed from months to days.

But here's the uncomfortable truth: this new reality comes with shadows.

## AI fatigue is real

We've coined a term for it now: **AI fatigue**. It manifests differently for everyone, but the root cause is the same—death by a thousand micro-decisions.

Every AI interaction requires judgment. Should I accept this suggestion? Does this refactor actually improve the code? Is the AI understanding the context correctly, or is it about to introduce a subtle bug? Each decision is small, but they compound. By the end of a coding session, your decision-making capacity is depleted in a way that pure programming never quite achieved.

My personal symptom? Parallel branch hell. I find myself spinning up multiple branches, experimenting with different AI-assisted approaches simultaneously, constantly context-switching between half-finished implementations. The AI makes it so easy to start that I struggle to finish. I'm the bottleneck now, not the typing.

This self-imposed context switching is exhausting in a way that focused, deep work never was. The cognitive overhead of managing multiple AI conversations, tracking which branch has which experiment, and remembering the state of each—it's a new kind of technical debt, but it lives in your head.

But there's another form of fatigue that's more existential: **token anxiety**.

You're in flow. The AI is generating beautiful code. Everything is clicking. Then—_thud_—you hit your token limit. The meter has run out. Now you're faced with a choice: pay more, wait for the next billing cycle, or... write the code yourself?

Here's the uncomfortable realization: writing code ourselves doesn't feel like a possibility anymore. The thought of manually typing out that function, that component, that entire feature file feels almost physically painful. Like trying to walk somewhere you've been driving for years. You _could_ do it, but the friction is unbearable.

That meme hits different when you've lived it:

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">running out of tokens and having to go outside <a href="https://t.co/xyz123">pic.twitter.com/xyz123</a></p>&mdash; gaut (@0xgaut) <a href="https://twitter.com/0xgaut/status/2016290980949819872">July 22, 2025</a></blockquote>

There's something deeply psychological about this dependency. We've offloaded the mechanical act of coding so completely that our brains have reconfigured around AI availability. When it's gone, we're not just slower—we're paralyzed.

## The review crisis

Code review has become the thorniest problem in AI-assisted development.

When you wrote every line yourself, review was straightforward. You knew the trade-offs because you lived them. You understood the edge cases because you considered them during implementation. The code had a narrative you could follow.

Now? Code piles up. The AI generates elegant solutions faster than you can truly digest them. You review it, sure. You read every line. But do you _understand_ it the way you understand code you struggled with? The kind you rewrote three times before getting right?

There's a depth of comprehension that comes from the struggle. When the struggle is outsourced, something is lost in the review. You catch syntax errors and obvious bugs, but the subtle architectural implications—the things that bite you six months later—slip through more easily.

The review becomes performative. You scroll, you nod, you approve. But you're not _owning_ that code in the way you used to.

This tweet gets more accurate every month:

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">"We used to review every line of code before it went into production"</p>&mdash; Karthik Hariharan (@hkarthik) <a href="https://twitter.com/hkarthik/status/2019237915839385670">July 27, 2025</a></blockquote>

The old guard sounds almost quaint now. _"We used to review every line..."_ Sure, grandpa. Tell us more about walking uphill both ways in the snow.

## The unspoken confession

Here's a secret few will say out loud: I sometimes ship code I haven't properly reviewed.

There, I said it. And I'm not alone.

When the AI generates three hundred lines of clean, well-structured code in response to a prompt, and your tests pass, and the feature works as expected, the temptation to just... merge it... is overwhelming. You scanned it. It looks reasonable. The logic flows. But did you _really_ review it?

The honest answer for many of us is no. Not always. Not thoroughly.

But here's the adaptation: we're compensating with an aggressive investment in automated testing and human QA. If I can't review every line with the depth I once did, I need other safety nets. Unit tests catch regressions. Integration tests verify behavior. Human testers exercise edge cases I might miss.

This is a shift in how we think about quality assurance. Traditionally, code review was the primary gate. Now it's becoming one gate among several, and for better or worse, not always the most rigorous one.

I'm not saying this is ideal. There's risk here—architectural debt, subtle bugs, security issues that tests might not catch. But it's the pragmatic reality of working at AI-augmented velocity. You either slow down to review everything (and lose the productivity gains), or you build resilient safety nets and accept a different risk profile.

Most of us are choosing the latter, even if we're not admitting it publicly.

## The new craft

Here's the twist: coding has become a commodity, but orchestration is now a fine craft.

Writing functions, debugging syntax, implementing algorithms—these are table stakes now. Anyone with a subscription can produce working code. The scarce skills have shifted up the stack:

- **Defining the right agent skills**: Knowing which capabilities to give your AI, when to constrain it, when to let it roam
- **Architectural judgment**: Understanding which decisions matter and which can be delegated
- **Context curation**: Feeding the AI the right information at the right time—docs, patterns, constraints
- **Taste and discernment**: Knowing when AI-generated code is good enough and when it needs human refinement

The developers who thrive in this new world aren't necessarily the best typists or the ones with the deepest algorithmic knowledge. They're the ones who can effectively partner with AI—setting boundaries, providing context, reviewing with skepticism, and knowing when to override.

It's a different skill set. Some veteran developers are adapting beautifully. Others are struggling to find their footing in a world where their hard-won expertise feels less relevant.

## Finding equilibrium

I'm still figuring out my relationship with AI coding. The productivity is undeniable. The joy of building remains, though it's different now—more architectural, less granular. The fatigue is real, but manageable with discipline.

My current approach:

1. **Single-threaded focus**: No more parallel branches. One experiment at a time, see it through.
2. **Mandatory reflection time**: Before accepting any substantial AI contribution, I step away for five minutes. Come back with fresh eyes.
3. **Deep review sessions**: Dedicated time blocks where I don't generate new code, only review and understand existing AI contributions.
4. **Preservation of hard problems**: I still solve complex algorithms myself. Not because the AI can't, but because I need to maintain that capability.
5. **Investment in testing**: I've doubled down on comprehensive test suites—unit, integration, and end-to-end. Tests are my safety net when review depth suffers.
6. **Selective thoroughness**: Not all code needs the same scrutiny. I reserve deep reviews for critical paths, security-sensitive code, and architectural decisions. The boilerplate gets a lighter touch.

The goal isn't to maximize AI usage—it's to maximize human judgment while leveraging AI execution.

## Conclusion

Dario was right. The timeline felt aggressive, but the trajectory was spot-on. We're living in a world where AI writes the vast majority of code, and the transition happened so smoothly that many of us barely noticed we crossed the threshold.

The tools will keep improving. GLM 5.0 will make 4.7 look primitive. The cost will drop further, the capabilities will expand, and our workflows will adapt again.

The question isn't whether AI will write our code—it already does. The question is: what kind of developers do we become in that reality?

I believe the answer lies in embracing the shift without surrendering to it. Use AI for execution. Reserve human cognition for architecture, judgment, taste, and the occasional stubborn problem you solve yourself—just to remember what that feels like.

The craft of software development isn't dying. It's evolving. And like any evolution, there will be winners who adapt and losers who cling to the old ways. The winners will be the ones who recognize that coding was never really about typing—it's about thinking clearly and building things that matter.

AI can help with the typing. The thinking is still ours to own.
