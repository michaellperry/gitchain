import simpleGit = require('simple-git/promise');

export async function mine(target: number) {
    console.log(`Mining for ${target} ${target === 1 ? 'bit' : 'bits'}.`);

    const repo = simpleGit();
    const status = await repo.status();
    const files = [].concat(status.created, status.staged, status.deleted);
    for (let attempt = 0; attempt < 3; attempt++) {
        const result = await repo.commit('message');
        console.log(`Created commit ${result.commit} with ${files.length} files.`);
        const sha = parseInt(result.commit, 16);
        const prefix = sha >> (28-target);
        if (prefix > 0) {
            console.log('Commit does not match target. Resetting.');
            await repo.reset(['HEAD~1']);
            await repo.add(files);
        }
        else {
            break;
        }
    }
}