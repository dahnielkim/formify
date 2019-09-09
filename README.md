# Vendor Confirm Form

## Core Product Description

1. User has list of Vendors to reach out:
   Vendor Name | emails | Report Name
2. User sends link to webpage to fill out form (responses compiles under Report Name)
3. Webpage has form that link recipients fill out; response, once submitted, is converted in a specific format and emailed to inbox
4. Script runs through inbox for specific Report Name filter and compiles it into CSV
5. User opens Csv in excel to obtain report

## Deployment

Live production is hosted on Heroku

Manual deployment is not required, however, as continuous deployment is already established on the #master branch. When code is merged into the master branch, the #master branch will automatically be deployed into production.

Deployment test checks are also integrated. Submit enhancements and bug fixes through PRs (pull requests) for the deployment test checks to run prior to production deployment.

## Development

For development, please perform the following steps.

1. Clone repo.
2. Run `yarn install` or `npm install` to install all node packages.
3. Add a `.env` file with the following code inside of it: `SKIP_PREFLIGHT_CHECK=true`
4. Run `yarn start` or `npm start`.

#### Temp Development

Test email address that will recieve the emails is `jctestinbox@gmail.com // vcftestpw`.
Emails will be sent from `mlaw8788@gmail.com`.
