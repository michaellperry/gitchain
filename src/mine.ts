import simpleGit = require('simple-git');

export function mine(target: number) {
    console.log(`Mining for ${target} ${target === 1 ? 'bit' : 'bits'}.`);

    const repo = simpleGit(__dirname);
    repo.commit('message', (err: any, result: any) => {
        if (err) {
            console.log(`Error: ${err}.`);
        }
        else {
            console.log(`Success: ${result}.`);
        }
    });
}