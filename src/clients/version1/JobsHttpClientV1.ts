import { FilterParams } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { JobV1 } from '../../../src/data/version1/JobV1';
import { NewJobV1 } from '../../data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsHttpClientV1 extends CommandableHttpClient implements IJobsClientV1 {

    public constructor() {
        super('v1/jobs');
    }

    private fixJob(job: JobV1): JobV1 {
        if (job == null) return null;

        job.completed = DateTimeConverter.toNullableDateTime(job.completed);
        job.started = DateTimeConverter.toNullableDateTime(job.started);
        job.execute_until = DateTimeConverter.toDateTime(job.execute_until);
        job.locked_until = DateTimeConverter.toNullableDateTime(job.locked_until);
        job.created = DateTimeConverter.toDateTime(job.created);

        return job;
    }

    // Add new job
    public async addJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.add_job');

        try {
            let job = await this.callCommand<JobV1>(
                'add_job',
                correlationId,
                {
                    new_job: newJob
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Add new job if not exist with same type and ref_id
    public async addUniqJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.add_uniq_job');

        try {
            let job = await this.callCommand<JobV1>(
                'add_uniq_job',
                correlationId,
                {
                    new_job: newJob
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Get list of all jobs
    public async getJobs(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<JobV1>> {
        let timing = this.instrument(correlationId, 'jobs.get_jobs');

        try {
            let page = await this.callCommand<DataPage<JobV1>>(
                'get_jobs',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
            if (page == null || page.data.length == 0) return page;

            page.data = page.data.map((job) => this.fixJob(job));

            return page;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Get job by Id
    public async getJobById(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.get_job_by_id');

        try {
            let job = await this.callCommand<JobV1>(
                'get_job_by_id',
                correlationId,
                {
                    job_id: jobId
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Start job by id
    public async startJobById(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_id');

        try {
            let job = await this.callCommand<JobV1>(
                'start_job_by_id',
                correlationId,
                {
                    job_id: jobId,
                    timeout: timeout
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Start first free job by type
    public async startJobByType(correlationId: string, jobType: string, timeout: number): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.start_job_by_type');

        try {
            let job = await this.callCommand<JobV1>(
                'start_job_by_type',
                correlationId,
                {
                    type: jobType,
                    timeout: timeout
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Extend job execution limit on timeout value
    public async extendJob(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.extend_job');

        try {
            let job = await this.callCommand<JobV1>(
                'extend_job',
                correlationId,
                {
                    job_id: jobId,
                    timeout: timeout
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
    // Abort job
    public async abortJob(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.abort_job');

        try {
            let job = await this.callCommand<JobV1>(
                'abort_job',
                correlationId,
                {
                    job_id: jobId
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Complete job
    public async completeJob(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.complete_job');

        try {
            let job = await this.callCommand<JobV1>(
                'complete_job',
                correlationId,
                {
                    job_id: jobId
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Delete job by Id
    public async deleteJobById(correlationId: string, jobId: string): Promise<JobV1> {
        let timing = this.instrument(correlationId, 'jobs.delete_job_by_id');

        try {
            let job = await this.callCommand<JobV1>(
                'delete_job_by_id',
                correlationId,
                {
                    job_id: jobId
                }
            );
            return this.fixJob(job);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    // Remove all jobs
    public async deleteJobs(correlationId: string): Promise<void> {
        let timing = this.instrument(correlationId, 'jobs.delete_jobs');

        try {
            await this.callCommand(
                'delete_jobs',
                correlationId,
                null
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}