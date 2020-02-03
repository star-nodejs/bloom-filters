/* file : exportable.ts
MIT License

Copyright (c) 2017-2020 Thomas Minier & Arnaud Grall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict'

interface ImportExportSpecs<T> {
  export: (instance: T) => Object,
  import: (json: Object) => T
}

/**
 * Turn a datastructure into an exportable one, so it can be serialized from/to JSON objects.
 * @param specs - An object that describes how the datastructure should be exported/imported
 * @author Thomas Minier
 */
export default function Exportable <T> (specs: ImportExportSpecs<T>) {
  return function (target: any) {
    target.prototype.saveAsJSON = function (): Object {
      return specs.export(this)
    }
    target.fromJSON = function (json: Object): T {
      return specs.import(json)
    }
    return target
  }
}