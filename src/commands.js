const { executeCommands, getFolderTree, getFolderAndFilesTree, printFolderTree } = require('./command.controller.js');
const { program } = require('commander');
const inquirer = require('inquirer');
const path = require('node:path');
const pc = require('picocolors');

program.version('1.0.0').description('A command line tools for managing commands');

// Command init
program
    .command('init')
    .alias('i')
    .description('Creating a project structure for Node.js and Express')
    .action(async () => {
        await inquirer.prompt([
            {
                type: 'input',
                message: 'main folder name: ',
                name: 'entry',
                default: 'src'
            }
        ])
        .then(async ({entry}) => {
            await executeCommands(entry);
        })
        .catch((error) => console.log(pc.red('[ERROR]: ', error)));
    });
    
    
    
// Comando 'lists'
program
    .command('lists')
    .alias('l')
    .description('List folders and files in selected folder')
    .action(async () => {
        const folderPath = process.cwd();
        const folders = await getFolderTree(folderPath);

        await inquirer.prompt([
            {
                type: 'list',
                name: 'folder',
                message: 'Select a folder:',
                choices: folders
            }
        ])
        .then(async ({folder}) => {
            const selectedFolderPath = path.join(folderPath, folder);
            const tree = await getFolderAndFilesTree(selectedFolderPath);
            await printFolderTree(tree);
        })
        .catch((error) => console.log(pc.red('[ERROR]: ', error)));
    });


// Add additional commands as needed


// Analizar los argumentos de la línea de comandos
program.parse(process.argv);
