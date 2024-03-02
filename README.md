# Node Structure CLI
Node Structure CLI is a powerful command-line tool designed to streamline the process of creating a robust project structure for your Node.js and Express applications.
## Authors
- [@vruizdev](https://www.github.com/vruizdev)
## Installation 📖
### Package Install
> Install the package with your favorite package manager:
- npm (global preference)
```bash
npm i -g node-structure-cli
```
- npm (local)
```bash
npm i node-structure-cli
```
- pnpm (global preference)
```bash
pnpm install -g node-structure-cli
```
## Usage ⚙️
- **Global**
> To create a project structure run:
```bash
node-structure-cli init
```
> To list the directories run the command:
```bash
node-structure-cli list
```
- **Local**
> 1. Add in the packege.json:
>    Any codename and the command to be executed locally.
```json
"scripts": {
    "<any name>": "node-structure-cli",
}
```
> 2. We execute with:
>    Do not forget to replace any name with the name of your choice.
```bash
npm run any-name <option>
```
### Commands
```bash
node-structure-cli --version
```
```bash
node-structure-cli --help
```
```bash
node-structure-cli list
node-structure-cli l
```
```bash
node-structure-cli init
node-structure-cli i
```
## Requirements
* Nodejs
### Dependencies
* inquirer
* picocolors
* commander
## Contributors
<a href="https://github.com/vruizdev/node-structure-cli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vruizdev/node-structure-cli" />
</a>