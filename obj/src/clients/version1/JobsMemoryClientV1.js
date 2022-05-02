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
exports.JobsMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const JobV1_1 = require("../../data/version1/JobV1");
class JobsMemoryClientV1 {
    constructor(...items) {
        this._maxPageSize = 100;
        this._maxRetries = 10;
        this._items = items;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_2.FilterParams();
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
        };
    }
    // Add new job
    addJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = new JobV1_1.JobV1(newJob);
            return yield this.create(correlationId, job);
        });
    }
    // Add new job if not exist with same type and ref_id
    addUniqJob(correlationId, newJob) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_2.FilterParams.fromTuples('type', newJob.type, 'ref_id', newJob.ref_id);
            let paging = new pip_services3_commons_nodex_3.PagingParams();
            let page = yield this.getPageByFilter(correlationId, filter, paging);
            if (page.data.length > 0) {
                return page.data[0];
            }
            else {
                let job = new JobV1_1.JobV1(newJob);
                return yield this.create(correlationId, job);
            }
        });
    }
    // Get list of all jobs
    getJobs(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getPageByFilter(correlationId, filter, paging);
        });
    }
    // Get job by Id
    getJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getOneById(correlationId, jobId);
        });
    }
    // Start job
    startJobById(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // Start job by type
    startJobByType(correlationId, jobType, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = new Date();
            let item = this._items.find((item) => {
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
        });
    }
    // Extend job execution limit on timeout value
    extendJob(correlationId, jobId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = new Date();
            let update = pip_services3_commons_nodex_5.AnyValueMap.fromTuples('locked_until', new Date(now.getTime() + timeout));
            return yield this.updatePartially(correlationId, jobId, update);
        });
    }
    // Abort job
    abortJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let update = pip_services3_commons_nodex_5.AnyValueMap.fromTuples('started', null, 'locked_until', null);
            return yield this.updatePartially(correlationId, jobId, update);
        });
    }
    // Complete job
    completeJob(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let update = pip_services3_commons_nodex_5.AnyValueMap.fromTuples('started', null, 'locked_until', null, 'completed', new Date());
            return yield this.updatePartially(correlationId, jobId, update);
        });
    }
    // Delete job by Id
    deleteJobById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteById(correlationId, jobId);
        });
    }
    // Remove all jobs
    deleteJobs(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteByFilter(correlationId, new pip_services3_commons_nodex_2.FilterParams);
        });
    }
    // Clean completed and expiration jobs
    cleanJobs(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = new Date();
            //this._logger.trace(correlationId, "Starting jobs cleaning...");
            yield this.deleteByFilter(correlationId, pip_services3_commons_nodex_2.FilterParams.fromTuples('min_retries', this._maxRetries));
            yield this.deleteByFilter(correlationId, pip_services3_commons_nodex_2.FilterParams.fromTuples('execute_to', now));
            yield this.deleteByFilter(correlationId, pip_services3_commons_nodex_2.FilterParams.fromTuples('completed_to', now));
        });
    }
    getPageByFilter(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterJobs = this.composeFilter(filter);
            let jobs = this._items.filter(filterJobs);
            // Extract a page
            paging = paging != null ? paging : new pip_services3_commons_nodex_3.PagingParams();
            let skip = paging.getSkip(-1);
            let take = paging.getTake(this._maxPageSize);
            let total = null;
            if (paging.total)
                total = jobs.length;
            if (skip > 0)
                jobs = jobs.slice(skip);
            jobs = jobs.slice(0, take);
            let page = new pip_services3_commons_nodex_4.DataPage(jobs, total);
            return page;
        });
    }
    create(correlationId, job) {
        return __awaiter(this, void 0, void 0, function* () {
            if (job == null) {
                return;
            }
            job = Object.assign({}, job);
            job.id = job.id || pip_services3_commons_nodex_1.IdGenerator.nextLong();
            this._items.push(job);
            return job;
        });
    }
    getOneById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            let jobs = this._items.filter((x) => { return x.id == jobId; });
            let job = jobs.length > 0 ? jobs[0] : null;
            return job;
        });
    }
    deleteById(correlationId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            var index = this._items.map((x) => { return x.id; }).indexOf(jobId);
            var item = this._items[index];
            if (index < 0) {
                return;
            }
            this._items.splice(index, 1);
            return item;
        });
    }
    //correlationId, new FilterParams, callback
    deleteByFilter(correlationId, filter) {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let job = this._items[index];
            if (this.composeFilter(filter)(job)) {
                this._items.splice(index, 1);
                break;
            }
        }
        return;
    }
    updatePartially(correlationId, jobId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this._items.map((x) => { return x.id; }).indexOf(jobId);
            if (index < 0) {
                return;
            }
            let item = this._items[index];
            item = Object.assign(item, data.getAsObject());
            this._items[index] = item;
            return item;
        });
    }
}
exports.JobsMemoryClientV1 = JobsMemoryClientV1;
//# sourceMappingURL=JobsMemoryClientV1.js.map