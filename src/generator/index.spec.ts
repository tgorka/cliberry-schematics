/**
 * @license
 * Tomasz Gorka <https://tomasz.gorka.org.pl>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tgorka/cliberry-schematics/LICENSE
 */
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Schema as Options} from './schema';


describe('generator', () => {
  const schematicName = 'generator';
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    require.resolve('../collection.json'),
  );
  const defaultOptions: Options = {
    name: 'foo',
    description: 'foo description',
    alias: 'f',
    parameter: ['name','description::this is description','alias:a'],
  };

  it('should create all files of a project', () => {
    const options = {...defaultOptions};

    const tree = schematicRunner.runSchematic(schematicName, options);
    const files = tree.files;
    expect(files.indexOf('/src/foo/schema.json')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/foo/schema.d.ts')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/foo/index.ts')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/foo/index.spec.ts')).toBeGreaterThanOrEqual(0);
    expect(files.indexOf('/src/foo/files/.gitkeep')).toBeGreaterThanOrEqual(0);
  });

  it('should set the parameters in collection.json', () => {
    const tree = schematicRunner.runSchematic(schematicName, defaultOptions);
    const collection = JSON.parse(tree.readContent('/src/collection.json'));
    expect(collection.schematics.foo).toBeDefined();
    expect(collection.schematics.foo.description).toEqual('foo description');
    expect(collection.schematics.foo.schema).toEqual('./foo/schema.json');
    expect(collection.schematics.foo.factory).toEqual('./foo/index#foo');
    expect(collection.schematics.foo.aliases).toEqual(['f']);
  });

  it('should set the parameters in schema.json', () => {
    const tree = schematicRunner.runSchematic(schematicName, defaultOptions);
    const schema = JSON.parse(tree.readContent('/src/foo/schema.json'));
    expect(schema.id).toEqual('cliberry-schematics#foo');//TODO: change from cliberry-schematics to the project name
    expect(schema.title).toEqual('cliberry-schematics foo Options Schema');
    expect(schema.type).toEqual('object');
    expect(schema.$schema).toEqual('http://json-schema.org/schema');
    expect(schema.properties).toBeDefined();
    expect(schema.properties.name).toBeDefined();
    expect(schema.properties.description).toBeDefined();
    expect(schema.properties.alias).toBeDefined();
    expect(schema.properties.name.type).toEqual('string');
    expect(schema.properties.description.type).toEqual('string');
    expect(schema.properties.alias.type).toEqual('string');
    expect(schema.properties.name.description).toEqual(undefined);
    expect(schema.properties.description.description).toEqual('this is description');
    expect(schema.properties.alias.description).toEqual(undefined);
    expect(schema.properties.name.alias).toEqual(undefined);
    expect(schema.properties.description.alias).toEqual(undefined);
    expect(schema.properties.alias.alias).toEqual('a');
    expect(schema.required).toEqual(['name', 'description', 'alias']);
  });
});
