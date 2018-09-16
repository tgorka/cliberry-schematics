/**
 * @license
 * Tomasz Gorka <https://tomasz.gorka.org.pl>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tgorka/cliberry-schematics/LICENSE
 */
import {parseJson, strings} from '@angular-devkit/core';
import {
  Rule,
  Tree,
  apply,
  mergeWith,
  template,
  url, chain,
  //chain,
} from '@angular-devkit/schematics';
//import blank from '@schematics/schematics/blank/factory';
import {dasherize, classify, camelize} from '@angular-devkit/core/src/utils/strings';
import {Parameter, Schema as Options} from './schema';


const stringUtils = {dasherize, classify, camelize};

const forceArray = (obj?: any[] | any): any[] => {
  const o = obj || [];
  return ((Array.isArray(o)) ? o : [o]).filter(obj => !!obj);
};

const parseParameters = (options: Options): Parameter[] => {
  let parameters: string[] = forceArray(options.parameter);
  return parameters.map((parameter) : Parameter => {
    const options: string[] = parameter.split(':');
    const finalParameter: Parameter = {
      name: options[0]
    };
    if (options.length > 0) {
      finalParameter.alias = options[1];
    }
    if (options.length > 1) {
      finalParameter.description = options[2];
    }
    return finalParameter;
  });
};

function schemaDPart(parameters: Parameter[]): string {
  return parameters.map(parameter => `
  /**
   * ${parameter.description || ''}
   */
  ${parameter.name}: string;
  `).join('');
}
function testDefaultsPart(parameters: Parameter[]): string {
  return parameters.map(parameter => `    ${parameter.name}: 'test',`).join('\n');
}

function schemaPart(options: Options, parameters: Parameter[]): string {
  const schema: any = {
    $schema: "http://json-schema.org/schema",
    id: `cliberry-schematics#${dasherize(options.name)}`,
    title: `cliberry-schematics ${dasherize(options.name)} Options Schema`,
    type: "object",
    properties: {}
  };
  for (let i in parameters) {
    const parameter = parameters[i];
    schema.properties[parameter.name] = {
      type: "string",
      $default: {
        $source: "argv",
        index: i
      }
    };
    if (parameter.alias) {
      schema.properties[parameter.name].alias = parameter.alias;
    }
    if (parameter.description) {
      schema.properties[parameter.name].description = parameter.description;
    }
  }
  schema.required = parameters.map(parameter => parameter.name);
  return JSON.stringify(schema, null, 2);
}

function addToPackage(tree: Tree): void {
  const packageDestination = `/package.json`;
  let packageFile = tree.get(packageDestination);
  let packageJson: any = {
    schematics: './src/collection.json'
  };
  if (!packageFile) {
    console.warn(`There is no ${packageDestination} file. Creating empty.`);
    tree.create(packageDestination, JSON.stringify(packageJson, null, 2));
  } else {
    packageJson = parseJson(packageFile.content.toString());
  }
  if (packageJson.schematics !== './src/collection.json') {
    packageJson.schematics = './src/collection.json';
    tree.overwrite(packageDestination, JSON.stringify(packageJson, null, 2));
  }
}

function addToCollection(options: Options): Rule {
  return (tree: Tree) => {
    //const workspace = getWorkspace(tree);
    const collectionDestination = `/src/collection.json`;
    let collectionFile = tree.get(collectionDestination);
    let collection: any = {
      $schema: "../node_modules/@angular-devkit/schematics/collection-schema.json",
      schematics: {}
    };
    if (!collectionFile) {
      console.warn(`There is no ${collectionDestination} file. Creating empty.`);
      tree.create(collectionDestination, JSON.stringify(collection, null, 2));
      addToPackage(tree);
    } else {
      collection = parseJson(collectionFile.content.toString());
    }
    collection.schematics[options.name] = {
      factory: `./${options.name}/index#${options.name}`,
      schema: `./${options.name}/schema.json`
    };
    if (options.description) {
      collection.schematics[options.name].description = options.description;
    }
    const aliases: string[] = forceArray(options.alias);
    if (aliases.length > 0) {
      collection.schematics[options.name].aliases = aliases;
    }
    tree.overwrite(collectionDestination, JSON.stringify(collection, null, 2));
    return tree;
  }
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generator(options: Options): Rule {
  /*return (tree: Tree) => {
    return chain([blank({name: options.name})]);
  };*/
  const parameters: Parameter[] = parseParameters(options);
  return chain([mergeWith(apply(url('./files'), [
    template({
      utils: strings,
      ...stringUtils,
      ...options,
      'dot': '.',
      'schemaDPart': schemaDPart(parameters),
      'schemaPart': schemaPart(options, parameters),
      'testDefaultsPart': testDefaultsPart(parameters),
      //latestVersions,
    }),
  ])),
  addToCollection(options)]);
}
