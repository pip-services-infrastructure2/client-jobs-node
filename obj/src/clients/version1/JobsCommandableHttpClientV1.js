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
exports.JobsCommandableHttpClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class JobsCommandableHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
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
            let job = yield this.callCommand('add_job', correlationId, {
                new_job: newJob
            });
            return this.fixJob(job);
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('add_uniq_job', correlationId, {
                new_job: newJob
            });
            return this.fixJob(job);
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this.callCommand('get_jobs', correlationId, {
                filter: filter,
                paging: paging
            });
            if (page == null || page.data.length == 0)
                return page;
            page.data = page.data.map((job) => this.fixJob(job));
            return page;
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('get_job_by_id', correlationId, {
                job_id: jobId
            });
            return this.fixJob(job);
        });
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('start_job_by_id', correlationId, {
                job_id: jobId,
                timeout: timeout
            });
            return this.fixJob(job);
        });
    }
    // Start first free job by type
    startJobByType(correlationId, jobType, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('start_job_by_type', correlationId, {
                type: jobType,
                timeout: timeout
            });
            return this.fixJob(job);
        });
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('extend_job', correlationId, {
                job_id: jobId,
                timeout: timeout
            });
            return this.fixJob(job);
        });
    }
    // Abort job
    abortJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('abort_job', correlationId, {
                job_id: jobId
            });
            return this.fixJob(job);
        });
    }
    // Complete job
    completeJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('complete_job', correlationId, {
                job_id: jobId
            });
            return this.fixJob(job);
        });
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = yield this.callCommand('delete_job_by_id', correlationId, {
                job_id: jobId
            });
            return this.fixJob(job);
        });
    }
    // Remove all jobs
    deleteJobs(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.callCommand('delete_jobs', correlationId, null);
        });
    }
}
exports.JobsCommandableHttpClientV1 = JobsCommandableHttpClientV1;
//# sourceMappingURL=JobsCommandableHttpClientV1.js.map