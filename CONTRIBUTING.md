# Contributing to *Cuộc sống và con người*

Thank you for reading the book carefully enough to want to improve it. This is a living book: corrections and new evidence are welcome, and they are applied chapter by chapter.

## How to suggest a change

1. **Open an issue** in this repository describing the problem: which chapter and section, what is wrong, and what source supports the fix. A page number, DOI, or link to the original source helps a lot.
2. For a small correction (a typo, a wrong date, a broken link), you may open a **pull request** directly against `main`, with one chapter per pull request.
3. For a substantive change (a new argument, a new study, a new section), please open an issue first so the change can be discussed before work starts.

## Rules for references

- **Do not invent citations, DOIs, years, volumes, or page numbers.** Every reference must be verifiable against its original source (publisher page, DOI/Crossref, PubMed, Stanford Encyclopedia of Philosophy, Internet Encyclopedia of Philosophy, or PhilPapers).
- If a DOI or an exact page range cannot be verified, do not supply one. Mark the item as unverified in the issue instead.
- Do not attach a DOI to Chalmers (1995), Frankfurt (1969), Anscombe (1958), or Nagel (1970) — none was verified.
- Do not cite a Stanford Encyclopedia of Philosophy entry titled "Suffering" or an Internet Encyclopedia of Philosophy entry titled "Human Nature" — neither exists / was found.
- When a chapter is updated, update only that chapter, its entries in `references.bib`, and `CHANGELOG.md`. Do not rewrite the whole book.

## Dating rules

- Aristotle's works have no publication year: cite by Bekker numbers and use ranges such as "c. 340–330 BCE" for the *Nicomachean Ethics* and "c. 350 BCE" for *De Anima*.
- Use composite ranges, not single years, for the *Daodejing* (c. 4th–3rd century BCE), the principal Upanishads (c. 800–300 BCE), and the *Bhagavad Gita* (generally 2nd–1st century BCE; scholarly range 5th–2nd century BCE).
- Frankl's book: German original 1946; English 1959 was titled *From Death-Camp to Existentialism*; the title *Man's Search for Meaning* dates only from 1962.
- Present terror management theory as a hypothesis, not an established fact, given the failed replication in Many Labs 4 (Klein et al. 2022).

## Style

- Book content is in **Vietnamese**, with Vietnamese diacritics correct. Repository documentation, commit messages, and pull-request descriptions are in **English**.
- Keep the tone accessible to a thoughtful general reader, not only to specialists. Define technical terms when they first appear.
- Each chapter keeps the same structure: positions, debates, what empirical research says, East–West dialogue, open questions, further reading.

## Building locally

1. Install [Quarto](https://quarto.org/docs/get-started/).
2. Run `quarto render` in the repository root. The HTML site is built in `_site/`; the PDF is built alongside it.
3. Check that every `@cite` key you used exists in `references.bib` before opening a pull request.

## Licence

By contributing, you agree that your contribution to the book text will be licensed under CC BY 4.0, the licence of this repository.
