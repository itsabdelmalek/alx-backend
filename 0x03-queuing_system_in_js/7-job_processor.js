// Import required modules using ES6 import syntax
import kue from 'kue';

// Array containing blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a function to send a notification
function sendNotification(phoneNumber, message, job, done) {
  // Track the progress of the job
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an error message
    const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
    return done(new Error(errorMessage));
  }

  // Update the job progress to 50%
  job.progress(50, 100);

  // Log the notification message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}

// Create a Kue queue with concurrency set to 2
const queue = kue.createQueue({ concurrency: 2 });

// Queue process for 'push_notification_code_2' jobs
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with job and done parameters
  sendNotification(phoneNumber, message, job, done);
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
  console.error(`Job ${id} failed: ${result}`);
});

// Log a message when the queue is failed to process a job
queue.on('error', (err) => {
  console.error(`Queue error: ${err}`);
});

// Start processing jobs in the queue
kue.app.listen(3003);

console.log('Job processor is listening on port 3003');
