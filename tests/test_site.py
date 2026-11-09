"""Structural checks for the rendered Quarto site."""

from html.parser import HTMLParser
from pathlib import Path
import re
import unittest


SITE = Path(__file__).resolve().parents[1] / "_site"
CHAPTERS = SITE / "chapters"


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.svg_depth = 0
        self.svg_links = []
        self.links = []
        self.scripts = []
        self.in_h2 = False
        self.h2_parts = []
        self.headings = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "svg":
            self.svg_depth += 1
        elif self.svg_depth and attrs.get("data-href"):
            self.svg_links.append((attrs["data-href"], attrs.get("aria-label")))
            self.links.append(attrs["data-href"])
        elif tag == "a":
            href = attrs.get("href") or attrs.get("xlink:href")
            if href:
                self.links.append(href)
                if self.svg_depth:
                    # SVG <a> crashes Quarto's quarto-nav.js (href is an SVGAnimatedString).
                    raise AssertionError(f"SVG <a> not allowed: {href}")
        elif tag == "script":
            self.scripts.append(attrs.get("src", ""))
        elif tag == "h2":
            self.in_h2 = True
            self.h2_parts = []

    def handle_endtag(self, tag):
        if tag == "svg":
            self.svg_depth -= 1
        elif tag == "h2" and self.in_h2:
            self.headings.append("".join(self.h2_parts).strip())
            self.in_h2 = False

    def handle_data(self, data):
        if self.in_h2:
            self.h2_parts.append(data)


def parse(path):
    parser = SiteParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class RenderedSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not SITE.is_dir():
            raise AssertionError("Run quarto render before this test")

    def test_mindmap_links(self):
        page = parse(SITE / "mindmap.html")
        self.assertEqual(len(page.svg_links), 8)
        for href, label in page.svg_links:
            with self.subTest(href=href):
                self.assertRegex(href, r"^chapters/[^/]+\.html$")
                self.assertTrue(label)
                self.assertTrue((SITE / href).is_file())

    def test_no_qmd_links(self):
        for path in SITE.rglob("*.html"):
            with self.subTest(path=path):
                self.assertFalse(
                    [href for href in parse(path).links if href.split("#", 1)[0].split("?", 1)[0].endswith(".qmd")]
                )

    def test_reference_encyclopedia_links(self):
        page = parse(SITE / "references.html")
        encyclopedia_links = [
            href for href in page.links
            if "plato.stanford.edu" in href or "iep.utm.edu" in href
        ]
        self.assertGreaterEqual(len(encyclopedia_links), 15)

    def test_chapters_have_controls_and_debates(self):
        chapters = sorted(CHAPTERS.glob("*.html"))
        self.assertEqual(len(chapters), 8)
        for path in chapters:
            with self.subTest(path=path):
                page = parse(path)
                # Source headings have a hand-written section number before "Tranh luận".
                self.assertTrue(any(re.match(r"^(?:\d+\.\s*)?Tranh luận\b", heading) for heading in page.headings))
                self.assertIn("assets/book.js", path.read_text(encoding="utf-8"))

    def test_assets_are_published(self):
        # Quarto only copies files it sees referenced; book.js is loaded dynamically,
        # so it must be listed under project.resources.
        for name in ("book.js", "book.css"):
            with self.subTest(asset=name):
                self.assertTrue((SITE / "assets" / name).is_file())


if __name__ == "__main__":
    unittest.main()
