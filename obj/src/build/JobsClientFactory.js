"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsClientFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const JobsNullClientV1_1 = require("../clients/version1/JobsNullClientV1");
const JobsDirectClientV1_1 = require("../clients/version1/JobsDirectClientV1");
const JobsMockClientV1_1 = require("../clients/version1/JobsMockClientV1");
const JobsCommandableHttpClientV1_1 = require("../clients/version1/JobsCommandableHttpClientV1");
class JobsClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-jobs", "factory", "client", "default", "1.0");
        this.ClientNullDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-jobs", "client", "null", "*", "1.0");
        this.MockDirectDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-jobs", "client", "mock", "*", "1.0");
        this.ClientDirectDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-jobs", "client", "direct", "*", "1.0");
        this.ClientHttpDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-jobs", "client", "commandable-http", "*", "1.0");
        this.registerAsType(this.ClientNullDescriptor, JobsNullClientV1_1.JobsNullClientV1);
        this.registerAsType(this.MockDirectDescriptor, JobsMockClientV1_1.JobsMockClientV1);
        this.registerAsType(this.ClientDirectDescriptor, JobsDirectClientV1_1.JobsDirectClientV1);
        this.registerAsType(this.ClientHttpDescriptor, JobsCommandableHttpClientV1_1.JobsCommandableHttpClientV1);
    }
}
exports.JobsClientFactory = JobsClientFactory;
//# sourceMappingURL=JobsClientFactory.js.map