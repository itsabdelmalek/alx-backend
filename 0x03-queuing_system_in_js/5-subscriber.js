// Import required modules using ES6 import syntax
import redis from 'redis';

// Create a Redis client
const subscriberClient = redis.createClient();

// Event handler for successful connection
subscriberClient.on('connect', () => {
  console.log('Redis client connected to the server');

  // Subscribe to the channel 'holberton school channel'
  subscriberClient.subscribe('holberton school channel');
});

// Event handler for connection error
subscriberClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Event handler for receiving messages on the subscribed channel
subscriberClient.on('message', (channel, message) => {
  console.log(`Message received on channel ${channel}: ${message}`);

  // Unsubscribe and quit if the message is 'KILL_SERVER'
  if (message === 'KILL_SERVER') {
    subscriberClient.unsubscribe();
    subscriberClient.quit();
  }
});
