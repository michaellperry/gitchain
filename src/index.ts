import { mineCommand } from "./mineCommand";

const args = process.argv.slice(2);

function outputCommands() {
    console.log('Commands:\n  mine -target n');
    return 1;
}

function execute(command: (() => void)) {
    try {
        command();
        return 0;
    }
    catch (error) {
        console.log(error);
        return 1;
    }
}

if (args.length === 0) {
    process.exit(outputCommands());
}

const command = args[0];
const params = args.slice(1);

if (command === 'mine') {
    process.exit(execute(() => mineCommand(params)));
}
else {
    process.exit(outputCommands());
}