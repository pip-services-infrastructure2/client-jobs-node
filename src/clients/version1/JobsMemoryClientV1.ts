import { IdGenerator } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';

import { JobV1 } from '../../data/version1/JobV1';
import { NewJobV1 } from '../../data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';

export class JobsMemoryClientV1 implements IJobsClientV1 {

    private _maxPageSize: number = 100;
    private _maxRetries = 10;
    private _items: JobV1[];

    public constructor(...items: JobV1[]) {
        this._items = items;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let ref_id = filter.getAsNullableString('ref_id');

        let created = filter.getAsNullableDateTime('created');
        let created_from = filter.getAsNullableDateTime('created_from');
        let created_to = filter.getAsNullableDateTime('created_to');

        let started = filter.getAsNullableDateTime('started');
        let started_from = filter.getAsNullableDateTime('started_from');
        let started_to = filter.getAsNullableDateTime('started_to');

        let locked_until = filter.getAsNullableDateTime('locked_until');
        let locked_from = filter.getAsNullableDateTime('locked_from');
        let locked_to = filter.getAsNullableDateTime('locked_to');

        let execute_until = filter.getAsNullableDateTime('execute_until');
        let execute_from = filter.getAsNullableDateTime('execute_from');
        let execute_to = filter.getAsNullableDateTime('execute_to');

        let completed = filter.getAsNullableDateTime('completed');
        let completed_from = filter.getAsNullableDateTime('completed_from');
        let completed_to = filter.getAsNullableDateTime('completed_to');

        let retries = filter.getAsNullableInteger('retries');
        let min_retries = filter.getAsNullableInteger('min_retries');

        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (type != null && item.type != type)
                return false;
            if (ref_id != null && item.ref_id != ref_id)
                return false;
            if (created != null && item.created.getTime() != created.getTime())
                return false;
            if (created_from != null && item.created.getTime() < created_from.getTime())
                return false;
            if (created_to != null && item.created.getTime() > created_to.getTime())
                return false;
            if (started != null && (item.started == null || item.started.getTime() != started.getTime()))
                return false;
            if (started_from != null && (item.started == null || item.started.getTime() < started_from.getTime()))
                return false;
            if (started_to != null && (item.started == null || item.started.getTime() > started_to.getTime()))
                return false;
            if (locked_until != null && (item.locked_until == null || item.locked_until.getTime() != locked_until.getTime()))
                return false;
            if (locked_from != null && (item.locked_until == null || item.locked_until.getTime() < locked_from.getTime()))
                return false;
            if (locked_to != null && (item.locked_until == null || item.locked_until.getTime() > locked_to.getTime()))
                return false;
            if (execute_until != null && (item.execute_until == null || item.execute_until.getTime() != execute_until.getTime()))
                return false;
            if (execute_from != null && (item.execute_until == null || item.execute_until.getTime() < execute_from.getTime()))
                return false;
            if (execute_to != null && (item.execute_until == null || item.execute_until.getTime() > execute_to.getTime()))
                return false;
            if (completed != null && (item.completed == null || item.completed.getTime() != completed.getTime()))
                return false;
            if (completed_from != null && (item.completed == null || item.completed.getTime() < completed_from.getTime()))
                return false;
            if (completed_to != null && (item.completed == null || item.completed.getTime() > completed_to.getTime()))
                return false;
            if (retries != null && item.retries != retries)
                return false;
            if (min_retries != null && item.retries <= min_retries)
                return false;
            return true;
        }
    }

    // Add new job
    public async addJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let job = new JobV1(newJob);
        return await this.create(correlationId, job);
    }

    // Add new job if not exist with same type and ref_id
    public async addUniqJob(correlationId: string, newJob: NewJobV1): Promise<JobV1> {
        let filter = FilterParams.fromTuples(
            'type', newJob.type,
            'ref_id', newJob.ref_id
        );
        let paging = new PagingParams();
        let page = await this.getPageByFilter(correlationId, filter, paging);
        if (page.data.length > 0) {
            return page.data[0]
        } else {
            let job = new JobV1(newJob);
            return await this.create(correlationId, job);
        }
    }

    // Get list of all jobs
    public async getJobs(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<JobV1>> {
        return await this.getPageByFilter(correlationId, filter, paging);
    }

    // Get job by Id
    public async getJobById(correlationId: string, jobId: string): Promise<JobV1> {
        return await this.getOneById(correlationId, jobId);
    }

    // Start job
    public async startJobById(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        let item = this._items.find(item => item.id == jobId);

        if (item == null) {
            return;
        }

        let now = new Date();
        if (item.completed == null && (item.locked_until == null || item.locked_until.getTime() <= now.getTime())) {
            item.started = now;
            item.locked_until = new Date(now.getTime() + timeout);
            item.retries++;
            return item;
        }
    }

    // Start job by type
    public async startJobByType(correlationId: string, jobType: string, timeout: number): Promise<JobV1> {
        let now = new Date();
        let item = this._items.find((item: JobV1) => {
            return item.type == jobType && item.completed == null && item.retries < this._maxRetries
                && (item.locked_until == null || item.locked_until.getTime() <= now.getTime());
        });

        if (item == null) {
            return;
        }

        item.started = now;
        item.locked_until = new Date(now.getTime() + timeout);
        item.retries++;
        return item;
    }

    // Extend job execution limit on timeout value
    public async extendJob(correlationId: string, jobId: string, timeout: number): Promise<JobV1> {
        let now = new Date();
        let update = AnyValueMap.fromTuples(
            'locked_until', new Date(now.getTime() + timeout)
        );
        return await this.updatePartially(correlationId, jobId, update);
    }

    // Abort job
    public async abortJob(correlationId: string, jobId: string): Promise<JobV1> {
        let update = AnyValueMap.fromTuples(
            'started', null,
            'locked_until', null,
        );
        return await this.updatePartially(correlationId, jobId, update);
    }

    // Complete job
    public async completeJob(correlationId: string, jobId: string): Promise<JobV1> {
        let update = AnyValueMap.fromTuples(
            'started', null,
            'locked_until', null,
            'completed', new Date()
        );
        return await this.updatePartially(correlationId, jobId, update);
    }

    // Delete job by Id
    public async deleteJobById(correlationId: string, jobId: string): Promise<JobV1> {
        return await this.deleteById(correlationId, jobId);
    }

    // Remove all jobs
    public async deleteJobs(correlationId: string): Promise<void> {
        await this.deleteByFilter(correlationId, new FilterParams);
    }

    // Clean completed and expiration jobs
    public async cleanJobs(correlationId: string): Promise<void> {
        let now = new Date();

        //this._logger.trace(correlationId, "Starting jobs cleaning...");

        await this.deleteByFilter(
            correlationId,
            FilterParams.fromTuples(
                'min_retries', this._maxRetries
            )
        );

        await this.deleteByFilter(
            correlationId,
            FilterParams.fromTuples(
                'execute_to', now
            )
        );

        await this.deleteByFilter(
            correlationId,
            FilterParams.fromTuples(
                'completed_to', now
            )
        );
    }

    private async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<JobV1>> {
        let filterJobs = this.composeFilter(filter);
        let jobs = this._items.filter(filterJobs);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = jobs.length;

        if (skip > 0)
            jobs = jobs.slice(skip);
        jobs = jobs.slice(0, take);

        let page = new DataPage<JobV1>(jobs, total);
        return page;
    }

    private async create(correlationId: string, job: JobV1): Promise<JobV1> {
        if (job == null) {
            return;
        }
        job = Object.assign({}, job);
        job.id = job.id || IdGenerator.nextLong();
        this._items.push(job);
        return job;
    }

    private async getOneById(correlationId: string, jobId: string): Promise<JobV1> {
        let jobs = this._items.filter((x) => { return x.id == jobId; });
        let job = jobs.length > 0 ? jobs[0] : null;

        return job;
    }

    private async deleteById(correlationId: string, jobId: string): Promise<JobV1> {
        var index = this._items.map((x) => { return x.id; }).indexOf(jobId);
        var item = this._items[index];

        if (index < 0) {
            return;
        }
        this._items.splice(index, 1);
        return item;
    }

    //correlationId, new FilterParams, callback
    private deleteByFilter(correlationId: string, filter: FilterParams): Promise<void> {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let job = this._items[index];
            if (this.composeFilter(filter)(job)) {
                this._items.splice(index, 1);
                break;
            }
        }
        return;
    }

    private async updatePartially(correlationId: string, jobId: string, data: AnyValueMap): Promise<JobV1> {

        let index = this._items.map((x) => { return x.id; }).indexOf(jobId);
        if (index < 0) {
            return;
        }

        let item: JobV1 = this._items[index];
        item = Object.assign(item, data.getAsObject());
        this._items[index] = item;
        return item;
    }
}