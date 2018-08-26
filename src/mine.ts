import simpleGit = require('simple-git/promise');

export async function mine(target: number) {
    console.log(`Mining for ${target} ${target === 1 ? 'bit' : 'bits'}.`);

    const repo = simpleGit();
    const files = await getStagedFiles(repo);
    for (let attempt = 0; attempt < 10000; attempt++) {
        const message = generateRandomMessage();
        const sha = await commit(repo, message);
        if (matchesTarget(sha, target)) {
            console.log(`Succeeded after ${attempt} ${attempt === 1 ? 'attempt' : 'attempts'}.`);
            return;
        }
        else {
            await reset(repo, files);
        }
    }
    console.log('Failed to find a matching commit.');
}

async function reset(repo: simpleGit.SimpleGit, files: string[]) {
    console.log('Commit does not match target. Resetting.');
    await repo.reset(['HEAD~1']);
    await repo.add(files);
}

async function getStagedFiles(repo: simpleGit.SimpleGit) {
    const status = await repo.status();
    return <string[]>[].concat(status.created, status.staged, status.deleted);
}

function generateRandomMessage() {
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function commit(repo: simpleGit.SimpleGit, message: string) {
    const result = await repo.commit(message);
    console.log(`Created commit ${result.commit}.`);
    return parseInt(result.commit, 16);
}

function matchesTarget(sha: number, target: number) {
    const prefix = sha >> (28 - target);
    return prefix === 0;
}
