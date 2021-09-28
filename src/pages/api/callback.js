export { callback as default } from "@openlab/vercel-netlify-cms-github";
import { createVercelCompleteHandler } from "netlify-cms-oauth-provider-node";

module.exports = createVercelCompleteHandler({}, { useEnv: true });
