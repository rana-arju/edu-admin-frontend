import { NavLink } from "react-router-dom";
import { ISidebarItem, IUserPaths } from "../types";

export const sidebarItemsGenerator = (items: IUserPaths[], role: string) => {
  const sidebarItems = items.reduce((acc: ISidebarItem[], item) => {
    if (item.path && item.element) {
      acc.push({
        key: item?.name || "",
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item?.name || "",
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }) as ISidebarItem[],
      });
    }

    return acc;
  }, []);
  return sidebarItems;
};
