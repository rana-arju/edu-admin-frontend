import { IRoute, IUserPaths } from "../types";



export const routesGenerator = (items: IUserPaths[]) => {
  const routes = items.reduce((acc: IRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path as string,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
  return routes;
};
