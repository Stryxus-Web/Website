import { resolveRoute } from "vike/routing";
import { setRoute } from "../../data/states/Routing";
 
export default async (pageContext: { urlPathname: string; }) => {
  setRoute(pageContext.urlPathname);
  return resolveRoute("/media", pageContext.urlPathname);
}