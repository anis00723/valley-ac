export const isStartWithPath = (activeRouter: string, route: string) => {
  return activeRouter.toLowerCase().startsWith(route.toLowerCase());
};

export const isExactPath = (activeRouter: string, route: string) => {
  return activeRouter.toLowerCase() === route.toLowerCase();
};
