/**
 * @license
 * Tomasz Gorka <https://tomasz.gorka.org.pl>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tgorka/cliberry-schematics/LICENSE
 */
export interface Schema {
  /**
   * The name of the project.
   */
  name: string;
  /**
   * Short description of the project.
   */
  description: string;
  /**
   * Alias that will be used for cliberry
   */
  alias: string;
}
