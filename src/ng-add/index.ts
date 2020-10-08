import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addDepsToPackageJson } from '@nrwl/workspace';

const updateDependencies = addDepsToPackageJson(
  {
    '@ngrx/store': '^10.0.0',
    '@ngrx/effects': '^10.0.0'
  },
  {
    '@ngrx/schematics': '^10.0.0',
  }
);

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(_options: any): Rule {
  return chain([
    updateDependencies,
    addInstallTask()
  ])
}



function addInstallTask() {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}