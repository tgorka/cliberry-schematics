import { strings } from "@angular-devkit/core";
import {
    Rule,
    apply,
    mergeWith,
    template,
    url,
} from "@angular-devkit/schematics";
import { dasherize, classify } from '@angular-devkit/core/src/utils/strings';
import { Schema as Options } from "./schema";


const stringUtils = { dasherize, classify };

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function init(options: Options): Rule {
    return mergeWith(apply(url("./files"), [
        template({
            utils: strings,
            ...stringUtils,
            ...options,
            "dot": ".",
            //latestVersions,
        }),
    ]));
}
