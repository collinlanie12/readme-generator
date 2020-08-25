const inquirer = require("inquirer");
const fs = require("fs");
const emoji = require('node-emoji');
const terminalImage = require('terminal-image');
const repoName = require('git-repo-name');
const generateMarkdown = require('./utils/generateMarkdown');



//emoji list
const exclaim = emoji.get('exclamation');
const describe = emoji.get('spiral_note_pad');
const arrowDown = emoji.get('arrow_down');
const comp = emoji.get('computer');
const mail = emoji.get('mailbox');
const person = emoji.get('bust_in_silhouette');
const date = emoji.get('date');
const briefCase = emoji.get('briefcase');

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
            message: comp + " What is the usage of your project?",
            name: "usage",
            default: "To enjoy!",
        },
        {
            type: "list",
            message: briefCase + " What type of license will you be using?",
            choices: ["MIT", "GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "ISC"],
            name: "license",
            default: "MIT",
        },
        {
            type: "input",
            message: person + " What is your full name?",
            name: "fullName",
            default: "John Doe",
        },
        {
            type: "input",
            message: date + " What year is it?",
            name: "year",
            default: "2020",
        },
        {
            type: "input",
            message: person + " Write all contributors, or just your name.",
            name: "contributors",
            default: "John Doe",
        },
        {
            type: "input",
            message: comp + " What should be used to run test?",
            name: "test",
            default: "npm test",
        },
        {
            type: "input",
            message: person + " Enter github username?",
            name: "moreInfo",
            default: "JohnDoe12",
        },
        {
            type: "input",
            message: mail + " Enter your email",
            name: "email",
            default: "johndoe@gmail.com",
        }
    ])
    .then(answers => {
        fs.writeFile("README.md", generateMarkdown(answers), err => {
            if (err) {
                return console.log(err);
            }
            (async () => {
                console.log(await terminalImage.file('./img/readme-generated.jpg', { width: 50, height: 40 }));
                console.log("README Generated!");
            })();

        });
    })