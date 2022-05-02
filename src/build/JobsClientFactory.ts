
import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { JobsNullClientV1 } from '../clients/version1/JobsNullClientV1';
import { JobsDirectClientV1 } from '../clients/version1/JobsDirectClientV1';
import { JobsHttpClientV1 } from '../clients/version1/JobsHttpClientV1';

export class JobsClientFactory extends Factory {
    public Descriptor: Descriptor = new Descriptor("service-jobs", "factory", "client", "default", "1.0");
    public ClientNullDescriptor: Descriptor = new Descriptor("service-jobs", "client", "null", "*", "1.0");
    public ClientDirectDescriptor: Descriptor = new Descriptor("service-jobs", "client", "direct", "*", "1.0");
    public ClientHttpDescriptor: Descriptor = new Descriptor("service-jobs", "client", "http", "*", "1.0");

    public constructor() {
        super();

        this.registerAsType(this.ClientNullDescriptor, JobsNullClientV1);
        this.registerAsType(this.ClientDirectDescriptor, JobsDirectClientV1);
        this.registerAsType(this.ClientHttpDescriptor, JobsHttpClientV1);
    }
}

