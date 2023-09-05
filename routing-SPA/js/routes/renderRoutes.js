import { getHash } from './../utils/utils.js';

export function renderRoutes(selector, routes) {
  let route = getHash();
  let resource;

  if (route === '') {
    route = '/';
  }

  resource = routes.find( r => r.path === route );

  if (!resource) {
    resource = routes.find( r => r.path === '**' );
  }

  render(resource.component);

  function render(component) {
    const layout = document.querySelector(selector);
    layout.innerHTML = component();
  }
}