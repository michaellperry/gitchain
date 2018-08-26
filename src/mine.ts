import simpleGit = require('simple-git/promise');

export async function mine(target: number) {
    console.log(`Mining for ${target} ${target === 1 ? 'bit' : 'bits'}.`);

    const repo = simpleGit();
    const result = await repo.commit('message');
    console.log(`Success: ${result}.`);
}