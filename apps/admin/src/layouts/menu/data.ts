export const menus = [
  {
    id: "1",
    icon: "home-filled",
    title: "首页",
    path: "/dashboard",
  },
  {
    id: "2",
    icon: "menu",
    title: "多级菜单",
    path: "/menu",
    children: [
      {
        id: "21",
        path: "/menu/menu1",
        title: "多级菜单1",
        icon: "menu",
      },
      {
        id: "22",
        path: "/menu/menu2",
        title: "多级菜单2",
        icon: "menu",
      },
      {
        id: "23",
        path: "/menu/menu3",
        title: "多级菜单3",
        icon: "menu",
      },
    ],
  },
  {
    id: "3",
    icon: "github",
    title: "GitHub Repository",
    path: "/link",
    isLink: "https://github.com/kirklin/celeris-admin",
  },
];
