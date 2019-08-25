# Vendor Confirm Form

[![Netlify Status](https://api.netlify.com/api/v1/badges/617286bf-ed15-48b1-b983-d91adaa21cd5/deploy-status)](https://app.netlify.com/sites/vcf-form-app/deploys)

## Core Product Description

1. User has list of Vendors to reach out:
   Vendor Name | emails | Report Name
2. User sends link to webpage to fill out form (responses compiles under Report Name)
3. Webpage has form that link recipients fill out; response, once submitted, is converted in a specific format and emailed to inbox
4. Script runs through inbox for specific Report Name filter and compiles it into CSV
5. User opens Csv in excel to obtain report

## Deployment

Live production is hosted on the Netlify CDN.

Test deployments can be performed using the Netlify CLI and running the command `netlify deploy`. Manual production deployments can be performed utilizing the Netlify CLI by running the command `netlify deploy —prod`.

Manual deployment is not required, however, as continuous deployment is already established on the #master branch. When code is merged into the master branch, the #master branch will automatically be deployed into production.

Deployment test checks are also integrated. Submit enhancements and bug fixes through PRs (pull requests) for the deployment test checks to run prior to production deployment.

## Development

For development, please perform the following steps.

1. Clone repo.
2. Run `yarn install` or `npm install` to install all node packages.
3. Add a `.env` file with the following code inside of it: `SKIP_PREFLIGHT_CHECK=true`
4. Run `yarn start` or `npm start`.
