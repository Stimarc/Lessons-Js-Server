export function setActiveMenuItem(menuSelector,routes) {
  const currentHash = getHash();
  const menuItems = document.querySelectorAll(`${menuSelector} li`);

  menuItems.forEach((menuItem) => {
    const link = menuItem.querySelector("a");
    const href = link.getAttribute("href").substring(1);

    if (currentHash === href) {
      menuItem.classList.add("active");
    } else {
      menuItem.classList.remove("active");
    }
  });
}


export function initMenu(menuSelector,routes) {
  const menu = document.querySelector(menuSelector);

  if (!menu) {
    return;
  }

  const menuItems = routes.map((route) => { 
    return `<li><a href="#${route.path}">${route.label}</a></li>`;
  });

  menu.innerHTML = menuItems.join("");
}


export function getHash() {
  const hash = window.location.hash.slice(1);
  return hash;
}
