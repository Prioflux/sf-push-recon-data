const axios = require("axios");
require("dotenv").config();

const { SILVERFIN_TOKEN, SILVERFIN_FIRM_ID } = process.env;

const axiosInstance = axios.create({
  baseURL: "https://live.getsilverfin.com/api/v4",
  headers: {
    Authorization: "Bearer " + SILVERFIN_TOKEN,
  },
});

async function updateOfficeInAllCompanies() {
  const getCompanies = await axiosInstance.get(
    `/f/${SILVERFIN_FIRM_ID}/companies?page=1&page_size=1000`
  );

  const companies = getCompanies.data;

  companies.forEach(async (company) => {
    await axiosInstance.post(
      `/f/${SILVERFIN_FIRM_ID}/companies/${company.id}/custom`,
      {
        namespace: "info",
        key: "office",
        value: "kortrijk",
      }
    );

    console.log(`Updated company ${company.name} with office kortrijk`);
  });
}

updateOfficeInAllCompanies();
