import { sendProxy } from "h3";

const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const target = new URL(
    event.node.req.url.replace(/^\/api\/proxy/, ""),
    config.proxyApiUrl,
  );
  return await sendProxy(event, target.toString());
});
