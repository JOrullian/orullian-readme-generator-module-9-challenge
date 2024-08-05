// The app will wait for the user to input node ./index.js generate readme in the integrated terminal.  Make sure the terminal is opened to the location of this app.  After this user input, the user will be greeted with a series of prompts which will direct the creation of the README.md. 

// This README generator requires node.js as well as the inquirer npm package to be installed.

// Function to initialize app
function init() {
    // Include packages needed for this application
    const inquirer = require('inquirer');
    const fs = require('fs');
    // Import generateMarkdown.js
    const { renderLicenseBadge, renderLicenseLink, generateMarkdown } = require('./utils/generateMarkdown');

    // Array to store collaborators and thirdPartyAssets from inquirer.prompt
    let collaborators = [];
    let thirdPartyAssets = [];

    // Async function to run when user accepts to add collaborators during inquirer.prompt.  Will collect collaborator name and Github link.
    const promptCollaborator = async () => {
        const { collaboratorName } = await inquirer.prompt({
            type: 'input',
            name: 'collaboratorName',
            message: 'Enter the name of a collaborator (leave blank to finish adding collaborators):',
        });

        if (collaboratorName !== '') {
            const { collaboratorGithub } = await inquirer.prompt({
                type: 'input',
                name: 'collaboratorGithub',
                message: `Enter the Github link for ${collaboratorName}:`,
            });

            collaborators.push({ name: collaboratorName, github: collaboratorGithub });

            // Continue to recieve promptCollaborator responses from user as long as they fill in collaboratorName
            await promptCollaborator();
        }
    }

    // Async function to run when user accepts to add thirdPartyAssets during inquirer.prompt.  Will collect thirdPartyAsset name and link.
    const promptThirdPartyAssets = async () => {
        const { thirdPartyAssetName } = await inquirer.prompt({
            type: 'input',
            name: 'thirdPartyAssetName',
            message: 'Enter the name of a third-party asset (leave blank to finish adding assets):',
        });

        if (thirdPartyAssetName !== '') {
            const { thirdPartyAssetLink } = await inquirer.prompt({
                type: 'input',
                name: 'thirdPartyAssetLink',
                message: `Enter the link for ${thirdPartyAssetName}:`
            });

            thirdPartyAssets.push({ name: thirdPartyAssetName, link: thirdPartyAssetLink });

            // Continue to recieve promptThirdPartyAssets responses from user as long as they fill in thirdPartyAssetName
            await promptThirdPartyAssets();
        }
    }

    // Array of questions for user input for inquirer.prompt
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a short description explaining the what, why and how of your project.'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What (if any) are the steps required to install your project?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions for use:'
        },
        {
            type: 'confirm',
            name: 'addCollaborators',
            message: 'Would you like to add collaborators?'
        },   
        {
            type: 'confirm',
            name: 'addThirdPartyAssets',
            message: 'Are there any third-party assets that require attribution?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Which license did you use?',
            choices: [
                'Apache 2.0',
                'BSD 3-Clause',
                'Eclipse Public License 1.0',
                'GNU GPL v3',
                'IBM Public License 1.0',
                'MIT',
                'Mozilla Public License 2.0',
                'Attribution License (BY)',
            ]
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Write a description of any tests you have included for your project and how to implement them:'
        },
        {
            type: 'input',
            name: 'projectAuthorGithub',
            message: 'Link your Github profile:'
        },
        {
            type: 'input',
            name: 'projectAuthorEmail',
            message: 'Write your email:'
        },
        {
            type: 'input',
            name: 'contribute',
            message: 'How can others contribute to your project?'
        }
    ];

    inquirer
        // Pulls questions from questions array.
        .prompt(questions)
        // Questions to add collaborator names and Github links.  Will open if user confirms at the addCollaborators prompt.
        .then(async (answers) => {
            // Checks that addCollaborators prompt is true, if so, prompt to add collaboratorName and collaboratorGithub will show
            if (answers.addCollaborators) {
                await promptCollaborator();
            }

            // Checks that addThirdPartyAssets prompt is true, if so, prompt to add thirdPartyAssetName and thirdPartyAssetLink will show
            if (answers.addThirdPartyAssets) {
                await promptThirdPartyAssets();
            }

            const allAnswers = { ...answers, collaborators, thirdPartyAssets };

            console.log('Collaborators added:', collaborators);
            console.log('Third-party assets added:', thirdPartyAssets);

            return allAnswers;
        })
        // Function to write README file
        .then((allAnswers) => {
            const license = allAnswers.license;
            const markdownTemplate = createTemplate(allAnswers, generateMarkdown(license));
            fs.writeFile('sample-README.md', markdownTemplate, (err) => {
                err ? console.error(err) : console.log('Generated README.md');
            });
        })
        .catch((error) => {
            console.error('An error has occurred:', error);
        });

    // README Template
    const createTemplate = (answers, license) => {    

        let template = `# ${answers.title}\n\n`;
        template += `## Description\n${answers.description}\n\n`;

        template += `## License\n${license}\n\n`;

        template += '## Table of Contents\n';
        template += '- [Installation](#installation)\n';
        template += '- [Usage](#usage)\n';
        template += '- [Credits](#credits)\n';
        template += '- [License](#license)\n';
        template += '- [Tests](#tests)\n';
        template += '- [Questions](#questions)\n'
        template += '- [How to Contribute](#how-to-contribute)\n\n';

        template += `## Installation\n${answers.installation}\n\n`;
        template += `## Usage\n${answers.usage}\n\n`
        template += `![ADD_ALT_TEXT_FOR_SCREENSHOT](ADD_SCREENSHOT_LINK)\n\n`;
        template += `## Credits\n`;

        if (answers.collaborators.length > 0) {
            template += `### Collaborators\n`;
            answers.collaborators.forEach(collaborator => {
                template += `- [${collaborator.name}](${collaborator.github})\n`;
            });
        }
        template += `\n`;

        if (answers.thirdPartyAssets.length > 0) {
            template += `### Third-Party Assets\n`;
            answers.thirdPartyAssets.forEach(thirdPartyAsset => {
                template += `- [${thirdPartyAsset.name}](${thirdPartyAsset.link})\n`;
            });
        }
        template += `\n`;

        template += `## Tests\n${answers.tests}\n\n`;
        template += `## Questions\n[Github](${answers.projectAuthorGithub})\n`;
        template += `[Email](${answers.projectAuthorEmail})\n\n`
        template += `## How to Contribute\n${answers.contribute}`;

        return template;
    }
}


// Function call to initialize app
if (process.argv[2] === 'generate' && process.argv[3] === 'readme') {
    init();
}
