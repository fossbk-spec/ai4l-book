# F01 investigation — Nguyễn Tài Thư (2009) missing from rendered `references.html`

**Date:** 22 Nov 2026 · **Base:** ai4l-book main `9ff72a49` (v1.11.1), re-checked at main `4b2a724b` (v1.11.2) · **Status: OPEN — not reproducible. No render cause found in either version; the entry is present in the live v1.11.2 site (verified by direct download 22 Nov 01:11 UTC). Left open pending a human in-browser check; no speculative fix applied, no metadata invented.**

## The defect (re-confirmed this pass)

- Entry `@article{nguyenTaiThu2009,...}` is in the 247-entry `references.bib` (lines 2029–2036 of the base file).
- Cited 3× in Ch. 7 (`chapters/07-kho-dau-vo-thuong.qmd` lines 77, 79, 138 — §6 and the "Đọc thêm" list).
- Renders **in-text** as "Nguyễn 2009" (ref #33) on the live Ch. 7 page — re-checked 21 Nov 2026 ~22:21 UTC.
- **Absent from the rendered `references.html`** — re-checked the same crawl (1,051 lines): text search for "Tài Thư" and for "Xu hướng nhập thế" both return nothing. The rendered N-section runs "Nguyen, Cuong Tu. 1997 → Nguyễn, Hữu Sơn. 2019 → Nietzsche, Friedrich. 1883–1885".

## The entry (verbatim from base `references.bib`)

```bibtex
@article{nguyenTaiThu2009,
  author = {Nguyễn, Tài Thư},
  title = {Xu hướng nhập thế trong tư tưởng Phật giáo Trần Nhân Tông},
  journal = {Tạp chí Nghiên cứu Tôn giáo},
  year = {2009},
  number = {11},
  pages = {13--20},
  url = {https://triethoc.edu.vn/vi/chuyen-de-triet-hoc/tu-tuong-viet-nam/xu-huong-nhap-the-trong-tu-tuong-phat-giao-tran-nhan-tong_668.html}
}
```

## Hypotheses tested (all from repo files + live-site re-checks)

| # | Hypothesis | Test | Verdict |
|---|---|---|---|
| H1 | Stale deploy — the live site was built from an older bib | Live `references.html` (crawled 21 Nov 2026 22:21 UTC) contains the other v1.11.1 entries (Thomson 1985, Nietzsche 1887, Noy 2023, Parasuraman 2010, Digital Omnibus 2026, Sartre 1946). | **Ruled out** (as in the 21 Nov review). |
| H2 | Missing `volume` field (only `number = {11}`) breaks the CSL-JSON conversion or the CSL style drops the entry | 4 `@article` entries lack `volume`: `nguyenTaiThu2009`, `nguyenHuuSon2019`, `thomas2026`, `curtin2002`. The other three **all render** on the live site: Nguyễn Hữu Sơn 2019 (references.html L722–724), Curtin 2002 (L184–186), Thomas 2026 (L974–978). | **Ruled out as sole cause.** |
| H3 | Diacritic author sort — "Nguyễn" sorts oddly / is dropped by the sort | `nguyenHuuSon2019` has the identical author structure (`Nguyễn, Hữu Sơn`, same NFC codepoints for "Nguyễn": U+004E U+0067 U+0075 U+0079 U+1EC5 U+006E) and renders; `nguyenCuong1997` (ASCII "Nguyen, Cuong Tu") also renders. Both entries are NFC-normalized. | **Ruled out as sole cause.** |
| H4 | BibTeX syntax error in/around the entry (unbalanced brace swallowing it) | Whole-file brace depth = 0; neighbours clean (`dang2022` before, `nguyenHuuSon2019` after, both well-formed). | **Ruled out.** |
| H5 | Duplicate key / duplicate work colliding in CSL-JSON | 247 entries, 247 unique keys, 0 duplicates. No other entry shares the title or the author+year. | **Ruled out.** |
| H6 | Underscore in the `url` field breaks parsing | 3 entries have `_` in a URL; the other two render (Seneca Wikisource URL, `references.bib` L1975; Weil Wikisource URL, L2257). | **Ruled out as sole cause.** |
| H7 | Entry not actually cited / `nocite` filter in `references.qmd` | Cited 3× in Ch. 7 body + once in "Đọc thêm"; in-text citation resolves (renders "Nguyễn 2009", ref #33), so pandoc/citeproc found the key. `references.qmd` is only a heading plus an empty `::: {#refs}` div — no per-key filter, no `nocite` anywhere in the repo. No `csl:` key in `_quarto.yml` (default citeproc). | **Ruled out.** |
| H8 | Build failed / warned on this entry | PR #21 check runs (via `pull_request_read`, method `get_check_runs`): run 43607967068, 14 Nov 2026 — `build` completed **success**, `deploy` skipped (PR event). The check-runs API exposes only run/job metadata, **not log text**, so no citeproc warning for this key could be read. The live site was deployed by the separate main-push run; its log is likewise not retrievable with the available read tools. | **Not testable from here — log check still needed (see below).** |

## What remains

No field or combination of fields in the repo distinguishes this entry from the three volume-less entries that do render, and the entry is well-formed, uniquely keyed, cited, and resolved in-text. The most likely remaining explanations are:

1. **A pandoc-citeproc / CSL-JSON edge case in the Quarto 1.11.9 render** — e.g. how this entry's specific field combination (article + `number`-only + Vietnamese journal string + long URL) converts or sorts — which cannot be seen from the `.bib` alone; or
2. **A build-time warning/error visible only in the Actions log** (e.g. a citeproc warning naming this key).

**Not reproducible locally:** this VM has no Quarto and no pandoc, so no local render test was possible.

## Exact checks still needed (for the parent / Ben)

1. **Build log:** open the GitHub Actions run for the main-push deploy of merge `9ff72a49` (and PR #21 run 43607967068), download the "Render book (HTML + PDF via Typst)" step log, and search it for `nguyenTaiThu2009` and for any `citation`/`citeproc` warning.
2. **Minimal reproduction:** in a scratch copy, a one-line `.qmd` citing only `[@nguyenTaiThu2009]` against the same `references.bib` and `_quarto.yml`, rendered with the same Quarto 1.11.9. If the entry drops there too, bisect fields one at a time (remove `url`, then `number`, then the Vietnamese `journal`) to isolate the trigger. Also dump the generated CSL-JSON (`quarto render` intermediate / `pandoc --to csljson`) and check whether the item is present and how its author/date are encoded.
3. **Do not "fix" by inventing metadata** (e.g. a volume number for *Tạp chí Nghiên cứu Tôn giáo* 2009 no. 11) — no volume was found in the sources checked, and H2 shows a missing volume does not explain the drop.

## Files consulted

- `references.bib` (base blob SHA `5ec55d18ce54275501901d114e3b9abeb3d9fe9f`), `references.qmd` (`03f87ec87a…`), `_quarto.yml` (`92a7f6845a…`), `.github/workflows/publish.yml` (`403674dfdd…`), `tests/test_site.py` (`561efe12db…`), `chapters/07-kho-dau-vo-thuong.qmd` (`29d7bdab20…`).
- Live site re-checks: `references.html` and `chapters/07-kho-dau-vo-thuong.html`, crawled 21 Nov 2026 ~22:21 UTC.
- Note: `tests/test_site.py` has no check that the rendered bibliography is complete (it checks encyclopedia links ≥ 15, mindmap links, no `.qmd` links, controls/debates, assets) — a completeness check (every cited key has a `#ref-<key>` anchor in `references.html`) would have caught F01 in CI.

---

## Follow-up investigation — 22 Nov 2026 (main `4b2a724b`, v1.11.2)

All steps below were run by the F01 investigator on 22 Nov 2026. **Outcome: no cause found — F01 does not reproduce in Quarto 1.11.9, in either version's inputs, and the entry is present on the live v1.11.2 site.** The original "absent" observation rests entirely on browser-crawler text snapshots; see "Crawler-artifact evidence".

### (1) Build-log check

- PR #21 run `43607967068` (check-runs API): `build` completed **success**, `deploy` skipped (PR event). PR #23 run `44959986557`: `build` success, `deploy` skipped.
- Main-push deploys found via the Actions runs list: v1.11.1 merge `9ff72a49` = run `43608194343`; v1.11.2 merge `4b2a724b` = run `44964804813` (Status Success, build 48s, deploy 10s, Pages artifact `github-pages` 1.25 MB, sha256 `0863795f…`).
- Annotations on both main-push runs: **only** Node.js 20 deprecation warnings and the ubuntu-latest migration notice. **No citeproc / citation warning annotation on any run.**
- Raw step-log text could **not** be read: text fetch of the run/job pages returns annotations only (the Actions UI is JS-heavy); `api.github.com` returned HTTP 403 to the text fetcher; the GitHub connector exposes check-run/job metadata only, no log-download tool. So a citeproc warning in the raw log cannot be ruled out from the log side — but no such warning is visible anywhere it can be read, and the local renders below (same Quarto, same command, same inputs) produce no warning at all.

### (2) Quarto 1.11.9 install

- `quarto`/`pandoc` were absent from the VM. Downloaded the official release tarball `quarto-1.11.9-linux-amd64.tar.gz` from `github.com/quarto-dev/quarto-cli/releases/download/v1.11.9/` (release page verified: tag `v1.11.9`, commit `7c02421`, released 30 Oct 2026; HEAD returned 302 to the official release-asset host). Size 138,715,961 bytes, SHA-256 `9d037baa3b38ffac7217edca1d2e53760b0fab4d5749220740a32056e03a1530`. No published checksum was listed on the release page or the quarto.org download page text, so nothing to compare against; integrity was verified by successful extraction plus `quarto --version` → `1.11.9`. Installed under `~/workspace/quarto-1.11.9/` (home directory only, no system paths). Bundled pandoc is 3.10.

### (3) Minimal reproduction — DOES NOT reproduce (both versions)

- Scratch project `f01-repro/`: real `references.bib` + real `references.qmd` from main, minimal `_quarto.yml` carrying the citeproc-relevant settings (`bibliography: references.bib`, `lang: vi`, no `csl:` key), one-line `index.qmd` citing only `[@nguyenTaiThu2009]` plus controls `[@nguyenHuuSon2019; @thomson1985; @curtin2002]`.
- `quarto render` exit 0, **no warnings**. `references.html` contains all four: `id="ref-nguyenTaiThu2009"` present, rendered as "Nguyễn, Tài Thư. 2009."; in-text "Nguyễn 2009" resolves. No bisection was needed because the entry did not drop — there is no field to isolate.
- Repeated with the **v1.11.1** `references.bib` (247 keys, fetched at full SHA `9ff72a4941b398f783c955f1602c24cde0a0ccdc`): exit 0, `#ref-nguyenTaiThu2009` present, "Nguyễn, Tài Thư. 2009." renders.

### (4) CSL-JSON dump

- Bundled pandoc 3.10, `pandoc --from biblatex --to csljson references.bib` (main): 250 items, 250 unique ids, **no warnings on stderr**. `nguyenTaiThu2009` present with author family `Nguyễn` / given `Tài Thư`, `issued` 2009, `type` `article-journal`, `issue` 11, `page` 13-20, container-title `Tạp chí Nghiên cứu Tôn giáo`, URL intact. (Pandoc sentence-cases the title in the JSON; the rendered HTML shows the same title-case behaviour as every other entry — not a defect.)

### (5) Full-book render — DOES NOT reproduce

- Full copy of main `4b2a724b` fetched fresh via the GitHub connector (all 14 `.qmd`, `_quarto.yml`, `references.bib`, `assets/book.css`, `assets/book.js`, `assets/mindmap.svg`, `tests/test_site.py`; one HTTP 429 mid-fetch — stopped, waited 5 min, retried the 5 remaining files with 30 s spacing, all succeeded). Rendered with the exact CI command `quarto render` (HTML + PDF via Typst).
- Exit 0, **no ERROR/WARNING lines in the log**, `_site/index.html` + PDF both produced. `references.html` (1,840 lines) contains `id="ref-nguyenTaiThu2009"` at line 1005: "Nguyễn, Tài Thư. 2009. … *Tạp chí Nghiên cứu Tôn giáo*, số p.h 11: 13–20." Ch. 7 in-text citations resolve (4 occurrences of the key in the chapter HTML). 249 `#ref-` anchors = 249 distinct cited keys; the only bib key never cited is `marx1844`, which Quarto correctly omits.
- `python3 -m unittest tests/test_site.py -v` on this render: 6/6 pass (after adding the new completeness test below).

### (6) Live-site re-verification — entry IS present at v1.11.2

- Direct download of `https://fossbk-spec.github.io/ai4l-book/references.html` on 22 Nov 01:11 UTC (96,070 bytes): `id="ref-nguyenTaiThu2009"` present at line 1005, rendered text **byte-identical** to the fresh local render. Anchor sets live vs local: 249 vs 249, zero differences in either direction; rendered entry text identical for all 249 entries.
- Live `chapters/07-kho-dau-vo-thuong.html` (same download): 7 occurrences of `nguyenTaiThu2009`, 3 in-text links `href="../references.html#ref-nguyenTaiThu2009"` — the links point at an anchor that exists.
- Main HEAD confirmed as `4b2a724b` (`list_commits`), so the fetched inputs are exactly the deployed commit.

### (7) Crawler-artifact evidence — why the "absent" observation is unreliable

- The 22 Nov 00:55 UTC browser-crawler snapshot of the live `references.html` (1,055 text lines) shows the N-section jumping from "Nguyễn, Hữu Sơn. 2019" to "Nietzsche, Friedrich. 1883–1885", and text search for "Tài Thư" / "Xu hướng nhập thế" returns nothing.
- The **same snapshot contains the v1.11.2-only entries** "Beauvoir, Simone de. 1944" (L58) and "Kierkegaard, Søren. 1847. *Works of Love*" (L501) — both added by PR #23, so the crawled page IS the v1.11.2 render — yet its text extraction still drops `nguyenTaiThu2009`, which the raw HTML of the same URL at 01:11 UTC provably contains (byte-identical to a fresh local render, with no push/deploy in between).
- Re-fetching the URL through the browser tool returns the **same cached snapshot** (same page id, still stamped 00:55 UTC). The 21 Nov crawl (1,051 lines) that first reported F01 used the same crawler path. Conclusion: the crawler's text extraction / cached snapshot drops this entry; it is not a reliable witness for this page. The ground truth is the raw HTML, which contains the entry.

### (8) v1.11.1 vs v1.11.2 — the entry and its citations are unchanged

- `references.bib` at `9ff72a49` (247 keys) vs main (250 keys): added in v1.11.2 are only `beauvoir1944`, `beauvoir1964`, `kierkegaard1847`; nothing removed. The `nguyenTaiThu2009` entry is **byte-identical** (repr-checked, no hidden characters).
- `chapters/07-*.qmd`: one line differs (L147, a "Kiểm tra nguồn gần nhất" wording note about DOI checking) — no citation change; the key is cited 3× in both versions.
- `_quarto.yml`: v1.11.1 lacks only the `language: callout-note-title "Ghi chú" / callout-tip-title "Mẹo"` block added in v1.11.2 — no citeproc-relevant difference. `references.qmd` identical.
- So PR #23 changed nothing that could have "fixed" the entry — and nothing needed fixing: the v1.11.1 inputs render it too (§3).

### (9) Test gap — closed in this PR

- Added `test_bibliography_complete` to `tests/test_site.py`: every key cited in the `.qmd` sources (`@key` regex over root + `chapters/*.qmd`) must have an `id="ref-<key>"` anchor in `_site/references.html`. One-directional by design (an uncited bib key such as `marx1844` is legitimately omitted).
- Verified locally on the fresh full render: 6/6 tests pass. Negative control: deleting the `ref-nguyenTaiThu2009` div from a copy of `references.html` makes the test fail with exactly `cited keys missing from references.html: ['nguyenTaiThu2009']`; the file was then restored (anchor count back to 1). This test would have settled F01 in CI either way.

## What remains (updated 22 Nov 2026)

No field or combination of fields distinguishes this entry, it renders in every local reproduction (minimal and full-book, v1.11.1 and v1.11.2 inputs), and it is present on the live v1.11.2 site by direct download. The remaining uncertainty is narrow and historical: the raw text of the v1.11.1 deploy log (run `43608194343`) and the v1.11.1 deployed artifact itself can no longer be re-read (log text is not retrievable through the available tools; the PR #21 preview artifact expired after its 7-day retention). Nothing in the repo can be fixed for a defect that does not reproduce — no fix is applied in this PR, and no metadata was invented.

## Exact checks still needed (for Ben / the parent)

1. **Human in-browser check (the one step that settles F01):** open the live `https://fossbk-spec.github.io/ai4l-book/references.html` in a real browser and Ctrl+F "Tài Thư". If it is there (as the direct download shows), F01 can be closed as a crawler-artifact false positive. Do not re-check it through the browser-crawler text view — that path demonstrably drops this entry.
2. **If the human check ever shows it missing:** re-run the new `test_bibliography_complete` CI check and compare the CI-built `_site` artifact against a local render before touching the `.bib` — the defect, if real, would then be in the deploy path, not the bibliography.

