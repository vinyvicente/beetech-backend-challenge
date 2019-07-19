import 'reflect-metadata';

import { createConnection } from 'typeorm';

import { Logger } from '@nestjs/common';
import { typeOrmConfig } from '../../src/config';

(async () => {
    Logger.log('Creating seeds.');

    const conn = await createConnection(typeOrmConfig);
    Logger.log('Connected.');

/*    let patient = new Patient();
    patient.name = 'Matt';

    const patientRepo = conn.getRepository(Patient);
    patient = await patientRepo.save(patient); // re-assign to know assigned id
    Logger.log(`Patient saved. id = ${patient.id}`);*/

    // Close connection
    await conn.close();

    Logger.log('Connection closed.');
    Logger.log('Finished seeds.');
})();
