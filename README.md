# orullian-readme-generator-module-9-challenge

## Description
This is a simple professional README generator, designed to prompt the user for information in the terminal after invoking the application and output a ready-to-submit README for their project/application. As a user who regularly has to write READMEs for various projects, this app saves the user time by prompting them for all pertinent information rather than the user having to regularly search what components go into a README.  

All user input will be done thru the terminal and no editor software has to be opened for a complete README to be generated.  Because there is no front-end to this application, some users may find it somewhat difficult to understand as casual computer-users tend not to use the terminal.  However, as this app has been designed to generate READMEs, it is expected that most users of this app will have a sufficient understanding of the terminal to use the application.

## Usage
Firstly, the user needs to ensure node.js is installed on their device; then they must install the required 'inquirer' npm package by navigating to the terminal and inputting "npm i" which will automatically install all dependencies.

The user targest the download location in their terminal.  An alternative to this is the user can open the source code in their editor of choice and invoke the integrated terminal.  The specific instructions for invoking this application are that, in the terminal, and on the app location, the following is typed: "node ./index.js generate readme".  This will initiate the application.  The user will then be asked a series of questions to gather information which will later be placed into a brand new README titled 'sample-README.md' in the primary folder.  After the user has completed all questions, the README will be generated and can be viewed and altered as desired.

[Tutorial Video](https://drive.google.com/file/d/1yIn-uFOB23vpkwTdu237vIcpa__IAOii/view?usp=drive_link)

## Credits
### Third-Party Assets
- inquirer
- node.js

Starter code has been provided by Southern Methodist University Coding Bootcamp and included a foundational index.js and generateMarkdown.js files.  
The repo for the original code can be found here: [Original Code Repo](https://git.bootcampcontent.com/Southern-Methodist-University/SMU-VIRT-FSF-PT-05-2024-U-LOLC/-/tree/main/09-NodeJS/02-Challenge/Develop?ref_type=heads)

This project is part of an ongoing coding bootcamp