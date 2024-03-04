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

// Create Hash using hset
client.hset(
  'HolbertonSchools',
  'Portland',
  50,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Seattle',
  80,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'New York',
  20,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Bogota',
  20,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Cali',
  40,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Paris',
  2,
  (err) => {
    if (err) {
      console.error(`Error setting value for Paris: ${err.message}`);
    } else {
      console.log('Value set for Paris');
    }

    // Display Hash using hgetall
    client.hgetall('HolbertonSchools', (err, reply) => {
      if (err) {
        console.error(`Error getting hash: ${err.message}`);
      } else {
        console.log('Hash values in Redis:');
        console.log(reply);
      }

      // Quit the client after operations
      client.quit();
    });
  }
);
