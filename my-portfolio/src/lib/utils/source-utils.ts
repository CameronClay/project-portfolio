//.caller forbidden in strict mode (does not work :/)
export function getFuncName() {
    return getFuncName.caller.name
 }