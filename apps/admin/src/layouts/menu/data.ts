import { CAUnoCSSIcon } from "@celeris/components";
const renderIcon = (icon?: string) => {
  return () => h(CAUnoCSSIcon, { icon });
};

export const menus = [
  {
    key: "1",
    icon: renderIcon("i-mdi-menu"),
    title: "首页",
    path: "/dashboard",
  },
  {
    key: "2",
    icon: renderIcon("i-mdi-menu"),
    title: "多级菜单",
    path: "/menu",
    children: [
      {
        key: "21",
        icon: renderIcon("i-mdi-menu"),
        path: "/menu/menu1",
        title: "多级菜单1",
      },
      {
        key: "22",
        icon: renderIcon("i-mdi-menu"),
        path: "/menu/menu2",
        title: "多级菜单2",
      },
      {
        key: "23",
        icon: renderIcon("i-mdi-menu"),
        path: "/menu/menu3",
        title: "多级菜单3",
      },
    ],
  },
  {
    key: "3",
    icon: renderIcon("i-mdi-github"),
    title: "GitHub Repository",
    path: "/link",
    isLink: "https://github.com/kirklin/celeris-admin",
  },
];
