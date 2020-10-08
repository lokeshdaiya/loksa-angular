import {
  Rule,
  chain,
  mergeWith,
  apply,
  url,
  template,
  MergeStrategy,
  move,
  filter,
  noop,
} from "@angular-devkit/schematics";
import { names } from "@nrwl/workspace";
import { Schema } from "./schema";

export default function (options: Schema): Rule {
  const excludeFacade = (path: any) => path.match(/^((?!facade).)*$/);
  return chain([
    mergeWith(
      apply(url("./files"), [
        !options.facade ? filter(excludeFacade) : noop(),
        template({ ...options, tmpl: "", ...names(options.name) }),
        move(options.path),
      ]),
      MergeStrategy.Overwrite
    ),
  ]);
}
