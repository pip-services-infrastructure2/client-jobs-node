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
exports.JobsNullClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const JobV1_1 = require("../../data/version1/JobV1");
class JobsNullClientV1 {
    // Add new job
    addJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = new JobV1_1.JobV1(newJob);
            return job;
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = new JobV1_1.JobV1(newJob);
            return job;
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage();
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId) {
        return;
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId) {
        return;
    }
    // Start job by id
    startJobById(correlationId, jobId, timeout) {
        return;
    }
    // Start fist free job by type
    startJobByType(correlationId, jobType, timeout) {
        return;
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout) {
        return;
    }
    // Abort job
    abortJob(correlationId, jobId) {
        return;
    }
    // Complete job
    completeJob(correlationId, jobId) {
        return;
    }
    // Remove all jobs
    deleteJobs(correlationId) {
        return;
    }
}
exports.JobsNullClientV1 = JobsNullClientV1;
//# sourceMappingURL=JobsNullClientV1.js.map