const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { JobV1 } from '../../../src/data/version1/JobV1';
import { NewJobV1 } from '../../../src/data/version1/NewJobV1';
import { IJobsClientV1 } from '../../../src/clients/version1/IJobsClientV1';

const JOB1: NewJobV1 = {
    //id: "Job1_t1_0fsd",
    type: "t1",
    ref_id: "obj_0fsd",
    params: null,
    //timeout: 1000*60*30, // 30 min
    ttl: 1000 * 60 * 60 * 3, // 3 hour
    //retries: 5
};
const JOB2: NewJobV1 = {
    //id: "Job2_t1_0fsd",
    type: "t1",
    ref_id: "obj_0fsd",
    params: null,
    //timeout: new Date(1000*60*15), // 15 min
    ttl: 1000 * 60 * 60, // 1 hour
    //retries: 3
};
const JOB3: NewJobV1 = {
    //id: "Job3_t2_3fsd",
    type: "t2",
    ref_id: "obj_3fsd",
    params: null,
    //timeout: new Date(1000*60*10), // 10 minutes
    ttl: 1000 * 60 * 30, // 30 minutes
    //retries: 2
};

export class JobsClientV1Fixture {
    private _client: IJobsClientV1;

    public constructor(client: IJobsClientV1) {
        assert.isNotNull(client);
        this._client = client;
    }

    public async testCrudOperations() {
        let job1: JobV1;

        // Create the first job
        let job = await this._client.addJob(null, JOB1);

        assert.isObject(job);
        assert.isNotNull(job.id);
        assert.equal(JOB1.type, job.type);
        assert.equal(JOB1.ref_id, job.ref_id);
        assert.equal(0, job.retries);
        assert.equal(JOB1.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        job1 = job;

        // Create the second job
        job = await this._client.addUniqJob(null, JOB2);

        assert.isObject(job);
        assert.isNotNull(job.id);
        assert.equal(JOB1.type, job.type);
        assert.equal(JOB1.ref_id, job.ref_id);

        assert.equal(0, job.retries);
        assert.equal(JOB1.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        // Create the third job
        job = await this._client.addJob(null, JOB3);

        assert.isObject(job);
        assert.isNotNull(job.id);
        assert.equal(JOB3.type, job.type);
        assert.equal(JOB3.ref_id, job.ref_id);

        assert.equal(0, job.retries);
        assert.equal(JOB3.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        // Get one job
        job = await this._client.getJobById(null, job1.id);

        assert.isObject(job);
        assert.equal(job1.id, job.id);
        assert.equal(JOB1.type, job.type);
        assert.equal(JOB1.ref_id, job.ref_id);
        assert.equal(job1.retries, job.retries);
        assert.equal(JOB1.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        // Get all jobs
        let page = await this._client.getJobs(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        job1 = page.data[0];

        // Delete the job
        job = await this._client.deleteJobById(null, job1.id);

        assert.isObject(job);
        assert.equal(job1.id, job.id);

        // Try to get deleted job
        job = await this._client.getJobById(null, job1.id);

        assert.isNull(job || null);

        // Delete all jobs
        await this._client.deleteJobs(null);

        // Try to get jobs after delete
        page = await this._client.getJobs(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 0);
    }

    public async testControl() {
        let job1: JobV1;
        let job2: JobV1;

        // Create the first job
        let job = await this._client.addJob(null, JOB1);

        assert.isObject(job);
        assert.isNotNull(job.id);
        assert.equal(JOB1.type, job.type);
        assert.equal(JOB1.ref_id, job.ref_id);

        assert.equal(0, job.retries);
        assert.equal(JOB1.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        job1 = job;

        // Create the second job
        job = await this._client.addUniqJob(null, JOB2);

        assert.isObject(job);
        assert.isNotNull(job.id);
        assert.equal(JOB1.type, job.type);
        assert.equal(JOB1.ref_id, job.ref_id);

        assert.equal(0, job.retries);
        assert.equal(JOB1.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        // Create the third job
        job = await this._client.addJob(null, JOB3);

        assert.isObject(job);
        assert.isNotNull(job.id);
        assert.equal(JOB3.type, job.type);
        assert.equal(JOB3.ref_id, job.ref_id);
        assert.equal(0, job.retries);
        assert.equal(JOB3.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        // Get one job
        job = await this._client.getJobById(null, job1.id);

        assert.isObject(job);
        assert.equal(job1.id, job.id);
        assert.equal(JOB1.type, job.type);
        assert.equal(JOB1.ref_id, job.ref_id);
        assert.equal(job1.retries, job.retries);
        assert.equal(JOB1.params, job.params);
        assert.isNotNull(job.created);
        assert.isNotNull(job.execute_until);
        assert.isNull(job.started);
        assert.isNull(job.completed);
        assert.isNull(job.locked_until);

        // Get all jobs
        let page = await this._client.getJobs(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        job1 = page.data[0];
        job2 = page.data[1];

        // Test start job
        job = await this._client.startJobByType(null, job1.type, 1000 * 60 * 10);

        assert.isObject(job);
        assert.isNotNull(job.locked_until);
        assert.isNotNull(job.started);
        job1 = job;

        // Test extend job
        job = await this._client.extendJob(null, job1.id, 1000 * 60 * 2);

        assert.isObject(job);

        assert.isNotNull(job.locked_until);
        job1 = job;

        // Test complete job
        job = await this._client.completeJob(null, job1.id);

        assert.isObject(job);

        assert.isNotNull(job.completed || null);
        job1 = job;

        // Test start job
        job = await this._client.startJobById(null, job2.id, 1000 * 60);

        assert.isObject(job);
        assert.isNotNull(job.locked_until);
        assert.isNotNull(job.started);
        job2 = job;

        // Test abort job
        job = await this._client.abortJob(null, job2.id);

        assert.isObject(job);

        assert.isNull(job.locked_until);
        assert.isNull(job.started);
    }
}

