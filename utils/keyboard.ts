
import { KeyboardEvent } from "react";
// Nothing in this file is currently in use
export type KeyDownData = {
    keyCodes?: string[],
    cb?: (...arg: any[]) => any | void,
    params?: any[]
};

const defaultKeyCodes = ["Enter", " "];
export const watchButtonPress = (e: KeyboardEvent, { keyCodes = defaultKeyCodes, cb = () => { }, params = [] }: KeyDownData) => {

    if (keyCodes.includes(e.key)) {
        cb(...params)
    }
};