# Changelog

All notable changes to *Cuộc sống và con người* are documented here. The format follows the living-book rule: each version changes only the chapters it lists.

## [1.1.3] — Accuracy and reference links

- Timeline: removed the incorrect 1842 birth claim for Camus; the existing 1942 publication row remains.
- References: moved 15 SEP/IEP URLs and the Chalmers and Frankfurt links into URL fields so readers can follow them.
- Ch. 4: distinguished brain death from vegetative state/unresponsive wakefulness syndrome.
- Ch. 5: clarified shared accountability for supervised clinical AI while retaining the clinician's final care decision.
- Ch. 7: distinguished the experience of pain from nociception using the revised IASP definition.

## [1.1.2] — Structure

- Ch. 2: the Mencius–Xunzi section is labelled as debate 2.1 (the chapter had only 2.2) and now opens and closes like the other debates.
- Ch. 1, 3, 4, 7: the empirical-research box no longer repeats the title of the section it sits in.
- Timeline: headings now match their rows (17th century, 18th–19th, 20th, 21st); entries after 1700 and after 2000 had sat under the wrong heading.

## [1.1.1] — Citation details

- Ch. 6, timeline: Butlin et al. dated **2026**, as published in *Trends in Cognitive Sciences* 30(6): 488–501 (June 2026); it was listed as 2025.
- Ch. 7: Stilwell et al. (2022) cited with its full title, *What Is Pain-Related Suffering? Conceptual Critiques, Key Attributes, and Outstanding Questions*.
- Bibliography file: editorial instructions removed from `note` fields; bibliographic facts (editions, serialisation, sample sizes, URLs) kept.

## [1.1.0] — Literature-review corrections only

This release applies the systematic literature review completed on 9 November 2026 to v1.0. It corrects citations and dates and replaces the bibliography with a verified, deduplicated `references.bib`. **No new arguments were added.**

### The 12 must-fix corrections

1. **Terror management theory founding citation (Ch. 4) corrected.** The widely circulating *Journal of Personality and Social Psychology* citation for this theory is erroneous and is no longer used. Correct citation: Greenberg, Pyszczynski & Solomon (1986), "The causes and consequences of a need for self-esteem: A terror management theory", in Baumeister (ed.), *Public Self and Private Self*, Springer, pp. 189–212, DOI 10.1007/978-1-4613-9564-5_10.
2. **Many Labs 4 dating (Ch. 4) corrected to 2022.** Klein et al. (2022), *Collabra: Psychology* 8(1): 35271, DOI 10.1525/collabra.35271 — not 2020. Terror management theory is now presented as a hypothesis, not an established fact, given this failed replication of the mortality salience effect.
3. **Frankl title history (Ch. 1 and 7) corrected.** German original 1946, *Ein Psycholog erlebt das Konzentrationslager*; English 1959 was *From Death-Camp to Existentialism*; the title *Man's Search for Meaning* dates only from 1962.
4. **Aristotle dating (Ch. 1, 5, 6) corrected.** *Nicomachean Ethics* and *De Anima* have no publication year. The book now uses "c. 340–330 BCE" and "c. 350 BCE" respectively and cites by Bekker numbers.
5. **Laozi / Upanishads / Gita dating (Ch. 1, 7) corrected to composite ranges.** *Daodejing* c. 4th–3rd century BCE; principal Upanishads c. 800–300 BCE; *Bhagavad Gita* generally 2nd–1st century BCE, scholarly range 5th–2nd century BCE.
6. **Libet and Soon full citations added (Ch. 3).** Libet et al. (1983), *Brain* 106(3): 623–642, DOI 10.1093/brain/106.3.623; Soon et al. (2008), *Nature Neuroscience* 11(5): 543–545, DOI 10.1038/nn.2112.
7. **Henrich et al. WEIRD pages corrected (Ch. 2).** Target article pp. 61–83, not 61–135 (61–135 includes commentary). *Behavioral and Brain Sciences* 33(2–3), 61–83 (2010), DOI 10.1017/S0140525X0999152X.
8. **Bowlby and Hume titles corrected (Ch. 6).** Bowlby is *Attachment and Loss, Vol. 1: Attachment* (1969), not "Attachment, 1969" alone. Hume's work is *A Treatise of Human Nature*, not *Treatise of Human Understanding*.
9. **Beauchamp & Childress 1st edition (Ch. 5) corrected.** Printed 1978, copyright 1979 — cited as 1979 with that note; 8th edition 2019 verified (Oxford University Press, 512 pp., ISBN 9780190640873).
10. **Tedeschi & Calhoun pages corrected (Ch. 7).** Pp. 455–471, not 472. DOI 10.1002/jts.2490090305.
11. **Williams pages corrected (Ch. 4).** Pp. 82–100, not 82–101. In *Problems of the Self*, Cambridge University Press, 1973.
12. **Fischer dating corrected (Ch. 4).** Cited as 2019, paperback 2020 — not only as 2020. *Death, Immortality, and Meaning in Life*, Oxford University Press, ISBN 978-0-19-092114-9.

