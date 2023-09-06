import { getHash } from './../utils/utils.js';

export function renderRoutes(selector, routes) {
  const currentHash = getHash();
  const resource = routes.find((r) => r.path === currentHash) || routes.find((r) => r.path === "**");

  if (resource) {
    const layout = document.querySelector(selector);
    layout.innerHTML = resource.component();
  }
}

export function renderSinglePost(selector, routes) {
  const currentHash = getHash();
  const id = currentHash.split("/").pop();
  const resource = routes.find((r) => r.path.startsWith("/posts") && r.path.endsWith("/:id"));

  if (resource && !isNaN(id)) {
    const component = resource.component(id);
    const layout = document.querySelector(selector);
    layout.innerHTML = component;
  }
}
