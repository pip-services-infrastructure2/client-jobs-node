
import { JobsMemoryClientV1 } from '../../../src/clients/version1/JobsMemoryClientV1';
import { JobsClientV1Fixture } from './JobsClientV1Fixture';


suite('JobsMemoryClientV1', () => {

    let client: JobsMemoryClientV1;
    let fixture: JobsClientV1Fixture;

    setup((done) => {
        client = new JobsMemoryClientV1();
        fixture = new JobsClientV1Fixture(client);
        done();
    });

    teardown((done) => {
        done();
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Control test', async () => {
        await fixture.testControl();
    });
});