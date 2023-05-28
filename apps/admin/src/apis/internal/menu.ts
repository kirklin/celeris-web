import type { RouteItem } from "@celeris/admin-api/models/menu/RouteItem";
import type { MessageMode } from "@celeris/types";
import { request } from "@celeris/request";

// Define the API endpoint URLs as an enum
enum API {
  Menus = "/menu/list",
}

// Define a function to call the menus API
export function menusApi(
  errorMessageMode: MessageMode = "message",
) {
  // Make a GET request to the logout API endpoint
  return request.get<RouteItem[]>(
    {
      url: API.Menus,
    },
    // Set the error message mode for the request
    {
      errorMessageMode,
    },
  );
}

export { API };
