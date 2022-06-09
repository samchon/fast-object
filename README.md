# Fast-Object
Fast object creator, through `JSON.parse()`, but type safe.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/samchon/fast-object/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/fast-object.svg)](https://www.npmjs.com/package/fast-object)
[![Downloads](https://img.shields.io/npm/dm/fast-object.svg)](https://www.npmjs.com/package/fast-object)
[![Build Status](https://github.com/samchon/fast-object/workflows/build/badge.svg)](https://github.com/samchon/fast-object/actions?query=workflow%3Abuild)

![json](https://user-images.githubusercontent.com/13158709/172905432-8a316e9c-fbdb-4652-aefa-28113cbad98d.svg)

  - [Faster apps with JSON.parse (Chrome Dev Summit 2019)](https://www.youtube.com/watch?v=ff4fgQxPaO0)
  - [The cost of parsing JSON](https://v8.dev/blog/cost-of-javascript-2019#json)

You know what? `JSON.parse()` is then literal construction, when only one-time constructed.

`fast-object` is a transformer library which converts a literal object construction to a `JSON.parse()` function call with string argument. Therefore, if you construct a literal object with `fast-object`, you can get benefit from type safety and perforamce tuning at the same time.

Look at the below code, then you may understand how `fast-object` works.

#### TypeScript source file
```typescript
import create from "fast-object";

interface IUser {
    id: number;
    account: string;
    name: string;
}
const member: IUser = create({
    id: 1,
    account: "samchon",
    name: "Jeongho Nam",
});
```

#### Compiled JavaScript file
```js
const member = JSON.parse(`{"id": 1, "account": "samchon", "name": "Jeongho Nam"}`);
```




## Setup
### NPM Package
At first, install this `fast-object` by the `npm install` command. 

Also, you need additional `devDependencies` to compile the TypeScript code with transformation. Therefore, install those all libraries `typescript`, `ttypescript` and `ts-node`. Note that, `ttypescript` is not mis-writing. Therefore, do not forget to install the `ttypescript`.

```bash
npm install --save fast-object

# ENSURE THOSE PACKAGES ARE INSTALLED
npm install --save-dev typescript
npm install --save-dev ttypescript
npm install --save-dev ts-node
```

### tsconfig.json
After the installation, you've to configure the `tsconfig.json` file like below. Add the new property `transform` and its value `fast-object/lib/transform` into the `compilerOptions.plugins` array.

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "fast-object/lib/transform"
      }
    ]
  }
}
```

After the `tsconfig.json` definition, you can compile `fast-object` utilized code by using `ttypescript`. If you want to run your TypeScript file through `ts-node`, use `-C ttypescript` argument like below:

```bash
# COMPILE
npx ttsc

# WITH TS-NODE
npx ts-node -C ttypescript
```

### webpack
If you're using a `webpack` with `ts-loader`, configure the `webpack.config.js` file like below:

```javascript
const transform = require('fast-object/lib/transform').default;

module.exports = {
    // I am hiding the rest of the webpack config
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: program => ({
                        before: [transform(program)]
                    })
                }
            }
        ]
    }
};
```




## Features
### Function
```typescript
export default function create<T>(input: T): T;
```

`fast-object` provides only one default function `create()`.

Just import it and utilize the function to boost up your object construction speed.

```typescript
import create from "fast-object";

const member: IUser = create({
    id: 1,
    account: "samchon",
    name: "Jeongho Nam",
});
```

### Literal
Use only constant literal values.

`fast-object` is a transformer library which converts literal object construction to a `JSON.parse()` function call with string argument. Therefore, you have you only constant literal values in that object.

If you're using a variable value like below, `fast-object` will throw an exception.

```typescript
import create from "fast-object";

const account: string = "samchon";
const member: IUser = create({
    id: 1,
    account, // DON'T DO THAT
    name: "Jeongho Nam",
});
```

### No Import
No import statement, therefore no dependency.

When you compile TypeScript file using `fast-object`, the import statement would be automatically erased, by the transformer. Therefore, don't worry about any dependency relationship when distributing your program.

#### TypeScript source file
```typescript
import create from "fast-object";

interface IUser {
    id: number;
    account: string;
    name: string;
}
const member: IUser = create({
    id: 1,
    account: "samchon",
    name: "Jeongho Nam",
});
```

#### Compiled JavaScript file
```js
const member = JSON.parse(`{"id": 1, "account": "samchon", "name": "Jeongho Nam"}`);
```




## Appendix
My anothers libraries using TypeScript Compiler API.

### TypeScript-JSON
> `typescript-json` is not 10x faster yet, but would be soon in the v3 update.

https://github.com/samchon/typescript-json

Runtime type checker, and 10x faster `JSON.stringify()` function, with only one line.

```typescript
import TSON from "typescript-json";

