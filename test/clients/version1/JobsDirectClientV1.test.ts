
import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { JobsMemoryPersistence } from 'service-jobs-node';
import { JobsController } from 'service-jobs-node';

import { JobsDirectClientV1 } from '../../../src/clients/version1/JobsDirectClientV1';
import { JobsClientV1Fixture } from './JobsClientV1Fixture';


suite('JobsDirectClientV1', () => {
    let persistence: JobsMemoryPersistence;
    let controller: JobsController;
    let client: JobsDirectClientV1;
    let fixture: JobsClientV1Fixture;

    setup(async () => {
        persistence = new JobsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new JobsController();
        controller.configure(new ConfigParams());

        client = new JobsDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('service-jobs', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-jobs', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-jobs', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new JobsClientV1Fixture(client);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Control test', async () => {
        await fixture.testControl();
    });
});