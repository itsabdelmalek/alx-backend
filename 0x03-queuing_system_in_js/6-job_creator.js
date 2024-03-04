// Import required modules using ES6 import syntax
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Object containing job data
const jobData = {
  phoneNumber: '+1234567890',
  message: 'Hello, this is a notification message.',
};

// Create a job and add it to the queue
const notificationJob = queue.create('push_notification_code', jobData);

// Event handler for successful job creation
notificationJob.on('enqueue', (job, type) => {
  console.log(`Notification job created: ${job.id}`);
});

// Event handler for completed job
notificationJob.on('complete', () => {
  console.log('Notification job completed');
  // Optionally, you can remove the job from the queue after it's completed
  notificationJob.remove((err) => {
    if (err) throw err;
    console.log(`Job ${notificationJob.id} removed from queue`);
  });
});

// Event handler for failed job
notificationJob.on('failed', () => {
  console.log('Notification job failed');
});

// Save the job to the queue
notificationJob.save((err) => {
  if (err) throw err;
  // Start processing jobs in the queue
  kue.app.listen(3000);
  console.log('Job saved to the queue');
});
