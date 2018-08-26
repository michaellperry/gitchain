import simpleGit = require('simple-git/promise');

export async function mine(target: number) {
    console.log(`Mining for ${target} ${target === 1 ? 'bit' : 'bits'}.`);

    const repo = simpleGit();
    const status = await repo.status();
    const files = [].concat(status.created, status.staged, status.deleted);
    const result = await repo.commit('message');
    console.log(`Created commit ${result.commit} with ${files.length} files.`);
    await repo.reset(['HEAD~1']);
    await repo.add(files);
    console.log('Reset');
}