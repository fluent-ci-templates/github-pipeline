import Client, { Directory, Secret } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, getGithubToken } from "./lib.ts";

export enum Job {
  releaseUpload = "release_upload",
}

export const exclude = [];

/**
 * @function
 * @description Upload asset files to a GitHub Release
 * @param {string | Directory} src
 * @param {string} tag
 * @param {string} file
 * @param {string | Secret} token
 * @returns {string}
 */
export async function releaseUpload(
  src: string | Directory,
  tag: string,
  file: string,
  token: string | Secret
): Promise<string> {
  await connect(async (client: Client) => {
    const TAG = Deno.env.get("TAG") || tag || "latest";
    const FILE = Deno.env.get("FILE") || file!;
    const context = getDirectory(client, src);
    const secret = getGithubToken(client, token);

    if (!secret) {
      console.error("GH_TOKEN is required");
      Deno.exit(1);
    }

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
      .withSecretVariable("GH_TOKEN", secret)
      .withExec(["gh", "release", "upload", TAG, FILE]);

    await ctr.stdout();
  });

  return "Done";
}

export type JobExec = (
  src: string | Directory,
  tag: string,
  file: string,
  token: string | Secret
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.releaseUpload]: releaseUpload,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.releaseUpload]: "Upload asset files to a GitHub Release",
};
