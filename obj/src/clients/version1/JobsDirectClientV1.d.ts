import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { JobV1 } from '../../../src/data/version1/JobV1';
import { NewJobV1 } from '../../../src/data/version1/NewJobV1';
import { IJobsClientV1 } from './IJobsClientV1';
export declare class JobsDirectClientV1 extends DirectClient<any> implements IJobsClientV1 {
    constructor();
    addJob(correlationId: string, newJob: NewJobV1): Promise<JobV1>;
    addUniqJob(correlationId: string, newJob: NewJobV1): Promise<JobV1>;
    getJobs(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<JobV1>>;
    getJobById(correlationId: string, jobId: string): Promise<JobV1>;
    startJobById(correlationId: string, jobId: string, timeout: number): Promise<JobV1>;
    startJobByType(correlationId: string, jobType: string, timeout: number): Promise<JobV1>;
    extendJob(correlationId: string, jobId: string, timeout: number): Promise<JobV1>;
    abortJob(correlationId: string, jobId: string): Promise<JobV1>;
    completeJob(correlationId: string, jobId: string): Promise<JobV1>;
    deleteJobById(correlationId: string, jobId: string): Promise<JobV1>;
    deleteJobs(correlationId: string): Promise<void>;
}
