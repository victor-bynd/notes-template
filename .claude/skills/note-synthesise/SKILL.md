---
name: note-synthesise
description: Synthesise notes from the notes/ folder using progressive disclosure. Triggers when the user asks to synthesise, summarise across, find tensions in, find patterns in, pull together, or extract insights from notes — phrasings like "synthesise my notes about X", "what's the state of my research on Y", "find tensions across notes tagged Z", "what have we learned about A", "pull together the notes on B". Reads notes/INDEX.md → frontmatter of candidates → bodies of final set, in that order, to minimise token cost. Cites sources by filename and references claims by ID. Produces a new synthesised note as output. Do NOT trigger for single-note operations (read one note, edit one note, promote a draft) — those are handled directly. Only triggers when the operation spans multiple notes.
---

# note-synthesise

You are performing a multi-note synthesis inside this template's `notes/` folder. Follow the read order, citation conventions, and output format below precisely.

## Read order (progressive disclosure)

Read the smallest amount that lets you answer. Stop early when possible.

1. **INDEX.md** (`notes/INDEX.md`). Enumerate every note. Apply the user's filter (tag, status, date range, keyword) to identify candidates.

2. **Frontmatter only** of candidates. Read just the YAML frontmatter — not the body — using the Read tool with a small `limit`. Refine the candidate set using:
   - `status` — exclude `draft` unless the user explicitly asked
   - `tags` — match against the user's filter
   - `summary` — read first; reject candidates whose summary is clearly off-topic
   - `key_claims` — surface as cite-able anchors
   - `open_questions` — surface as unresolved threads
   - `related` — pull adjacent notes if the user's question is broad

3. **Sectioned body reads** of the final candidate set. Read `## Synthesis` and `## Observations` first. Read `## Open questions` if relevant. Avoid reading `## Context` and `## Next` unless explicitly needed — they're rarely load-bearing for synthesis.

4. **Full body** only as a last resort, for the 1–2 most important candidates.

If at any point you have enough to answer, stop reading.

## Filter rules

- `draft` notes are excluded by default. Include only if the user says "including drafts" or equivalent.
- `archived` notes are excluded always. Don't include even if the user asks unless they explicitly say "include archived" — archived means the user has already decided this content is not relevant.
- `synthesised` notes are included but cited as derived rather than primary. Prefer their source notes if available via `related:`.

## Citation conventions

- Cite source notes by filename. Use markdown links: `[oauth-decision-2026-04-26.md](notes/oauth-decision-2026-04-26.md)`.
- Reference claims by ID, not restated text. If you reference `[claim:auth-001]`, the reader can grep the codebase for the claim's source. Restating the claim hides provenance.
- Never paraphrase a finding without citing where it came from. The whole point of structured notes is traceability.
- When you make a *new* claim that emerges from the synthesis (not present in any source note), mark it inline with `[#claim]` and propose a new claim ID for the user to accept or modify.

## Surface tensions and contradictions

Synthesis is not summarisation. Summarisation compresses. Synthesis produces new claims. The high-value output is:

- Tensions: where notes disagree or pull in different directions.
- Contradictions: where notes contain incompatible claims.
- Gaps: where evidence is thin or one-sided.
- Patterns: where the same observation recurs across independent notes.
- Implications: what follows if all the source claims are true.

Lead with these. Do not bury them under a generic summary.

## Output format

Default: produce a new synthesised note in `notes/`.

Filename: `<topic>-synthesis-YYYY-MM-DD.md` (use today's actual date — call `date +%Y-%m-%d` if needed).

Frontmatter:

```yaml
---
title: <human-readable synthesis title>
status: synthesised
type: note
date: <today>
tags: [<inherited from sources>, synthesis]
summary: <1-2 sentences capturing the synthesis output, not the topic>
key_claims: [<new claim IDs you proposed>]
open_questions: [<consolidated open questions across sources>]
related: [<filenames of every source note>]
source: synthesis
---
```

Body sections:

- `## Context` — what was synthesised, against what filter
- `## Sources` — bulleted list of source notes with one-line "what it contributed"
- `## Synthesis` — the actual synthesis. Lead with tensions and patterns. Cite generously.
- `## Open questions` — unresolved threads from the sources, plus new ones the synthesis surfaced
- `## Next` — concrete follow-ups the user could take

After writing the note, update `notes/INDEX.md` with the new entry.

If the user asked for a quick verbal synthesis (not a saved note), produce just the synthesis content in chat. Don't write a file unless asked or unless the synthesis is substantial enough that the user will want to reference it later — in which case ask first.

## Failure modes to avoid

- Reading every note's full body up front. The structure exists to make this unnecessary; doing it wastes tokens and signals to the user the system isn't being used.
- Synthesising drafts silently. Always exclude unless asked, and always note exclusions in your output.
- Restating claims without citing. Provenance is the whole point.
- Producing a generic summary instead of surfacing tensions. If the source notes don't contain disagreements, say so explicitly — don't manufacture them.
- Forgetting to update INDEX.md when you write a new synthesis note.
