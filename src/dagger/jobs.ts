import Client from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";

export enum Job {
  releaseUpload = "release_upload",
}

export const exclude = [];

export const releaseUpload = async (src = ".", tag?: string, file?: string) => {
  await connect(async (client: Client) => {
    const TAG = Deno.env.get("TAG") || tag || "latest";
    const FILE = Deno.env.get("FILE") || file!;
    const context = client.host().directory(src);
    const ctr = client
      .pipeline(Job.releaseUpload)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "ca-certificates"])
      .withExec(["pkgx", "install", "gh", "git"])
      .withMountedCache("/assets", client.cacheVolume("gh-release-assets"))
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withEnvVariable("GH_TOKEN", Deno.env.get("GH_TOKEN") || "")
      .withExec(["gh", "release", "upload", TAG, FILE]);

    await ctr.stdout();
  });

  return "Done";
};

export type JobExec = (
  src?: string,
  tag?: string,
  file?: string
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.releaseUpload]: releaseUpload,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.releaseUpload]: "Upload asset files to a GitHub Release",
};
