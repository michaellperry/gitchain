import simpleGit = require('simple-git/promise');

export async function mine(target: number) {
    console.log(`Mining for ${target} ${target === 1 ? 'bit' : 'bits'}.`);

    const repo = simpleGit();
    const status = await repo.status();
    const staged = status.staged;
    const result = await repo.commit('message');
    console.log(`Created commit ${result.commit}.`);
    await repo.reset(['HEAD~1']);
    repo.add(staged);
    console.log('Reset');
}