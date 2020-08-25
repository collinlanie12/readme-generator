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


inquirer
    .prompt([
        {
            type: "input",
            message: exclaim + " What is the Title?",
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