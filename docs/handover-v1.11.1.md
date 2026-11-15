# Handover pointer — v1.11.1 corrections (rebased from v1.8.1 onto v1.11.0)

**Date:** 14 November 2026
**Book:** *Cuộc sống và con người* — ai4l-book at v1.11.0 (head `06f73375`)

## Where the full handover lives

The complete handover package for Claude is filed in the private pipeline repo
**AI4L**, `docs/handoffs/v111/`, and is under review in
[AI4L PR #19](https://github.com/fossbk-spec/AI4L/pull/19)
(branch `handover-claude-v111-rebase`, commit `20a8c992`):

- `HANDOVER-v1.11.0-rebase.md` — self-contained handover for Claude
- `v111-rebase.diff` — unified diff (591 lines) of the prepared v1.11.1 edits
- `rebase-report.md`, `fix-inventory.md`, `V111-REBASE-NOTES.md`

(The AI4L repo is private, so the link above is only openable by collaborators.
The prepared edits themselves are a diff against this repo's v1.11.0 tree.)

## Summary of the rebase

Of the 32 fixes from the v1.8.0 chapter review (v1.8.1 corrections pass):

- **1 already in v1.11.0:** F01 (Nguyễn Tài Thư 2009 — entry present in the
  v1.11.0 bibliography, cited 3× in Chapter 7; re-check the render after the
  next Pages rebuild).
- **30 fixes + 12 polish + 9 bibliography fixes applied** in the prepared
  v1.11.1 working copy (bibliography 232 → 247 entries; 246 `@cite` keys,
  0 missing).
- **1 conflict, NOT applied:** F08 (Brynjolfsson). The v1.11.0 text is
  correct — QJE 140(2):889–942, DOI 10.1093/qje/qjae044, 5,172 agents, +15%.
  The 5,179 / 14% figures come from the NBER Working Paper abstract, not the
  journal article. Do **not** apply them.

## Claude's task

Review the prepared edits against their sources, apply the approved ones to
this repo via a pull request (never push direct to `main`), keep the v1.11.0
Brynjolfsson text, decide the two open questions with Ben (D1: chapter status
boxes; D2: `@sepEpictetus` in Chapter 7), tag the merged result `v1.11.1`,
verify the live GitHub Pages site, and report back.

## Note

An earlier note in the handover says Muse could not push to these repos
(403 errors on 9–11 Nov 2026). That was true then; the write path works now —
this pointer file and the AI4L handover branch were both pushed by Muse via
the GitHub connector on 14 Nov 2026.
