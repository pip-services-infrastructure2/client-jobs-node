import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { JobV1 } from '../../data/version1/JobV1';
import { NewJobV1 } from '../../data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsNullClientV1 implements IJobsClientV1 {
    // Add new job
    public async addJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let job = new JobV1(newJob);
        return job;
    }

    // Add new job if not exist with same type and ref_id
    public async addUniqJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let job = new JobV1(newJob);
        return job;
    }

    // Get list of all jobs
    public async getJobs(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<JobV1>> {
        return new DataPage<JobV1>();
    }

    // Get job by Id
    public getJobById(correlationId: string, jobId: string): Promise<JobV1> {
        return;
    }

    // Delete job by Id
    public deleteJobById(correlationId: string, jobId: string): Promise<JobV1> {
        return;
    }

    // Start job by id
    public startJobById(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        return;
    }

    // Start fist free job by type
    public startJobByType(correlationId: string, jobType: string, timeout: number): Promise<JobV1> {
        return;
    }

    // Extend job execution limit on timeout value
    public extendJob(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        return;
    }

    // Abort job
    public abortJob(correlationId: string, jobId: string): Promise<JobV1> {
        return;
    }

    // Complete job
    public completeJob(correlationId: string, jobId: string): Promise<JobV1> {
        return;
    }

    // Remove all jobs
    public deleteJobs(correlationId: string): Promise<void> {
        return;
    }

}