import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  template,
  url,
} from "@angular-devkit/schematics";
import { formatFiles, names } from "@nrwl/workspace";
import { Schema } from "./schema";

export default function (options: Schema): Rule {
  return chain([
    mergeWith(
      apply(url("./files"), [
        template({ ...options, tmpl: "", ...names(options.name) }),
        move(options.path),
        formatFiles({ skipFormat: false }),
      ]),
      MergeStrategy.Overwrite
    ),
  ]);
}
