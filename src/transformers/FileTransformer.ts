import ts from "typescript";
import { IProject } from "../structures/IProject";

export namespace FileTransformer {
    export function transform(
        project: IProject,
        context: ts.TransformationContext,
        file: ts.SourceFile,
    ): ts.SourceFile {}
}
