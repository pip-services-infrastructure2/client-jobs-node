# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Jobs Microservice client SDK for Node.js / ES2017

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* Service
  - [Jobs service](https://github.com/pip-services-infrastructure2/service-jobs-node)
* Client API version 1
  - [Jobs API v1](doc/ClientApiVersion1.md)

This is a Node.js client SDK for [service-jobs](https://github.com/pip-services-infrastructure2/service-jobs-node) microservice.

 It provides an easy to use abstraction over communication protocols:

- Direct client for monolythic deployments
- Http client
- Null client to be used in testing

## Install

Add dependency to the client SDK into **package.json** file of your project
```typescript
{
    ...
    "dependencies": {
        ....
        "client-jobs-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```
## Use

Inside your code get the reference to the client SDK
```typescript
 import { JobsHttpClientV1 } from 'client-jobs-node';
```

Define client configuration parameters.

```typescript
// Client configuration
var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);
client.configure(httpConfig);
```

Instantiate the client and open connection to the microservice
```typescript
// Create the client instance
client = new JobsHttpClientV1();

// Connect to the microservice
await client.open(null);
// Work with the microservice
...
```
Now the client is ready to perform operations:

Add job:
```typescript 

const JOB1: NewJobV1 = {
    type: "t1",
    ref_id: "obj_0fsd",
    params: null,
    ttl:1000*60*60*3, // 3 hour
}; 

try {
    let job = await client.addJob("123", JOB1);
    console.dir('Job was created successfull');
} catch(err) {
    console.error('Can\'t create job!');
    console.error(err);
}
```

Add uniq job:
```typescript 

const JOB1: NewJobV1 = {
    type: "t1",
    ref_id: "obj_0fsd",
    params: null,
    ttl:1000*60*60*3, // 3 hour
}; 

const JOB2: NewJobV1 = {
    type: "t1",
    ref_id: "obj_0fsd",
    params: null,
    ttl: 1000*60*60 // 1 hour
};
try {
    let job = await client.addUniqJob("123", JOB1);
    // job variable was contained new job with JOB1 params
    console.dir('Job was created successfull');
} catch(err) {
    console.error('Can\'t create job!');
    console.error(err);
}

try {
    let job = await client.addUniqJob("123", JOB2);
    // job variable was contained new job with JOB1 params 
    console.dir('Job was created successfull');
} catch(err) {
    console.error('Can\'t create job!');
    console.error(err);
}
```

Get jobs by filter:
```typescript    
try {
    let page = await client.getJobs("123", new FilterParams(), new PagingParams());
    console.dir('Jobs was recived successfull');
    for (let job in page.data) {
        console.dir('Jobs:');
        console.dir(job.toString());
    }
} catch(err) {
    console.error('Can\'t get jobs!');
    console.error(err);
}
    
try {
    let page = await client.getJobs("123", FilterParams.fromTuples('lock', 'false'),  new PagingParams());
    console.dir('Jobs was recived successfull');
    for (let job in page.data) {
        console.dir('Jobs:');
        console.dir(job.toString());
    }
} catch(err) {
    console.error('Can\'t get jobs!');
    console.error(err);
}

```

Delete existing job by job_id:
```typescript    

try {
    let job = await client.deleteJobById("123", JOB1.id);
    console.dir('Job was delete successfull');
    console.dir('Deleted job:');
    console.dir(job.toString());
} catch(err) {
    console.error('Can\'t delete job!');
    console.error(err);
}
```

Delete all jobs:
```typescript    
try {
    await client.deleteJobs("123");
    console.dir('All jobs was delete successfull');
} catch(err) {
    console.error('Can\'t delete jobs!');
    console.error(err);
}
```


## Control functions

Start first free job by type:
```typescript

let timeout = 1000*60*2; // Timeout for working job in ms
try {
    let job = await client.startJobByType("123", JOB1.type, timeout);
    console.dir('Job was started successfull!');
    // returned job you can use in other control methods
} catch(err) {
    console.error('Can\'t start jo!');
    console.error(err);
}
```

Start job (use this method, if you aborting job and want restart this):
```typescript
let timeout = 1000*60*2; // Timeout for working job in ms
try {
    let job = await client.startJobById("123", JOB1.id, timeout);
    console.dir('Job was started successfull');
} catch(err) {
    console.error('Can\'t start jo!');
    console.error(err);
}
```

Extend work time existing job:
```typescript
let timeout = 1000*60*2; // Timeout for extend working time for job in ms
try {
    let job = await client.extendJob("123", JOB1.id, timeout);
    //  extend lock_until and execute_until propertis on timeout value
    console.dir('Job was updated successfull');
} catch(err) {
    console.error('Can\'t extend job!');
    console.error(err);
} 
```

Abort running job:
```typescript
try {
    let job = await client.abortJob("123", JOB1.id);
    //  extend lock_until and execute_until propertis on timeout value
    console.dir('Job was aborted successfull');
} catch(err) {
    console.error('Can\'t abort job!');
    console.error(err);
}       
```

Compleate running job:
```typescript
try {
    let job = await client.completeJob("123", JOB1.id);
    console.dir('Job was completed successfull');
} catch(err) {
    console.error('Can\'t compleate job!');
    console.error(err);
}
            
        
```

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov* and *Levichev Dmitry*.
