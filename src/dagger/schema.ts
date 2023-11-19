import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { releaseUpload } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("releaseUpload", {
      args: {
        src: stringArg(),
        tag: nonNull(stringArg()),
        file: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await releaseUpload(args.src || undefined, args.tag, args.file),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "releaseUpload.src": "directory",
});

export { schema };
