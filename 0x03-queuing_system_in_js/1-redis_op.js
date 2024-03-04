// Import required modules using ES6 import syntax
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection error
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  // Use the set command with a callback function
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error(`Error setting value for ${schoolName}: ${err.message}`);
    } else {
      console.log(`Value set for ${schoolName}: ${reply}`);
    }
  });
}

// Function to display the value for a given school in Redis
function displaySchoolValue(schoolName) {
  // Use the get command with a callback function
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(`Error getting value for ${schoolName}: ${err.message}`);
    } else {
      console.log(`Value for ${schoolName}: ${reply}`);
    }
  });
}

// Call the functions
displaySchoolValue('Holberton');

// Set a new school with value '100'
setNewSchool('HolbertonSanFrancisco', '100');

// Display the value for the new school
displaySchoolValue('HolbertonSanFrancisco');
