import process from "node:process";
import { getProviderConfig } from "./provider";

export function getServerConfig() {
  if (typeof process === "undefined") {
    throw new TypeError("[Server Config] you are importing a server-only module outside of server");
  }

  const provider = getProviderConfig();

  return { ...provider };
}
