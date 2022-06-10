import ts from "typescript";

import { IProject } from "../structures/IProject";
import { FunctionTransformer } from "./FunctionTransformer";

export namespace NodeTransformer {
    export function transform(project: IProject, node: ts.Node): ts.Node {
        if (ts.isCallExpression(node))
            return FunctionTransformer.transform(project, node);
        return node;
    }
}
