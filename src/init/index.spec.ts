/**
 * @license
 * Tomasz Gorka <https://tomasz.gorka.org.pl>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tgorka/cliberry-schematics/LICENSE
 */
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Schema as Options} from './schema';


describe('init', () => {
  const schematicName = 'init';
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    require.resolve('../collection.json'),
  );
  const defaultOptions: Options = {
    name: 'foo',
    description: 'foo description',
    alias: 'f'
  };

  it('should create all files of a project', () => {
    const options = {...defaultOptions};

    const tree = schematicRunner.runSchematic(schematicName, options);
    const files = tree.files;
    expect(files.indexOf('/.editorconfig')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/.gitignore')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/package.json')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/README.md')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/tsconfig.json')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/tslint.json')).toBeGreaterThanOrEqual(0);
  });

  it('should set the name in package.json', () => {
    const tree = schematicRunner.runSchematic(schematicName, defaultOptions);
    const pkg = JSON.parse(tree.readContent('/package.json'));
    expect(pkg.name).toEqual('foo');
    expect(pkg.description).toEqual('foo description');
  });
});
