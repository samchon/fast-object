import path from "path";
import ts from "typescript";
import { IProject } from "../structures/IProject";

export namespace FunctionTransformer {
    export function transform(
        project: IProject,
        node: ts.CallExpression,
    ): ts.CallExpression {
        //----
        // VALIDATIONS
        //----
        // ARGUMENTS
        if (node.arguments.length !== 1) return node;

        // SIGNATURE
        const signature: ts.Signature | undefined =
            project.checker.getResolvedSignature(node);
        if (!signature || !signature.declaration) return node;

        // FILE PATH
        const file: string = path.resolve(
            signature.declaration.getSourceFile().fileName,
        );
        if (file !== LIB_PATH && file !== SRC_PATH) return node;

        //----
        // TRANSFORMATION
        //----
        // CONVERT TO JSON STRING
        const param: ts.Expression = node.arguments[0]!;
        const json: string = to_json_string(param);

        // DO TRANSFORM
        return ts.factory.createCallExpression(
            ts.factory.createIdentifier("JSON.parse"),
            undefined,
            [ts.factory.createStringLiteral(json)],
        );
    }

    function to_json_string(param: ts.Expression): string {
        try {
            const text: string = param.getFullText();
            const obj: any = new Function(`return ${text};`)();

            return JSON.stringify(obj);
        } catch (exp) {
            throw new Error(
                "Error on TSON.create(): input parameter must be constant.",
            );
        }
    }
}

const LIB_PATH = path.resolve(path.join(__dirname, "..", "index.d.ts"));
const SRC_PATH = path.resolve(path.join(__dirname, "..", "index.ts"));
