import { gql } from "../../deps.ts";

export const releaseUpload = gql`
  query ReleaseUpload($src: String!, $tag: String!, $file: String!) {
    releaseUpload(src: $src, tag: $tag, file: $file)
  }
`;
