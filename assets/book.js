(() => {
  'use strict';

  // Mindmap nodes: SVG <a> elements break Quarto's nav script (it expects
  // string hrefs), so nodes are <g role="link" data-href> and navigate here.
  document.querySelectorAll('svg .mm-link[data-href]').forEach((node) => {
    const go = () => { location.href = new URL(node.dataset.href, location.href).href; };
    node.addEventListener('click', go);
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); go(); }
    });
  });

  const steps = [100, 112.5, 125, 137.5];
  const storageKey = 'ai4l-font-size';
  let step = 0;
  try {
    const saved = Number(localStorage.getItem(storageKey));
    if (steps.includes(saved)) step = steps.indexOf(saved);
  } catch (_) {
    // Reading remains available when storage is disabled.
  }

  const controls = document.createElement('div');
  controls.className = 'book-font-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Cỡ chữ');
  const smaller = document.createElement('button');
  smaller.type = 'button';
  smaller.textContent = 'A−';
  smaller.setAttribute('aria-label', 'Giảm cỡ chữ');
  const larger = document.createElement('button');
  larger.type = 'button';
  larger.textContent = 'A+';
  larger.setAttribute('aria-label', 'Tăng cỡ chữ');
  controls.append(smaller, larger);
  document.body.append(controls);

  function applyFontSize() {
    document.documentElement.style.fontSize = `${steps[step]}%`;
    smaller.disabled = step === 0;
    larger.disabled = step === steps.length - 1;
    try {
      localStorage.setItem(storageKey, String(steps[step]));
    } catch (_) {
      // The current page still uses the selected size.
    }
  }
  smaller.addEventListener('click', () => { step = Math.max(0, step - 1); applyFontSize(); });
  larger.addEventListener('click', () => { step = Math.min(steps.length - 1, step + 1); applyFontSize(); });
  applyFontSize();

  if (!/\/chapters\/[^/]+\.html$/.test(location.pathname)) return;

  const progress = document.createElement('div');
  progress.className = 'book-reading-progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', 'Tiến độ đọc');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', '100');
  document.body.append(progress);

  let scrollQueued = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const percent = max > 0 ? Math.round(Math.max(0, Math.min(1, scrollY / max)) * 100) : 100;
    progress.style.setProperty('--progress', `${percent}%`);
    progress.setAttribute('aria-valuenow', String(percent));
    scrollQueued = false;
  }
  function queueProgress() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateProgress);
  }
  addEventListener('scroll', queueProgress, { passive: true });
  addEventListener('resize', queueProgress);
  queueProgress();

  const debates = [];
  document.querySelectorAll('main section.level2').forEach((section) => {
    const heading = section.querySelector(':scope > h2');
    if (!heading || !/^(?:\d+\.\s*)?Tranh luận\b/u.test(heading.textContent.trim())) return;

    const content = document.createElement('div');
    content.className = 'book-debate-content';
    while (heading.nextSibling) content.append(heading.nextSibling);
    section.append(content);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'book-debate-toggle';
    button.textContent = heading.textContent.trim();
    heading.textContent = '';
    heading.append(button);
    content.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    if (section.id) button.setAttribute('aria-controls', `${section.id}-content`);
    if (section.id) content.id = `${section.id}-content`;

    function expand() {
      content.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    }
    button.addEventListener('click', () => {
      const opening = content.hidden;
      content.hidden = !opening;
      button.setAttribute('aria-expanded', String(opening));
      queueProgress();
    });
    debates.push({ section, content, expand });
  });

  function openTargetedDebate() {
    let target = null;
    try {
      target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch (_) {
      return;
    }
    if (!target) return;
    debates.forEach(({ section, expand }) => {
      if (section === target || section.contains(target)) expand();
    });
  }
  addEventListener('hashchange', openTargetedDebate);
  openTargetedDebate();

  // Quarto search may add highlights after the page has loaded.
  const searchHit = 'mark, .search-match, .search-result-match';
  function openSearchHits() {
    debates.forEach(({ content, expand }) => {
      if (content.querySelector(searchHit)) expand();
    });
  }
  openSearchHits();
  const observer = new MutationObserver(openSearchHits);
  debates.forEach(({ content }) => observer.observe(content, { childList: true, subtree: true }));
})();
