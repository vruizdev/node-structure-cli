const fs = require('node:fs').promises;
const path = require('node:path');
const pc = require('picocolors');

const FOLDERS = [
    'components',
    'configuration',
    'controllers',
    'database',
    'helpers',
    'middlewares',
    'models',
    'public>css',
    'public>js',
    'public>img',
    'routers',
    'services',
    'tests',
    'tests>unit',
    'validations',
    'views>partials'
];

const FILES = [
    'components>main.js',
    'configuration>config.js',
    'controllers>main.js',
    'database>connection.js',
    'helpers>generic.js',
    'middlewares>error.handler.js',
    'models>main.js',
    'public>css>styles.css',
    'public>js>main.js',
    'routers>routes.js',
    'services>service.app.js',
    'tests>main.test.js',
    'tests>unit>main.controller.test.js',
    'validations>main.js',
    'views>index.html',
    'views>partials>styles.html',
    'views>partials>scripts.html',
    '.editorconfig',
    '.env.example',
    '.env',
    '.gitignore',
    'app.js',
    'README.md',
];

const SEPARATOR = path.sep;


// Funciones para el comando init, que se encarga de crear una estructura de carpetas y archivos.
const createFolders = async (mainFolderName) => {
    const projectPath = path.join(process.cwd(), mainFolderName);

    try {
        await fs.access(projectPath, fs.constants.F_OK);
        console.info(`${pc.green('✔')} ${pc.bold('[INFO]:')} ${pc.blue(`The main ${pc.cyan(answers.name)} already exists.`)}`);
    } catch (error) {
        try {
            await fs.mkdir(projectPath);
            console.info(`🚀 ${pc.bold('[FOLDER CREATE]:')}  ${pc.blue(`Main ${pc.cyan(mainFolderName)} folder created.`)}`);
        } catch (err) {
            throw err;  // Re-throw para manejar el error externamente
        }
    }

    // Creamos la estructura de carpetas dentro del directorio principal
    for (const item of FOLDERS) {
        const folder = (item.includes('>')) ? item.replace('>', SEPARATOR) : item;
        const folderPath = path.join(projectPath, folder);
        await fs.mkdir(folderPath, { recursive: true });
    }
}

const createFiles = async (mainFolderName) => {
    const projectPath = path.join(process.cwd(), mainFolderName);

    try {
        for (const item of FILES) {
            const file = (item.includes('>')) ? item.replaceAll('>', SEPARATOR) : item;
            const filePath = path.join(projectPath, file);
            console.info(`${pc.green('✔')} ${pc.bold('[FILE CREATED]:')}`, pc.yellow(filePath));
            
            await fs.writeFile(filePath, '', 'utf8');
        }
    } catch (error) {
        throw error;  // Re-throw para manejar el error externamente
    }
}

const executeCommands = async (mainFolderName) => {
    try {
        await createFolders(mainFolderName);
        await createFiles(mainFolderName);
        process.exit(0);
    } catch (error) {
        console.error(`❌ ${pc.bold('[ERROR]:')} ${pc.red('Execution failed. :(')}`);
        console.error(`❌ ${pc.bold('[MESSAGE]:')} ${pc.red(error.message)}`);
        process.exit(1);
    }
}



// Funciones para el comando list, que se encarga de listar un directorio.
const getFolderTree = async (folderPath) => {
    const items = await fs.readdir(folderPath);

    const folders = await Promise.all(items.map(async (item) => {
        const fullPath = path.join(folderPath, item);
        const stats = await fs.stat(fullPath);
        return stats.isDirectory() ? item : null;
    }));

    const filteredFolders = folders.filter(folder => folder !== null);

    const tree = await Promise.all(filteredFolders.map(async (folder) => {
        const fullPath = path.join(folderPath, folder);
        const subFolders = await getFolderTree(fullPath);
        return {
            name: folder,
            children: subFolders
        };
    }));

    return tree;
};

const getFolderAndFilesTree = async (folderPath) => {
    const items = await fs.readdir(folderPath);

    const tree = await Promise.all(items.map(async (item) => {
        const fullPath = path.join(folderPath, item);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory()) {
            const subFolders = await getFolderAndFilesTree(fullPath);
            return {
                name: item,
                children: subFolders
            };
        } else {
            return {
                name: item
            };
        }
    }));

    return tree;
};

const printFolderTree = async (tree, depth = 0) => {
    await Promise.all(tree.map(async (node) => {
        const isDirectory = node.children !== undefined && node.children.length > 0;
        const nodeName = isDirectory ? pc.yellow(node.name) : pc.green(node.name);

        console.log(pc.blue('░░').repeat(depth * 2) + `${pc.blue('|--')} ${nodeName}`);

        if (isDirectory) {
            await printFolderTree(node.children, depth + 1);
        }
    }));
};

// Ejemplo de uso
// (async () => {
//     const folderPath = '/ruta/a/tu/carpeta';
//     const tree = await getFolderTree(folderPath);
//     await printFolderTree(tree);
// })();

module.exports = { executeCommands, getFolderTree, getFolderAndFilesTree, printFolderTree };