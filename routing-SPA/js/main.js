import { routes } from "./routes/routes.js";
import { browserRoute } from "./routes/browserRoute.js";
import { setActiveMenuItem, initMenu } from "./utils/utils.js";


const menuSelector = "#menu";
const layoutSelector = ".layout";

// Ініціалізація меню
initMenu(menuSelector,routes);

// Обробка роутів та меню
browserRoute(routes, layoutSelector);
addEventListener("hashchange", () => {
  setActiveMenuItem(menuSelector);
  browserRoute(routes, layoutSelector);
});
