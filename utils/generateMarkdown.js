// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === 'Apache 2.0') {
    license = 'Apache_2.0';
  } else if (license === 'BSD 3-Clause') {
    license = 'BSD_3--Clause';
  } else if (license === 'Eclipse Public License 1.0') {
    license = 'EPL_1.0';
  } else if (license === 'GNU GPL v3') {
    license = 'GPLv3';
  } else if (license === 'IBM Public License 1.0') {
    license = 'IPL_1.0';
  } else if (license === 'MIT') {
    license = 'MIT';
  } else if (license === 'Mozilla Public License 2.0') {
    license = 'MPL_2.0';
  } else if (license === 'Attribution License (BY)') {
    license = 'ODC_BY';
  }

  const licenseMarkdown = `![License: MIT](https://img.shields.io/badge/License-${license}-green.svg)`;

  if (license === '') {
    return '';
  }

  return licenseMarkdown;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license === 'Apache 2.0') {
    license = 'Apache-2.0';
  } else if (license === 'BSD 3-Clause') {
    license = 'BSD-3-Clause';
  } else if (license === 'Eclipse Public License 1.0') {
    license = 'EPL-1.0';
  } else if (license === 'GNU GPL v3') {
    const licenseLink = '(https://www.gnu.org/licenses/gpl-3.0)'
  } else if (license === 'IBM Public License 1.0') {
    license = 'IPL-1.0';
  } else if (license === 'MIT') {
    license = 'MIT';
  } else if (license === 'Mozilla Public License 2.0') {
    license = 'MPL-2.0';
  } else if (license === 'Attribution License (BY)') {
    const licenseLink = '(https://opendatacommons.org/licenses/by/)'
  }

  const licenseLink = `(https://opensource.org/licenses/${license})`

  if (license === '') {
    return '';
  }

  return licenseLink;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
