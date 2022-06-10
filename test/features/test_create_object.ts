import create from "../../src/index";

export function test_create_object(): void {
    create({
        id: 1,
        account: "samchon",
        name: "Jeongho Nam",
    });
}
