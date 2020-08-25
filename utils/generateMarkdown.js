function generateMarkdown(answers) {
    return `
# ${answers.title}

## Description:
${answers.description}

    `;


}
module.exports = generateMarkdown;