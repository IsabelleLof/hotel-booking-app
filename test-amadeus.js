const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'PpVrpSLbvlzpJcOqNiZdQOI3myURN9Hm',
  clientSecret: 'cboAICGLQIuGrCAr'
});

async function testConnection() {
  try {
    console.log('Testing Amadeus connection...');
    const response = await amadeus.referenceData.locations.get({
      keyword: 'LON',
      subType: 'CITY'
    });
    console.log('Success! Found:', response.data[0].name);
  } catch (error) {
    console.error('Connection failed:', error.response ? error.response.result : error);
    process.exit(1);
  }
}

testConnection();
