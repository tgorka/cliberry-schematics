/**
 * @license
 * Tomasz Gorka <https://tomasz.gorka.org.pl>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tgorka/cliberry-schematics/LICENSE
 */
import {strings} from '@angular-devkit/core';
import {
  Rule,
  //Tree,
  apply,
  mergeWith,
  template,
  url,
  //chain,
} from '@angular-devkit/schematics';
//import blank from '@schematics/schematics/blank/factory';
import {dasherize, classify, camelize} from '@angular-devkit/core/src/utils/strings';
import {Parameter, Schema as Options} from './schema';


const stringUtils = {dasherize, classify, camelize};

const forceArray = (obj?: any[] | any): any[] => {
  const o = obj || [];
  return (Array.isArray(o)) ? o : [o];
};

const parseParameters = (options: Options): Parameter[] => {
  let parameters: string[] = forceArray(options.parameter);
  return parameters.filter(parameters => !!parameters).map((parameter) : Parameter => {
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
   * ${parameter.description}
   */
  ${parameter.name}: string;
  `).join('\n');
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
  return JSON.stringify(schema);
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generator(options: Options): Rule {
  /*return (tree: Tree) => {
    return chain([blank({name: options.name})]);
  };*/
  const parameters: Parameter[] = parseParameters(options);
  return mergeWith(apply(url('./files'), [
    template({
      utils: strings,
      ...stringUtils,
      ...options,
      'dot': '.',
      'schemaDPart': schemaDPart(),
      'schemaPart': schemaPart(options, parameters),
      //latestVersions,
    }),
  ]));
}
