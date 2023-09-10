import { browserRoute } from './routes/browserRouter.js';
import { renderData } from './UI/renderData.js';
import { renderResources } from './UI/renderResources.js';

browserRoute();

document.querySelector('.data').addEventListener('click', (event) => {
  const resource = event.target.dataset.resource;
  if (resource) {
    window.location.hash = `/${resource}`;
  }
});

renderResources();
renderData();
