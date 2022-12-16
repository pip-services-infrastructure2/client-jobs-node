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
exports.JobsDirectClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class JobsDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-jobs', 'controller', '*', '*', '1.0'));
    }
    // Add new job
    addJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.add_job');
            try {
                let res = yield this._controller.addJob(correlationId, newJob);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.add_uniq_job');
            try {
                let res = yield this._controller.addUniqJob(correlationId, newJob);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.get_jobs');
            try {
                let res = yield this._controller.getJobs(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.get_by_id_job');
            try {
                let res = yield this._controller.getJobById(correlationId, jobId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.start_job_by_id');
            try {
                let res = yield this._controller.startJobById(correlationId, jobId, timeout);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Start fist free job by type
    startJobByType(correlationId, jobType, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.start_job_by_type');
            try {
                let res = yield this._controller.startJobByType(correlationId, jobType, timeout);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.extend_job');
            try {
                let res = yield this._controller.extendJob(correlationId, jobId, timeout);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Abort job
    abortJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.abort_job');
            try {
                let res = yield this._controller.abortJob(correlationId, jobId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Complete job
    completeJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.complete_job');
            try {
                let res = yield this._controller.completeJob(correlationId, jobId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.delete_job_by_id');
            try {
                let res = yield this._controller.deleteJobById(correlationId, jobId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    // Remove all jobs
    deleteJobs(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'jobs.delete_jobs');
            try {
                yield this._controller.deleteJobs(correlationId);
                timing.endTiming();
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
}
exports.JobsDirectClientV1 = JobsDirectClientV1;
//# sourceMappingURL=JobsDirectClientV1.js.map