import * as jobs from "./jobs.ts";
import { env } from "../deps.ts";

const { releaseUpload, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[]);
    return;
  }

  await releaseUpload(
    src,
    env.get("TAG") || "latest",
    env.get("FILE") || "",
    env.get("GH_TOKEN") || ""
  );
}

async function runSpecificJobs(args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(
      ".",
      Deno.env.get("TAG") || "latest",
      Deno.env.get("FILE") || "",
      Deno.env.get("GH_TOKEN") || ""
    );
  }
}
