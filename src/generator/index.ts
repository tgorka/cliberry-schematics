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
import {Schema as Options} from './schema';


const stringUtils = {dasherize, classify, camelize};

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generator(options: Options): Rule {
  /*return (tree: Tree) => {
    return chain([blank({name: options.name})]);
  };*/
  console.log('opt'+JSON.stringify(options))
  return mergeWith(apply(url('./files'), [
    template({
      utils: strings,
      ...stringUtils,
      ...options,
      'dot': '.',
      //latestVersions,
    }),
  ]));
}
