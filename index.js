const axios = require("axios");
require("dotenv").config();

// =======================================
// START OF DATA TO BE ADDED BY THE USER
// =======================================

// The list of companies with their file code and applicable office name that can come from an external API endpoint, admin system, a spreadsheet, ...
// The applicable office name should match the `option_value` of the dropdown in the template.
const firmCompaniesList = require("./example_data/companies.json");

// The SILVERFIN_TOKEN is a valid access token for the Silverfin API that's created through another application like Postman before running the script
// The SILVERFIN_FIRM_ID is the id of the firm that can be found in the URL of the Silverfin web application (e.g. https://live.getsilverfin.com/f/13827/)
const { SILVERFIN_TOKEN, SILVERFIN_FIRM_ID } = process.env;

// =======================================
// END OF DATA TO BE ADDED BY THE USER
// =======================================

// Create an axios instance with the base URL and the authorization header that should be used for each Silverfin API request
const axiosInstance = axios.create({
  baseURL: "https://live.getsilverfin.com/api/v4",
  headers: {
    Authorization: `Bearer ${SILVERFIN_TOKEN}`,
  },
});

// Loop over the list of companies and update the office name for each company
firmCompaniesList.forEach(async (company) => {
  try {
    const getCompany = await axiosInstance.get(
      `/f/${SILVERFIN_FIRM_ID}/companies`,
      {
        params: {
          file_code: company.fileCode,
        },
      }
    );

    const sfCompany = getCompany.data[0];

    await axiosInstance.post(
      `/f/${SILVERFIN_FIRM_ID}/companies/${sfCompany.id}/custom`,
      {
        namespace: "office",
        key: "name",
        value: company.officeName,
      }
    );

    console.log(
      `Updated company ${sfCompany.name} with office ${company.officeName}`
    );
  } catch (error) {
    console.log(`Error updating company with file code ${company.fileCode}`);
    console.log(error);
  }
});
