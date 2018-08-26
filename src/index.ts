import { mineCommand } from "./mineCommand";

const args = process.argv.slice(2);

function outputCommands() {
    console.log('Commands:\n  mine -target n');
}

function execute(command: (() => Promise<void>)) {
    try {
        command()
            .then(() => {
                process.exit(0);
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if (args.length === 0) {
    outputCommands();
    process.exit(1);
}

const command = args[0];
const params = args.slice(1);

if (command === 'mine') {
    execute(async () => await mineCommand(params));
}
else {
    outputCommands();
    process.exit(1);
}