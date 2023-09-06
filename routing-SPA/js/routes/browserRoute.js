import { getHash } from "../utils/utils.js";
import { renderRoutes , renderSinglePost} from "./renderRoutes.js";

export function browserRoute(routes, layoutSelector) {
  const currentHash = getHash();
  const id = currentHash.split("/").pop();

  if (currentHash.startsWith("/posts/") && !isNaN(id)) {
    renderSinglePost(layoutSelector, routes);
  } else {
    renderRoutes(layoutSelector, routes);
  }
}
