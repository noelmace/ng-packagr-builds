/**
 * Relocates pathes of the `sources` file array in `*.js.map` files.
 *
 * Simply said, because `sourcesContent` are inlined in the source maps, it's possible to pass an
 * arbitrary file name and path in the `sources` property. By setting the value to a common prefix,
 * i.e. `ng://@org/package/secondary`,
 * the source map p `.map` file's relative root file paths to the module's name.
 *
 * @param flobPattern A glob pattern matching `.js.map` files
 * @param mapFn A mapping function to relocate/modify source map paths
 */
export declare function relocateSourceMaps(globPattern: string | string[], mapFn: (path: string) => string): Promise<void>;
