import { HttpRequestEngine } from "@celeris/request";
import { useUserStoreWithOut } from "~/store/modules/user";
function initializeHttpRequest() {
  HttpRequestEngine.initRequest(() => ({
    getToken: () => {
      const userStore = useUserStoreWithOut();
      return userStore.getToken;
    },
  }));
}

export function initializeConfiguration() {
  initializeHttpRequest();
}
