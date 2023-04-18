import { createHttpClient } from "@celeris/request";
import { useGlobSetting } from "~/composables/setting/useGlobSetting";
const { API_URL, API_URL_PREFIX } = useGlobSetting();

// Create a new HTTP client using the createHttpClient function
export const request = createHttpClient({
  requestOptions: {
    // Set the apiUrl to the value of the API_URL variable
    apiUrl: API_URL,
    // Set the urlPrefix to the value of the API_URL_PREFIX variable
    urlPrefix: API_URL_PREFIX,
  },
});
