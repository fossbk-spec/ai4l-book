# Cuộc sống và con người

A living book in Vietnamese about life and human nature — seven chapters, one interactive mindmap, and a 2,500-year timeline of thought.

**Author:** Hoang Quang Huy (Ben), Hanoi University of Science and Technology, iBME Lab
**Read the book:** <https://fossbk-spec.github.io/ai4l-book/>
**Source:** <https://github.com/fossbk-spec/ai4l-book>

## What this book is

*Cuộc sống và con người* ("Life and Human Nature") asks seven groups of philosophical questions and reviews, in detail, what thinkers and researchers have said about them:

1. **Ý nghĩa cuộc sống** — What makes a life meaningful?
2. **Bản chất con người** — What is human nature?
3. **Tự do** — Are we free, or determined?
4. **Cái chết và thời gian** — What does death do to meaning, and what is time?
5. **Đạo đức** — What makes an action right or wrong?
6. **Ý thức, tâm trí và tình yêu** — What is consciousness, and what is love?
7. **Khổ đau và sự vô thường** — Why do we suffer, and what does impermanence teach us?

Each chapter maps the main positions, presents the strongest arguments for and against each, reports what empirical research actually says (and where it is thin or contested), stages an East–West dialogue, and ends with open questions and further reading. Socrates' line runs through the whole book: *"A life unexamined is not worth living."*

## How to read it

- Start with the [mindmap](mindmap.qmd) for an overview, or with the [timeline](timeline.qmd) for 2,500 years of thought from about 800 BCE to 2025.
- Read the chapters in order, or jump to the question that matters to you right now. Each chapter stands on its own.
- Use the search box to find a thinker, a debate, or a study (for example "Libet", "trolley", or "Chinese Room").

## A living book

This book is updated chapter by chapter. A new study or a correction touches only the chapter concerned, its references, and the changelog. See [CHANGELOG.md](CHANGELOG.md) for what changed in each version, and [CONTRIBUTING.md](CONTRIBUTING.md) if you want to suggest a correction.

Version **1.1.0** applies the literature-review corrections to v1.0 (see CHANGELOG.md for the 12 fixes). Version 1.0 was built on 8 November 2026.

## How it is built

The book source is [Quarto](https://quarto.org/) (`.qmd` files, one per chapter), with a verified BibTeX bibliography in `references.bib`. One source produces the HTML site and a PDF. Every push to `main` is rendered and deployed to GitHub Pages by GitHub Actions (`.github/workflows/publish.yml`).

## Licence

The text of this book is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** licence — see [LICENSE](LICENSE). You are free to share and adapt it, for any purpose, as long as you give appropriate credit to Hoang Quang Huy (Ben), provide a link to the licence, and indicate if changes were made.

Suggested citation:

> Hoang Quang Huy (Ben). *Cuộc sống và con người*. Version 1.1.0. https://fossbk-spec.github.io/ai4l-book/. CC BY 4.0.

## Related repository

The private workflow and pipeline behind this book (research prompts, verification scripts, literature-review working notes) live in a separate private repository, **AI4L**. Nothing private is stored in this public repository.
