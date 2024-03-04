// Import required modules using ES6 import syntax
import kue from 'kue';

// Create a function to create push notification jobs
function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Loop through the array of jobs
  jobs.forEach((jobData) => {
    // Create a new job and add it to the queue
    const notificationJob = queue.create('push_notification_code_3', jobData);

    // Event handler for successful job creation
    notificationJob.on('enqueue', (job, type) => {
      console.log(`Notification job created: ${job.id}`);
    });

    // Event handler for completed job
    notificationJob.on('complete', () => {
      console.log(`Notification job ${notificationJob.id} completed`);
    });

    // Event handler for failed job
    notificationJob.on('failed', (err) => {
      console.error(`Notification job ${notificationJob.id} failed: ${err}`);
    });

    // Event handler for job progress
    notificationJob.on('progress', (progress) => {
      console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
    });

    // Save the job to the queue
    notificationJob.save((err) => {
      if (err) {
        console.error(`Error saving job: ${err}`);
      } else {
        console.log(`Job ${notificationJob.id} saved to the queue`);
      }
    });
  });
}

// Create a Kue queue
const queue = kue.createQueue();

// Example usage of createPushNotificationsJobs function
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
];

// Call the createPushNotificationsJobs function with the array of jobs and the queue
createPushNotificationsJobs(jobs, queue);

// Start processing jobs in the queue
kue.app.listen(3004);

console.log('Job creator is listening on port 3004');
