import { CalendaryService } from './calendary.service';
import { SchoolsService } from './schools.service';
import { WindowRef } from './WindowRef';

export * from './calendary.service';
export * from './schools.service';
export * from './WindowRef';


export const SERVICES = [
    CalendaryService,
    SchoolsService,
    WindowRef
];