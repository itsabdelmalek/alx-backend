// Import required modules using ES6 import syntax
import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Promisify the set and get methods
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection error
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school in Redis
async function setNewSchool(schoolName, value) {
  try {
    // Use the setAsync function with await
    const reply = await setAsync(schoolName, value);
    console.log(`Value set for ${schoolName}: ${reply}`);
  } catch (err) {
    console.error(`Error setting value for ${schoolName}: ${err.message}`);
  }
}

// Function to display the value for a given school in Redis using async/await
async function displaySchoolValue(schoolName) {
  try {
    // Use the getAsync function with await
    const reply = await getAsync(schoolName);
    console.log(`Value for ${schoolName}: ${reply}`);
  } catch (err) {
    console.error(`Error getting value for ${schoolName}: ${err.message}`);
  }
}

// Call the functions
async function main() {
  // Display the value for 'Holberton'
  await displaySchoolValue('Holberton');

  // Set a new school with value '100'
  await setNewSchool('HolbertonSanFrancisco', '100');

  // Display the value for the new school
  await displaySchoolValue('HolbertonSanFrancisco');
}

// Call the main function
main();
