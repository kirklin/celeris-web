import { loadDataFromModules } from "@celeris/utils";
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules: Recordable = import.meta.glob("./**/*.ts", {
  import: "default",
  eager: true,
});
const mockModules = loadDataFromModules(modules);

/**
 * Used in a production environment. Need to manually import all modules
 */
export const setupProdMockServer = () => createProdMockServer(mockModules);
