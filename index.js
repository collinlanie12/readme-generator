const inquirer = require("inquirer");
const fs = require("fs");
const emoji = require('node-emoji');
const terminalImage = require('terminal-image');
const repoName = require('git-repo-name');
const generateMarkdown = require('./utils/generateMarkdown');

let readMeString;

//emoji list
const exclaim = emoji.get('exclamation');
const describe = emoji.get('spiral_note_pad');
const arrowDown = emoji.get('arrow_down');


inquirer
    .prompt([
        {
            type: "input",
            message: exclaim + " What is the title of your project?",
            name: "title",
            default: repoName.sync(),

        },
        {
            type: "input",
            message: describe + "  Give a description of your project.",
            name: "description",
            default: "This is the readme for my " + repoName.sync() + " project!",
        },
        {
            type: "input",
            message: arrowDown + "  What should you run to install all dependencies?",
            name: "install",
            default: "npm i",
        },
        {
            type: "input",
            message: "What is the usage of your project?",
            name: "usage",
            default: "To enjoy!",
        },
        {
            type: "list",
            message: "What type of license will you be using?",
            choices: ["MIT", "GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "ISC"],
            name: "license",
            default: "MIT",
        },
        {
            type: "input",
            message: "What is your full name?",
            name: "fullName",
            default: "John Doe",
        },
        {
            type: "input",
            message: "What year is it?",
            name: "year",
            default: "2020",
        },
        {
            type: "input",
            message: "Write all contributors, or just your name",
            name: "contributors",
            default: "John Doe",
        }
    ])
    .then(answers => {
        console.log(answers);
        fs.writeFile("README2.md", generateMarkdown(answers), err => {
            if (err) {
                return console.log(err);
            }
            (async () => {
                console.log(await terminalImage.file('./img/readme-generated.jpg', { width: 50, height: 40 }));
                console.log("README Generated");
            })();

        });
    })