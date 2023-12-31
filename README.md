# Github Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fgithub_pipeline&query=%24.version)](https://pkg.fluentci.io/github_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/github-pipeline)](https://codecov.io/gh/fluent-ci-templates/github-pipeline)

A ready-to-use CI/CD Pipeline for uploading assets to github releases.

## 🚀 Usage

Run the following command:

```bash
fluentci run github_pipeline
```

## Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger mod install github.com/fluent-ci-templates/github-pipeline@mod
```

## Environment Variables

| Variable              | Description                   |
|-----------------------|-------------------------------|
| TAG                   | Tag to upload the file to     |
| FILE                  | File to upload                |
| GH_TOKEN              | Github Access Token           |


## Jobs

| Job            | Description                                                |
|----------------|------------------------------------------------------------|
| release_upload | Uploads a file to a github release                         |

```typescript
releaseUpload(
  src: string | Directory,
  tag: string,
  file: string,
  token: string | Secret
): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically:

```typescript
import { releaseUpload } from "https://pkg.fluentci.io/github_pipeline@v0.4.0/mod.ts";

await releaseUpload(
  ".",
  Deno.env.get("TAG") || "latest",
  Deno.env.get("FILE")!,
  Deno.env.get("GH_TOKEN")!
);
```

## Examples

See [fluentci-io/github-release-demo](https://github.com/fluentci-io/github-release-demo) for an example.