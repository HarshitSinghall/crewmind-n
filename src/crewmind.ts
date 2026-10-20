// Accessibility additions to the preserved presentation layer. No form data is transmitted.
const menuButton = document.querySelector<HTMLElement>('[data-menu-opener="menu"]');
const menu = document.querySelector<HTMLElement>('[data-menu-target="menu"]');
if (menuButton && menu) {
  const sync = () => {
    const open = menu.classList.contains('active');
    menuButton.setAttribute('aria-expanded', String(open));
    menu.inert = !open;
  };
  new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });
  sync();
  menuButton.addEventListener('keydown', event => {
    if (event.key === ' ') { event.preventDefault(); menuButton.click(); }
  });
  document.addEventListener('keydown', event => {
    if (!menu.classList.contains('active')) return;
    if (event.key === 'Escape') { menuButton.click(); menuButton.focus(); }
    if (event.key === 'Tab') {
      const controls = [menuButton, ...menu.querySelectorAll<HTMLElement>('a[href],button')];
      const index = controls.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1)?.focus(); }
      else if (!event.shiftKey && index === controls.length - 1) { event.preventDefault(); menuButton.focus(); }
    }
  });
}
document.querySelectorAll<HTMLElement>('.accordion__row-header').forEach(header => {
  header.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); header.click(); }
  });
  const sync = () => header.setAttribute('aria-expanded', String(header.classList.contains('active') || header.parentElement?.classList.contains('active')));
  if (header.parentElement) new MutationObserver(sync).observe(header.parentElement, { attributes: true, subtree: true, attributeFilter: ['class'] });
  sync();
});
document.querySelector('.cm-audit-form')?.addEventListener('submit', event => event.preventDefault());
const revealLinkedAnswer = () => {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
};
revealLinkedAnswer();
window.addEventListener('hashchange', revealLinkedAnswer);
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-img-grid-urls]').forEach(grid => grid.setAttribute('data-img-grid-urls', '[]'));
}
