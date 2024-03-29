import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { JobV1 } from '../../../src/data/version1/JobV1';
import { NewJobV1 } from '../../../src/data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsDirectClientV1 extends DirectClient<any> implements IJobsClientV1 {
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('service-jobs', 'controller', '*', '*', '1.0'));
    }
    
    // Add new job
    public async addJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.add_job');
        
        try {
            let res = await this._controller.addJob(correlationId, newJob);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Add new job if not exist with same type and ref_id
    public async addUniqJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.add_uniq_job');
        
        try {
            let res = await this._controller.addUniqJob(correlationId, newJob);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Get list of all jobs
    public async getJobs(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<JobV1>> {
        let timing = this.instrument(correlationId, 'jobs.get_jobs');
        
        try {
            let res = await this._controller.getJobs(correlationId, filter, paging);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Get job by Id
    public async getJobById(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.get_by_id_job');
        
        try {
            let res = await this._controller.getJobById(correlationId, jobId);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Start job by id
    public async startJobById(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_id');
        
        try {
            let res = await this._controller.startJobById(correlationId, jobId, timeout);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Start fist free job by type
    public async startJobByType(correlationId: string, jobType: string, timeout: number): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_type');
        
        try {
            let res = await this._controller.startJobByType(correlationId, jobType, timeout);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Extend job execution limit on timeout value
    public async extendJob(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.extend_job');
        
        try {
            let res = await this._controller.extendJob(correlationId, jobId, timeout);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Abort job
    public async abortJob(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.abort_job');
        
        try {
            let res = await this._controller.abortJob(correlationId, jobId);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Complete job
    public async completeJob(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.complete_job');
        
        try {
            let res = await this._controller.completeJob(correlationId, jobId);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Delete job by Id
    public async deleteJobById(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.delete_job_by_id');
        
        try {
            let res = await this._controller.deleteJobById(correlationId, jobId);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    // Remove all jobs
    public async deleteJobs(correlationId: string): Promise<void> {
        let timing = this.instrument(correlationId, 'jobs.delete_jobs');

        try {
            await this._controller.deleteJobs(correlationId);
            timing.endTiming();
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

}