TSON.assert<T>(input); // runtime type checker
TSON.stringify<T>(input); // 10x faster JSON.stringify()
```

`typescript-json` can check instance type in the runtime. Unlike other similar library `ajv` which requires complicate JSON schema definition, `typescript-json` requires only one line: `TSON.assert<T>(input)` or `TSON.is<T>(input)`.

Also, `typescript-json` is a library which can boost up JSON string conversion speed about 10x times faster. Unlike other similar libraries like `ajv` or `fast-json-stringify` which requires complicate JSON schema definition,`typescript-json` requires only one line, too: `TSON.stringify<T>(input)`. 

Furthermore, `typescript-json` does not require any optimizer plan construction in the runtime. Therefore, `typescript-json` is about 10,000x times faster than `ajv` and `fast-json-stringify`, if compare only one-time JSON string conversion or validation.

Only JSON string conversion time | Include optimizer planning time
---------------------------------|------------------------------------
![only-json-string-conversion](https://user-images.githubusercontent.com/13158709/172457566-d23100c2-808a-4544-a914-de92d8ec12b0.png) | ![include-optimizer-construction](https://user-images.githubusercontent.com/13158709/172457381-d8ccbb92-43a1-4c96-aae1-cdac7d2e03cd.png)

### Nestia
https://github.com/samchon/nestia

Automatic `SDK` and `Swagger` generator for the `NestJS`, evolved than ever.

`nestia` is an evolved `SDK` and `Swagger` generator, which analyzes your `NestJS` server code in the compilation level. With `nestia` and compilation level analyzer, you don't need to write any swagger or class-validator decorators.

Reading below table and example code, feel how the "compilation level" makes `nestia` stronger.

Components | `nestia`::SDK | `nestia`::swagger | `@nestjs/swagger`
-----------|---|---|---
Pure DTO interface | ✔ | ✔ | ❌
Description comments | ✔ | ✔ | ❌
Simple structure | ✔ | ✔ | ✔
Generic type | ✔ | ✔ | ❌
Union type | ✔ | ✔ | ▲
Intersection type | ✔ | ✔ | ▲
Conditional type | ✔ | ▲ | ❌
Auto completion | ✔ | ❌ | ❌
Type hints | ✔ | ❌ | ❌
2x faster `JSON.stringify()` | ✔ | ❌ | ❌
Ensure type safety | ✅ | ❌ | ❌

```typescript
// IMPORT SDK LIBRARY GENERATED BY NESTIA
import api from "@samchon/shopping-api";
import { IPage } from "@samchon/shopping-api/lib/structures/IPage";
import { ISale } from "@samchon/shopping-api/lib/structures/ISale";
import { ISaleArticleComment } from "@samchon/shopping-api/lib/structures/ISaleArticleComment";
import { ISaleQuestion } from "@samchon/shopping-api/lib/structures/ISaleQuestion";

export async function trace_sale_question_and_comment
    (connection: api.IConnection): Promise<void>
{
    // LIST UP SALE SUMMARIES
    const index: IPage<ISale.ISummary> = await api.functional.shoppings.sales.index
    (
        connection,
        "general",
        { limit: 100, page: 1 }
    );

    // PICK A SALE
    const sale: ISale = await api.functional.shoppings.sales.at
    (
        connection, 
        index.data[0].id
    );
    console.log("sale", sale);

    // WRITE A QUESTION
    const question: ISaleQuestion = await api.functional.shoppings.sales.questions.store
    (
        connection,
        "general",
        sale.id,
        {
            title: "How to use this product?",
            body: "The description is not fully enough. Can you introduce me more?",
            files: []
        }
    );
    console.log("question", question);

    // WRITE A COMMENT
    const comment: ISaleArticleComment = await api.functional.shoppings.sales.comments.store
    (
        connection,
        "general",
        sale.id,
        question.id,
        {
            body: "p.s) Can you send me a detailed catalogue?",
            anonymous: false
        }
    );
    console.log("comment", comment);
}
```

### Nestia-Helper
https://github.com/samchon/nestia-helper

Boost up `JSON.stringify()` function, of the API responses, 10x times faster.

`nestia-helper` is a helper library of `NestJS`, which can boost up the `JSON.stringify()` function 10x times faster about the API responses. Just by installing and utilizing this `nestia-helper`, your NestJS developed backend server will convert JSON string 10x times faster.

```typescript
import helper from "nestia-helper";
import * as nest from "@nestjs/common";

@nest.Controller("bbs/articles")
export class BbsArticlesController
{
    // JSON.stringify for IPage<IBbsArticle.ISummary> would be 2 times faster 
    @helper.TypedRoute.Get()
    public get(): Promise<IPage<IBbsArticle.ISummary>>;
}
```