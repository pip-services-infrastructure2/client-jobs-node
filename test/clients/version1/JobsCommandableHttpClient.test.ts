import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { JobsMemoryPersistence } from 'service-jobs-node';
import { JobsController } from 'service-jobs-node';
import { JobsHttpServiceV1 } from 'service-jobs-node';

import { JobsCommandableHttpClientV1 } from '../../../src/clients/version1/JobsCommandableHttpClientV1';
import { JobsClientV1Fixture } from './JobsClientV1Fixture';

suite('JobsCommandableHttpClientV1', () => {
    let persistence: JobsMemoryPersistence;
    let controller: JobsController;
    let service: JobsHttpServiceV1;
    let client: JobsCommandableHttpClientV1;
    let fixture: JobsClientV1Fixture;

    setup(async () => {
        persistence = new JobsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new JobsController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new JobsHttpServiceV1();
        service.configure(httpConfig);

        client = new JobsCommandableHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('service-jobs', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-jobs', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-jobs', 'service', 'commandable-http', 'default', '1.0'), service,
            new Descriptor('service-jobs', 'client', 'commandable-http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new JobsClientV1Fixture(client);

        await persistence.open(null);
        await service.open(null);
        await client.open(null);

    });

    teardown(async () => {
        await client.close(null);
        await service.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Control test', async () => {
        await fixture.testControl();
    });

});