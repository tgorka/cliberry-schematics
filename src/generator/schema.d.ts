/**
 * @license
 * Tomasz Gorka <https://tomasz.gorka.org.pl>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tgorka/cliberry-schematics/LICENSE
 */
export interface Parameter {
  name: string;
  alias?: string;
  description?: string;
}

export interface Schema {
  /**
   * The name of the generator.
   */
  name: string;
  /**
   * Short description of the generator.
   */
  description: string;
  /**
   * Aliases that will be used for the generators splited by ','
   */
  alias?: string[] | string;
  /**
   * Parameters of the generator.
   */
  parameter?: string[] | string;
}
