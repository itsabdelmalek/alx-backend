// Import required modules using ES6 import syntax
import kue from 'kue';

// Create an array of jobs
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
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Create a Kue queue
const queue = kue.createQueue();

// Loop through the array of jobs
jobs.forEach((jobData, index) => {
  // Create a new job and add it to the queue
  const notificationJob = queue.create('push_notification_code_2', jobData);

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
      console.log(`Job ${index + 1} saved to the queue`);
    }
  });
});

// Start processing jobs in the queue
kue.app.listen(3002);

console.log('Job creator is listening on port 3002');
