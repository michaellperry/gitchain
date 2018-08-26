import { mine } from "./mine";

type MineParams = {
    target?: number
}

function getMineParams(params: string[]): MineParams {
    if (params.length < 2) {
        return {};
    }

    const option = params[0];
    const value = params[1];

    if (option == '-target') {
        const target = parseInt(value);
        if (isNaN(target)) {
            throw `Invalid target size ${value}. Specify a number.`;
        }
        return Object.assign({
            target
        }, getMineParams(params.slice(2)));
    }
    else {
        throw `Unknown option ${option}.`;
    }
}

export async function mineCommand(params: string[]) {
    const mineParams = getMineParams(params);
    if (!mineParams.target) {
        throw 'Specify target:\n  mine -target n';
    }

    await mine(mineParams.target);
}