### Other corrections in v1.1.0

- Removed unverified DOIs: no DOI is attached to Chalmers (1995), Frankfurt (1969), Anscombe (1958), or Nagel (1970).
- Removed the non-existent SEP "Suffering" and IEP "Human Nature" entries; the book cites SEP "Buddha", "Pain", "Stoicism", and "Epictetus" instead.
- Cogitate Consortium et al. (2025) is cited by DOI only (10.1038/s41586-025-08888-1); volume and pages were not verified.
- Seth & Bayne (2022) is not included in the bibliography: its full citation was not verified.
- Koo et al. (2024) is included with an explicit note that it concerns general healthcare AI, not CDSS specifically.
- Qualified dates are now used throughout: Xunzi "c. 310 – after 238 BCE"; Locke *Two Treatises* "1689 [title page 1690]"; Marx's 1844 manuscripts "1844/1932"; Epictetus's *Enchiridion* "early 2nd century CE" (exact date unverified); Dostoevsky "1879–80 (book 1880)"; Mill "1861/1863".
- Bibliography replaced by a verified, deduplicated `references.bib` built from the literature-review master bibliography, with priority additions per chapter (Metz SEP "The Meaning of Life", King & Hicks 2021, Martela & Steger 2016, Roughley SEP "Human Nature", Dominik et al. 2024, Parnia et al. AWARE-II 2023, Jobin et al. 2019, Matthias 2004, Floridi & Cowls 2019, Butlin et al. 2025, Jayawickreme & Blackie 2014, Stilwell et al. 2022, Hilton et al. 2017).

### Format and presentation in v1.1.0

- The book is now built with Quarto from one Markdown source per chapter: a website with search and chapter navigation, plus a downloadable PDF.
- Notes about how each citation was checked were removed from the chapter text; the corrections themselves stay. The record of what was checked is kept by the editor.
- Restored from v1.0: clickable mindmap (also by keyboard), debates that open and close, A+/A− font size, and a reading progress bar.
- Every DOI in the bibliography was resolved against Crossref/doi.org before release.

## [1.0.0] — 8 November 2026

First version of the living book, built as an interactive web book.

- Interactive mindmap SVG with 7 branches, clickable to chapters, with cross-links.
- 2,500-year timeline of thought.
- 7 chapters, each with a map of positions, open/close debates (16 debates in total, including Libet, the trolley problem, the Chinese Room, Mencius–Xunzi, and AI responsibility in medicine), a box "What empirical research says", an East–West dialogue section, reflection questions, and further reading.
- End-of-book map of 6 cross-links, a lookup table of 14 thinkers, and a version log with per-chapter update guidance.
- In-book search, reading progress bar, and font-size control.

Note: v1.0 contained the citation and dating errors corrected in v1.1.0 above. Do not cite v1.0 references as verified.
