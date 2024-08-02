// Function that returns a license badge based on which license is passed in. If there is no license, return an empty string.
function renderLicenseBadge(license) {
  let licenseAlt = '';

  console.log(`Recieved license: ${license}`);

  if (license[0] === 'Apache 2.0') {
    // Convert license input to the correct format for the badge
    licenseAlt = 'Apache_2.0';
  } else if (license[0] === 'BSD 3-Clause') {
    licenseAlt = 'BSD_3--Clause';
  } else if (license[0] === 'Eclipse Public License 1.0') {
    licenseAlt = 'EPL_1.0';
  } else if (license[0] === 'GNU GPL v3') {
    licenseAlt = 'GPLv3';
  } else if (license[0] === 'IBM Public License 1.0') {
    licenseAlt = 'IPL_1.0';
  } else if (license[0] === 'MIT') {
    licenseAlt = 'MIT';
  } else if (license[0] === 'Mozilla Public License 2.0') {
    licenseAlt = 'MPL_2.0';
  } else if (license[0] === 'Attribution License (BY)') {
    licenseAlt = 'ODC_BY';
  }

  console.log(`Assigned licenseAlt: ${licenseAlt}`);

  let licenseBadge = '';

  if (license) {
    licenseBadge = `![License: ${license}](https://img.shields.io/badge/License-${licenseAlt}-green.svg)`;
  }

  return licenseBadge;
}

// console.log(renderLicenseBadge('Apache 2.0'));

// Function that returns the license link. If there is no license, return an empty string.
function renderLicenseLink(license) {
  let licenseLink = '';
  // Convert license input to correct format for the link
  if (license[0] === 'Apache 2.0') {
    licenseLink = '(https://opensource.org/licenses/Apache-2.0)';
  } else if (license[0] === 'BSD 3-Clause') {
    licenseLink = '(https://opensource.org/licenses/BSD-3-Clause)';
  } else if (license[0] === 'Eclipse Public License 1.0') {
    licenseLink = '(https://opensource.org/licenses/EPL-1.0)';
  } else if (license[0] === 'GNU GPL v3') {
    licenseLink = '(https://www.gnu.org/licenses/gpl-3.0)';
  } else if (license[0] === 'IBM Public License 1.0') {
    licenseLink = '(https://opensource.org/licenses/IPL-1.0)';
  } else if (license[0] === 'MIT') {
    licenseLink = '(https://opensource.org/licenses/MIT)';
  } else if (license[0] === 'Mozilla Public License 2.0') {
    licenseLink = '(https://opensource.org/licenses/MPL-2.0)';
  } else if (license[0] === 'Attribution License (BY)') {
    licenseLink = '(https://opendatacommons.org/licenses/by/)';
  }

  return licenseLink;
}

// Function to generate markdown for README
function generateMarkdown(license) {
  const licenseBadge = renderLicenseBadge(license);
  const licenseLink = renderLicenseLink(license);

  console.log(licenseBadge + licenseLink)

  return `[${licenseBadge}]${licenseLink}`;
}

// Export file
module.exports = { renderLicenseBadge, renderLicenseLink, generateMarkdown };