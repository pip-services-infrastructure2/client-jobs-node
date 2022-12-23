import { JobsMockClientV1 } from '../../../src/clients/version1/JobsMockClientV1';
import { JobsClientV1Fixture } from './JobsClientV1Fixture';


suite('JobsMockClientV1', () => {

    let client: JobsMockClientV1;
    let fixture: JobsClientV1Fixture;

    setup((done) => {
        client = new JobsMockClientV1();
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