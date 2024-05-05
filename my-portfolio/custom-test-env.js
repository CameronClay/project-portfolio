const Environment = require('jest-environment-jsdom').TestEnvironment;

//https://github.com/jestjs/jest/issues/2549

class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        // if (typeof this.global.TextEncoder === 'undefined') {
        //     const { TextEncoder } = require('util');
        //     this.global.TextEncoder = TextEncoder;
        // }
        // const { TextEncoder, TextDecoder } = require('util');
        // this.global.TextEncoder = TextEncoder;
        // this.global.TextDecoder = TextDecoder;
        // // this.global.Response = Response;
        // // this.global.Request = Request;

        // //for some reason this only works in custom test environment and not in jest-setup.ts
        // this.global.Uint8Array = Uint8Array;

        // this.global.Array = Array;
        // this.global.Buffer = Buffer;
        // this.global.Date = Date;
        // this.global.Error = Error;
        // this.global.Function = Function;
        // this.global.Map = Map;
        // this.global.Number = Number;
        // this.global.Object = Object;
        // this.global.RegExp = RegExp;
        // this.global.Set = Set;
        // this.global.String = String;
        // this.global.Symbol = Symbol;
        // this.global.Promise = Promise;
        // this.global.ArrayBuffer = ArrayBuffer;
        // this.global.Int8Array = Int8Array;
        // this.global.Uint8Array = Uint8Array;
        // this.global.Uint8ClampedArray = Uint8ClampedArray;
        // this.global.Int16Array = Int16Array;
        // this.global.Uint16Array = Uint16Array;
        // this.global.Int32Array = Int32Array;
        // this.global.Uint32Array = Uint32Array;
        // this.global.Float32Array = Float32Array;
        // this.global.Float64Array = Float64Array;
        // this.global.BigInt64Array = BigInt64Array;
        // this.global.BigUint64Array = BigUint64Array;
        // this.global.DataView = DataView;

        this.global.Uint8Array = Uint8Array;

        this.global.ReadableStream = ReadableStream;
        this.global.TextDecoder = TextDecoder;
        this.global.TextEncoder = TextEncoder;
        this.global.JSON = JSON;

        this.global.Blob = Blob;
        this.global.File = File;
        this.global.Headers = Headers;
        this.global.FormData = FormData;
        this.global.Request = Request;
        this.global.Response = Response;
        this.global.fetch = fetch;
        this.global.structuredClone = structuredClone;
    }
}

module.exports = CustomTestEnvironment;