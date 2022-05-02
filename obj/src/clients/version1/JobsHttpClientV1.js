"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsHttpClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class JobsHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
    constructor() {
        super('v1/jobs');
    }
    fixJob(job) {
        if (job == null)
            return null;
        job.completed = pip_services3_commons_nodex_1.DateTimeConverter.toNullableDateTime(job.completed);
        job.started = pip_services3_commons_nodex_1.DateTimeConverter.toNullableDateTime(job.started);
        job.execute_until = pip_services3_commons_nodex_1.DateTimeConverter.toDateTime(job.execute_until);
        job.locked_until = pip_services3_commons_nodex_1.DateTimeConverter.toNullableDateTime(job.locked_until);
        job.created = pip_services3_commons_nodex_1.DateTimeConverter.toDateTime(job.created);
        return job;
    }
    // Add new job
    addJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.add_job');
            try {
                let job = yield this.callCommand('add_job', correlationId, {
                    new_job: newJob
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.add_uniq_job');
            try {
                let job = yield this.callCommand('add_uniq_job', correlationId, {
                    new_job: newJob
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.get_jobs');
            try {
                let page = yield this.callCommand('get_jobs', correlationId, {
                    filter: filter,
                    paging: paging
                });
                if (page == null || page.data.length == 0)
                    return page;
                page.data = page.data.map((job) => this.fixJob(job));
                return page;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.get_job_by_id');
            try {
                let job = yield this.callCommand('get_job_by_id', correlationId, {
                    job_id: jobId
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.start_job_by_id');
            try {
                let job = yield this.callCommand('start_job_by_id', correlationId, {
                    job_id: jobId,
                    timeout: timeout
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Start first free job by type
    startJobByType(correlationId, jobType, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.start_job_by_type');
            try {
                let job = yield this.callCommand('start_job_by_type', correlationId, {
                    type: jobType,
                    timeout: timeout
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.extend_job');
            try {
                let job = yield this.callCommand('extend_job', correlationId, {
                    job_id: jobId,
                    timeout: timeout
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Abort job
    abortJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.abort_job');
            try {
                let job = yield this.callCommand('abort_job', correlationId, {
                    job_id: jobId
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Complete job
    completeJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.complete_job');
            try {
                let job = yield this.callCommand('complete_job', correlationId, {
                    job_id: jobId
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.delete_job_by_id');
            try {
                let job = yield this.callCommand('delete_job_by_id', correlationId, {
                    job_id: jobId
                });
                return this.fixJob(job);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    // Remove all jobs
    deleteJobs(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.delete_jobs');
            try {
                yield this.callCommand('delete_jobs', correlationId, null);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
}
exports.JobsHttpClientV1 = JobsHttpClientV1;
//# sourceMappingURL=JobsHttpClientV1.js.map