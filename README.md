# Github Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/github_pipeline)](https://pkg.fluentci.io/github_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/github)](https://jsr.io/@fluentci/github)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/github-pipeline)](https://codecov.io/gh/fluent-ci-templates/github-pipeline)


A ready-to-use CI/CD Pipeline for uploading assets to github releases.

## 🚀 Usage

Run the following command:

```bash
fluentci run github_pipeline
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger install github.com/fluent-ci-templates/github-pipeline@main
```

Call a function from the module:

```bash
dagger call release-upload --src . \
 --tag v0.1.0 \
 --file demo_x86_64-unknown-linux-gnu.tar.gz \
 --token GH_TOKEN
```

## 🛠️ Environment Variables

| Variable              | Description                   |
|-----------------------|-------------------------------|
| TAG                   | Tag to upload the file to     |
| FILE                  | File to upload                |
| GH_TOKEN              | Github Access Token           |


## ✨ Jobs

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

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```typescript
import { releaseUpload } from "jsr:@fluentci/github";

await releaseUpload(
  ".",
  Deno.env.get("TAG") || "latest",
  Deno.env.get("FILE")!,
  Deno.env.get("GH_TOKEN")!
);
```

## Examples

See [fluentci-io/github-release-demo](https://github.com/fluentci-io/github-release-demo) for an example.
