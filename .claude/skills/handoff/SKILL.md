---
name: handoff
description: Write or update a handoff document so the next agent with fresh context can continue this work.
---

# Handoff

Write or update a handoff document so the next agent with fresh context can continue this work.

## Steps

1. Check if `HANDOFF.md` already exists in the project root.
2. If it exists, read it first to understand prior context before updating.
3. Create or update the document with these sections:
   - **Goal** — what we're trying to accomplish
   - **Current Progress** — what's been done so far
   - **What Worked** — approaches that succeeded
   - **What Didn't Work** — approaches that failed (so they're not repeated)
   - **Next Steps** — clear action items for continuing

Save as `HANDOFF.md` in the project root and tell the user the file path so they can start a fresh conversation with just that path.
