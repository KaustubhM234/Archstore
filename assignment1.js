const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');

const URL = 'https://catfact.ninja/breeds';
const textFile = 'text.txt';

axios.get(URL)
  .then(response => {
    fs.writeFileSync(textFile, JSON.stringify(response.data));

    console.log('Number of pages:', response.data.last_page);

    const totalPages = response.data.last_page;
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
      requests.push(axios.get(`${URL}?page=${page}`));
    }

    axios.all(requests)
      .then(axios.spread((...responses) => {
        const breeds = responses.reduce((acc, res) => {
          return acc.concat(res.data.data);
        }, response.data.data);

        const groupByCountry = _.groupBy(breeds, 'country');
        console.log('Cat breeds grouped by country:', groupByCountry);
      }))
      .catch(error => {
        console.error('Error:', error);
      });
  })
  .catch(error => {
    console.error('Error:', error);
  });