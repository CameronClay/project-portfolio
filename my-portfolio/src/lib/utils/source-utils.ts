//.caller forbidden (does not work) in strict mode
export function getFuncName() {
    return getFuncName.caller.name;
}