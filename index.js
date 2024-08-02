// Include packages needed for this application
let inquirer = require('inquirer');
let fs = require('fs');
let generateMarkdown = require('./utils/generateMarkdown');

const createTemplate = ({ title, description, installation, usage, addCollaborators, addThirdPartyAssets, license, contribute, }) {    
    const licenseMarkdown = renderLicenseBadge(license);
    const licenseLink = renderLicenseLink(license);

    const { license } = licenseMarkdown + licenseLink;


    return `
    # ${title}
    
    ## Description

    ${description}
    
    ## Installation

    ${installation}

    ## Usage

    ${usage}

    ![ADD_ALT_TEXT_FOR_SCREENSHOT](ADD_SCREENSHOT_LINK)

    ## Credits

    ${addCollaborators}

    ${addThirdPartyAssets}

    ## License

    ${license}

    ## How to Contribute

    ${contribute}
    `
}

// Array to store collaborators from inquirer.prompt
const collaborators = [];

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

        await promptCollaborator();
    }
}

// TODO: Create an array of questions for user input
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
        message: 'Provide instructions for use.'
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
        type: 'checkbox',
        name: 'license',
        message: 'Which license did you use?'
        choices: [
            'Apache 2.0',
            'BSD 3-Clause',
            'Eclipse Public License 1.0',
            'GNU GPL v3',
            'IBM Public License 1.0'
            'MIT',
            'Mozilla Public License 2.0',
            'Attribution License (BY)',
        ]
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
        if (answers.addCollaborators) {
            await promptCollaborator();
        }
        console.log('Collaborators added:', collaborators);
    })
    // TODO: Create a function to write README file
    .then((answers) => {
        const markdownTemplate = createTemplate(answers);
        fs.writeFile('README.md', markdownTemplate, (err) => {
            err ? console.error(err) : console.log('Generated README.md');
        })
    })
    .catch((error) => {
        console.error('An error has occurred:', error);
    });


// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
