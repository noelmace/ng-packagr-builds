"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uglify_js_1 = require("uglify-js");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const log_1 = require("./../util/log");
function minifyJsFile(inputPath, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        log_1.debug(`minifyJsFile: ${inputPath}`);
        const sourcemapOut = `${outputPath}.map`;
        const [inputFileBuffer, inputSourceMapBuffer] = yield Promise.all([
            fs_extra_1.readFile(inputPath),
            fs_extra_1.readFile(`${inputPath}.map`)
        ]);
        const result = uglify_js_1.minify(inputFileBuffer.toString(), {
            sourceMap: {
                includeSources: true,
                content: JSON.parse(inputSourceMapBuffer.toString()),
                url: path_1.basename(sourcemapOut)
            },
            parse: {
                bare_returns: true
            },
            ie8: true,
            warnings: true,
            output: {
                comments: 'some'
            }
        });
        if (result.warnings) {
            for (const warningMessage of result.warnings) {
                log_1.warn(warningMessage);
            }
        }
        if (result.error) {
            throw result.error;
        }
        yield Promise.all([fs_extra_1.writeFile(outputPath, result.code), fs_extra_1.writeFile(sourcemapOut, result.map)]);
        return outputPath;
    });
}
exports.minifyJsFile = minifyJsFile;
//# sourceMappingURL=uglify.js.map