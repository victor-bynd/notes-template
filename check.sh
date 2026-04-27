#!/usr/bin/env bash
# ============================================================
# check.sh — drift detection for the template.
# Run from repo root: ./check.sh
# Reports drift between source files and reference docs.
# Non-zero exit on any issue found.
# ============================================================

set -u
cd "$(dirname "$0")"

ERRORS=0

if ! command -v python3 >/dev/null 2>&1; then
  echo "[FAIL] python3 not found — required for drift checks."
  exit 1
fi

python3 - <<'PY'
import os, re, sys, subprocess

errors = 0
def fail(msg):
    global errors
    print(f"[FAIL] {msg}")
    errors += 1
def ok(msg):
    print(f"[OK]   {msg}")

# Classes defined externally (by libraries) or used as runtime hooks.
# Allowlist: don't flag these as missing definitions.
ALLOW_HTML_CLASSES = {
    'mermaid',     # rendered by mermaid.js
    'active',      # compound selector .tab.active / a.active
}

# ---------- 1. Design system drift (SYSTEM.md ↔ styles.css) ----------
print("\n== Design system drift ==")

CSS = 'prototypes/shared/styles.css'
SYS = 'prototypes/SYSTEM.md'

if not (os.path.exists(CSS) and os.path.exists(SYS)):
    fail(f"Missing {CSS} or {SYS}")
else:
    css_text = open(CSS).read()
    sys_text = open(SYS).read()

    # Strip /* ... */ comments before parsing
    css_no_comments = re.sub(r'/\*.*?\*/', '', css_text, flags=re.DOTALL)

    # Extract every class name from CSS. Lookbehind ensures we don't match
    # filenames like chat.html or numbers like .3 — must be preceded by a
    # non-word character (start of line, whitespace, comma, brace, etc.)
    css_classes = set(re.findall(r'(?<![A-Za-z0-9_])\.([a-z][a-z0-9_-]*)', css_no_comments))
    # Skip state-modifier classes that exist only as compound selectors.
    # These are documented at the component level, not as standalone classes.
    css_classes -= {'active'}
    # Extract documented classes from SYSTEM.md (in `.classname` backticks).
    # Strip file extensions — file extensions are sometimes written as `.svg`,
    # `.png`, etc. in docs and would otherwise be confused for class references.
    FILE_EXTENSIONS = {'svg','png','jpg','jpeg','gif','webp','pdf','md','html','htm',
                       'css','js','json','yaml','yml','xml','txt','sh','drawio','excalidraw'}
    sys_classes = set(re.findall(r'`\.([a-z][a-z0-9_-]*)`', sys_text)) - FILE_EXTENSIONS

    missing_in_doc = css_classes - sys_classes
    missing_in_css = sys_classes - css_classes

    if missing_in_doc:
        fail("Classes in styles.css but not documented in SYSTEM.md:")
        for c in sorted(missing_in_doc):
            print(f"        .{c}")
    else:
        ok("All CSS classes documented in SYSTEM.md")

    if missing_in_css:
        fail("Classes documented in SYSTEM.md but not in styles.css:")
        for c in sorted(missing_in_css):
            print(f"        .{c}")
    else:
        ok("No phantom classes in SYSTEM.md")

# ---------- 2. HTML class usage vs CSS definitions ----------
print("\n== HTML class usage ==")

if os.path.exists(CSS):
    css_classes = set(re.findall(r'\.([a-z][a-z0-9_-]*)', open(CSS).read()))

    used = set()
    for root, dirs, files in os.walk('prototypes'):
        if '_examples' in root.split(os.sep):
            # Examples reference classes too; include them
            pass
        for f in files:
            if not f.endswith('.html'):
                continue
            text = open(os.path.join(root, f)).read()
            for m in re.findall(r'class="([^"]+)"', text):
                for cls in m.split():
                    used.add(cls)

    undefined = used - css_classes - ALLOW_HTML_CLASSES
    if undefined:
        fail("Classes used in HTML but not defined in styles.css (and not allowlisted):")
        for c in sorted(undefined):
            print(f"        .{c}")
    else:
        ok("All HTML classes are defined in styles.css")

# ---------- 3. Notes in folder vs INDEX.md ----------
print("\n== Notes index drift ==")

if os.path.exists('notes/INDEX.md'):
    notes_in_dir = set()
    for f in os.listdir('notes'):
        if f.endswith('.md') and f not in {'INDEX.md','SCHEMA.md','AGENTS.md','README.md','_template.md'}:
            notes_in_dir.add(f)

    indexed = set(re.findall(r'\(([A-Za-z0-9_-]+\.md)\)', open('notes/INDEX.md').read()))

    if not notes_in_dir:
        ok("No notes yet (INDEX.md scaffold only)")
    else:
        missing = notes_in_dir - indexed
        if missing:
            fail("Notes not listed in INDEX.md:")
            for n in sorted(missing):
                print(f"        {n}")
        else:
            ok(f"All {len(notes_in_dir)} note(s) indexed")

# ---------- 4. Note frontmatter validity ----------
print("\n== Note frontmatter ==")

try:
    import yaml
except ImportError:
    print("[SKIP] PyYAML not installed; skipping frontmatter validation.")
    print("       pip install pyyaml --break-system-packages")
else:
    required = {'title', 'status', 'date', 'tags', 'summary'}
    valid_status = {'draft','active','synthesised','archived','example'}
    checked = 0
    fm_errors = 0

    for root, dirs, files in os.walk('notes'):
        # Skip _examples for required-field check (examples may use status: example)
        for f in files:
            if not f.endswith('.md'):
                continue
            if f in {'INDEX.md','SCHEMA.md','AGENTS.md','README.md','_template.md'}:
                continue
            p = os.path.join(root, f)
            text = open(p).read()
            m = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
            if not m:
                fail(f"{p}: no frontmatter")
                fm_errors += 1
                continue
            try:
                data = yaml.safe_load(m.group(1)) or {}
            except yaml.YAMLError as e:
                fail(f"{p}: invalid YAML: {e}")
                fm_errors += 1
                continue
            missing = required - set(data.keys())
            if missing:
                fail(f"{p}: missing fields: {sorted(missing)}")
                fm_errors += 1
            if 'status' in data and data['status'] not in valid_status:
                fail(f"{p}: invalid status '{data['status']}'")
                fm_errors += 1
            checked += 1

    if fm_errors == 0:
        ok(f"Frontmatter valid in all {checked} note(s)")

# ---------- Summary ----------
print()
if errors == 0:
    print("== All checks passed ==")
    sys.exit(0)
else:
    print(f"== {errors} check(s) failed ==")
    sys.exit(1)
PY

exit $?
