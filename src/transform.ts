import ts from "typescript";

import { IProject } from "./structures/IProject";
import { FileTransformer } from "./transformers/FileTransformer";

export default function transform(
    program: ts.Program,
): ts.TransformerFactory<ts.SourceFile> {
    const project: IProject = {
        program,
        compilerOptions: program.getCompilerOptions(),
        checker: program.getTypeChecker(),
        printer: ts.createPrinter(),
        options: {},
    };
    return (context) => (file) =>
        FileTransformer.transform(project, context, file);
}
