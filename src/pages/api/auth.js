export { auth as default } from "@openlab/vercel-netlify-cms-github";
import { createVercelBeginHandler } from "netlify-cms-oauth-provider-node";

module.exports = createVercelBeginHandler({}, { useEnv: true });
