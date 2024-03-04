// Import required modules using ES6 import syntax
import { expect } from 'chai';
import kue from 'kue';
import { createPushNotificationsJobs } from './8-job';

// Create a Kue queue for testing
const testQueue = kue.createQueue({ redis: 'redis://127.0.0.1:6379/0' });

// Enter test mode without processing jobs
testQueue.testMode.enter();

describe('createPushNotificationsJobs function', () => {
  // After all tests, clear the queue and exit test mode
  after(() => {
    testQueue.testMode.clear();
    testQueue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    const invalidCall = () => createPushNotificationsJobs('not_an_array', testQueue);
    expect(invalidCall).to.throw('Jobs is not an array');
  });

  it('should create jobs in the queue', () => {
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

    // Call the function to create jobs in the queue
    createPushNotificationsJobs(jobs, testQueue);

    // Get the list of jobs in the queue
    const jobsInQueue = testQueue.testMode.jobs;

    // Expect the number of jobs in the queue to be equal to the number of jobs created
    expect(jobsInQueue.length).to.equal(jobs.length);

    // Validate specific job properties if needed
    jobsInQueue.forEach((job, index) => {
      expect(job.type).to.equal('push_notification_code_3');
      expect(job.data).to.deep.equal(jobs[index]);
    });
  });
});
