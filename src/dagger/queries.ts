import { gql } from "../../deps.ts";

export const releaseUpload = gql`
  query ReleaseUpload(
    $src: String
    $tag: String!
    $file: String!
    $token: String!
  ) {
    releaseUpload(src: $src, tag: $tag, file: $file, token: $token)
  }
`;
