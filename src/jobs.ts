import { dag, env, exit, type Directory, type Secret } from "../deps.ts";
import { getDirectory, getGithubToken } from "./helpers.ts";

export enum Job {
  releaseUpload = "release_upload",
}

export const exclude = [];

/**
 * Upload asset files to a GitHub Release
 *
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
  const TAG = env.get("TAG") || tag || "latest";
  const FILE = env.get("FILE") || file!;
  const context = await getDirectory(src);
  const secret = await getGithubToken(token);

  if (!secret) {
    console.error("GH_TOKEN is required");
    exit(1);
    return "";
  }

  const ctr = dag
    .pipeline(Job.releaseUpload)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "ca-certificates"])
    .withExec(["pkgx", "install", "gh", "git"])
    .withMountedCache("/assets", dag.cacheVolume("gh-release-assets"))
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withSecretVariable("GH_TOKEN", secret)
    .withExec(["gh", "release", "upload", TAG, FILE]);

  return ctr.stdout();
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
