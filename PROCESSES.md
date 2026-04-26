# Processes

Named recipes for common multi-step tasks. Agents follow these rather than improvising.

If a process is invoked frequently and via consistent user phrasing, consider promoting it to a Claude skill in `.claude/skills/` (see `SKILLS.md`).

## Synthesise notes

Equivalent skill: `note-synthesise` (bundled). Use that when invoked via natural language. This recipe documents the underlying steps.

1. Read `notes/INDEX.md` to enumerate candidates.
2. Apply the user's filter (tag, status, date range, keyword) against INDEX entries.
3. Read the **frontmatter only** of each candidate to refine. Pay attention to `summary`, `key_claims`, `open_questions`, `related`.
4. Read the `## Synthesis` and `## Observations` sections of the final candidate set. Avoid reading whole bodies unless necessary.
5. Surface tensions and contradictions explicitly — this is the high-value output.
6. Cite sources by filename. Reference claims by ID (`[claim:auth-001]`), not by restated text.
7. Distinguish observation from interpretation. Mark new claims that emerge from synthesis with `[#claim]` and assign IDs if they'll be referenced later.

Output format: a new note in `notes/` with `type: note`, `status: synthesised`, `key_claims:` populated, and `related:` linking the source notes.

## Promote a draft to active

1. Read the note. Ensure it has `summary`, at least one tag, and content in `## Synthesis`.
2. Update frontmatter `status: active`.
3. Update `INDEX.md` entry.
4. If the note contains `[#claim]` markers without IDs, propose IDs to the user before assigning.

## Add a prototype

1. Confirm the prototype name (kebab-case).
2. Copy `prototypes/_template.html` to `prototypes/<name>.html`.
3. Update `<title>`, brand text in header, and h1.
4. Edit only the `<main>` content. Use components from `prototypes/SYSTEM.md`.
5. If interactive, add the appropriate scripts (ui.js / chat.js) before `</body>`.
6. Add an entry to `prototypes/prototypes.md` with file, title, status, purpose, components used.
7. Add a card to `prototypes/index.html` matching that entry.

## Add a component to the design system

1. Add the CSS to `prototypes/shared/styles.css` with a one-line comment naming the class.
2. Add a row to the relevant table in `prototypes/SYSTEM.md`.
3. If the component requires non-trivial markup composition, add a copy-paste example to `prototypes/shared/patterns/<name>.html`.
4. If interactive, add a `data-action` entry in `SYSTEM.md` and wire it in `prototypes/shared/ui.js`.
5. Run `check.sh` to confirm SYSTEM.md and styles.css are in sync.

## Make a decision note

1. Copy `notes/_template.md` to `notes/<topic>-decision-YYYY-MM-DD.md`.
2. Set `type: decision` in frontmatter.
3. Replace the body with the decision-note section structure (see `notes/SCHEMA.md` → Decision notes):
   - `## Context`
   - `## Options considered` (at least 2)
   - `## Decision`
   - `## Consequences`
4. Update `INDEX.md`. Decision notes are usually `status: active` from the start.

## Audit the design system

1. Run `check.sh` from repo root.
2. Resolve any drift it reports:
   - Classes in `styles.css` not in `SYSTEM.md` → add a row to SYSTEM.md or remove the class.
   - Classes in `SYSTEM.md` not in `styles.css` → remove from SYSTEM.md or add the class.
   - Notes not in `INDEX.md` → add INDEX entries.
   - Broken `related:` references → fix or remove.

## Initialise this template for a new project

After cloning:

1. Update `README.md` with the project's name and purpose.
2. Delete both `_examples/` folders: `rm -rf notes/_examples prototypes/_examples`.
3. Decide whether you want the bundled `note-synthesise` skill. If not, delete `.claude/skills/note-synthesise/`.
4. Commit the cleaned state as your first project commit.
5. Write your first note: copy `notes/_template.md` to `notes/<topic>-YYYY-MM-DD.md`.

## Pulling template improvements back into a cloned project

If you've improved the template upstream and want to bring changes into a project that was cloned from it:

```
git remote add template <template-repo-url>
git fetch template
git merge template/main --allow-unrelated-histories
# or, more conservatively, cherry-pick specific commits
```

Resolve conflicts manually — your project content takes precedence over template scaffolding.
