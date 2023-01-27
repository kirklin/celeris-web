export const menus = [
  {
    key: "1",
    // icon: "home-filled",
    title: "首页",
    path: "/dashboard",
  },
  {
    key: "2",
    // icon: "menu",
    title: "多级菜单",
    path: "/menu",
    children: [
      {
        key: "21",
        path: "/menu/menu1",
        title: "多级菜单1",
        // icon: "menu",
      },
      {
        key: "22",
        path: "/menu/menu2",
        title: "多级菜单2",
        // icon: "menu",
      },
      {
        key: "23",
        path: "/menu/menu3",
        title: "多级菜单3",
        // icon: "menu",
      },
    ],
  },
  {
    key: "3",
    // icon: "github",
    title: "GitHub Repository",
    path: "/link",
    isLink: "https://github.com/kirklin/celeris-admin",
  },
];
