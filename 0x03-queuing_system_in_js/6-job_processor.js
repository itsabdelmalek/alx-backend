// Import required modules using ES6 import syntax
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Queue process for 'push_notification_code' jobs
queue.process('push_notification_code', (job, done) => {
  // Extract phone number and message from job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message);

  // Mark the job as completed
  done();
});

// Log a message when the queue is started
queue.on('job enqueue', (id, type) => {
  console.log(`Job ${id} added to the queue: ${type}`);
});

// Log a message when the queue is processing a job
queue.on('job start', (id, result) => {
  console.log(`Job ${id} started processing`);
});

// Log a message when the queue completes a job
queue.on('job complete', (id, result) => {
  console.log(`Job ${id} completed`);
});

// Log a message when the queue encounters an error
queue.on('job failed', (id, result) => {
  console.log(`Job ${id} failed: ${result}`);
});

// Log a message when the queue is failed to process a job
queue.on('error', (err) => {
  console.error(`Queue error: ${err}`);
});

// Start processing jobs in the queue
kue.app.listen(3001);

console.log('Job processor is listening on port 3001');
