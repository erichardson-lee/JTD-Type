import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./node");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./node",

  shims: {
    deno: true,
  },

  package: {
    name: "Jtd-Type",
    version: Deno.args[0],
    description: "A Novel Implementation of Json Type Definition in Typescript",
    license: "None",
    repository: {
      type: "git",
      url: "git+https://github.com/erichardson-lee/JTD-Type.git",
    },
    bugs: {
      url: "https://github.com/erichardson-lee/JTD-Type/issues",
    },
  },
});

await Promise.all([
  Deno.copyFile("README.md", "node/README.md"),
  Deno.copyFile("LICENSE", "node/LICENSE"),
]);
