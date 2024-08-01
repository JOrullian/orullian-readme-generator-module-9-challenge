// Include packages needed for this application
let inquirer = require('inquirer');
let fs = require('fs');

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
    .catch((error) => {
        console.error('An error has occurred:', error);
    });

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
