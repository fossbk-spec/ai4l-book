# F01 investigation — Nguyễn Tài Thư (2009) missing from rendered `references.html`

**Date:** 22 Nov 2026 · **Base:** ai4l-book main `9ff72a49` (v1.11.1) · **Status: OPEN — no concrete in-repo cause found, no speculative fix applied.**

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
