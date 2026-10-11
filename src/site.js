// Native navigation replaces the Framer/React runtime. Content works without JavaScript.
document.documentElement.classList.add('cm-js')
document.querySelectorAll('.cm-navigation').forEach((header, index) => {
  const toggle = header.querySelector('.cm-menu-toggle')
  const navigation = header.querySelector('nav')
  const desktopLinks = header.querySelector('.cm-desktop-links')
  if (!toggle || !navigation || !desktopLinks) return
  const menu = document.createElement('div')
  menu.className = 'cm-mobile-links'
  menu.id = `crewmind-mobile-navigation-${index}`
  menu.hidden = true
  menu.append(...[...desktopLinks.children].map(link => link.cloneNode(true)))
  const booking = header.querySelector('.cm-book')?.cloneNode(true)
  if (booking) {
    booking.removeAttribute('class')
    booking.style.cssText = 'padding:14px 0;color:#635e59'
    menu.append(booking)
  }
  navigation.append(menu)
  toggle.setAttribute('aria-controls', menu.id)
  function setOpen(open, returnFocus = false) {
    menu.hidden = !open
    toggle.setAttribute('aria-expanded', String(open))
    toggle.textContent = open ? 'Close' : 'Menu'
    if (open) menu.querySelector('a')?.focus()
    else if (returnFocus) toggle.focus()
  }
  toggle.addEventListener('click', () => setOpen(menu.hidden))
  menu.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false, true) })
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) setOpen(false, true) })
  const desktop = matchMedia('(min-width:1024px)')
  desktop.addEventListener('change', event => { if (event.matches) setOpen(false) })
})
