
import { KeyboardEvent } from "react";
// Nothing in this file is currently in use
export type KeyDownData = {
    keyCodes?: string[],
    cb?: (...arg: any[]) => any | void,
    params?: any[]
};

const defaultKeyCodes = ["Enter", " "];
export const watchButtonPress = ({ keyCodes = defaultKeyCodes, cb = () => { }, params = [] }: KeyDownData) => (e: KeyboardEvent) => {

    if (keyCodes.includes(e.key)) {
        cb(...params)
    }
};