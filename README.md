# Overview

This repository contains an example of a Silverfin template (reconciliation) and a node.js script that will populate the dropdown in the template through the Silverfin API for all provided companies at once.

Liquid documentation: https://developer.silverfin.com/docs

Silverfin API documentation: https://api.getsilverfin.com/api_docs

# Template

The template is a simple reconciliation template with a dropdown that contains a list of locations that a user can select.

For the dropdown the attribute `option_values` is used to separate the description of the option from the value that is used in the reconciliation to allow flexibility in changing this description.

More info on dropdowns in liquid can be found here: https://developer.silverfin.com/docs/input#select

The value of the selected dropdown value is stored as a custom value in the [CompanyDrop](https://developer.silverfin.com/docs/company), so the selected office is period-independent and available across templates on company level.

The selected dropdown value is exported in a [result](https://developer.silverfin.com/docs/result) in order to query the value with insights.

In order to already test if the value is correctly added to the result, a liquid test is prepared in the YAML file to confirm that our template is working correctly (see `reconciliation_texts/demo_infofiche/tests/demo_infofiche_liquid_test.yml`).

More on liquid testing can be found here: https://developer.silverfin.com/docs/liquid-testing

# Running the script

## Prerequisites

1. Node.js (https://nodejs.org/en/download/)

   - The script is written in JavaScript and node.js is needed to run the script locally.

2. Valid Silverfin environment (in other words, you already have a firm in Silverfin and your user is added)

   This script assumes that the following things are already set-up in your Silverfin environment:

   - The list of companies for which you want to run the script are already added in Silverfin and the companies in Silverfin have the same file code as your local system.
   - In order for the result to be generated and be able to be queried through insights, the reconciliation template should be created in Silverfin and it should have been (auto)-added to all the created companies.

3. Silverfin API credentials

   The Silverfin API uses OAuth2, in order to use the API you need to have contacted Silverfin Support to create an API client in Silverfin and obtain the credentials (client ID / secret) to generate the access token.

## Setup

1. Add a local `.env` file with the following content:

```
# This is a valid access token generated through for the Silverfin API (can be generated through another app like Postman and pasted here)
SILVERFIN_TOKEN=<your token>

# This is the firm ID of the firm you want to push the data to
SILVERFIN_FIRM_ID=<your firm id>
```

2. Install the dependencies

The `axios` package is used to make the API calls to Silverfin.

The `dotenv` package is used to read the `.env` file.

Install the dependencies with the following command:

```
npm install
```

3. The script now expects an array of companies that contain at least the file code and the office name that matches the `option_value` in the dropdown.

An example of the array of companies can be found in `example_data/companies.json`.

## Run the script

The script can be run with the following command:

```
node index.js
```
