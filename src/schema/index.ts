import caseStudy from './caseStudy';
import homepage from './homepage';
import location from './location';
import service from './service';
import organization from './organization';
import person from './person';
import clientReference from './clientReference';
import blockContent from './blockContent';
import post from './post';
import category from './category';
import product from './product';
import legalPage from './legalPage';
import navigation from './navigation';

export const schemaTypes = [
    // Singletons
    organization,
    navigation,
    // Documents
    homepage,
    service,
    location,
    caseStudy,
    person,
    clientReference,
    post,
    category,
    product,
    legalPage,
    // Objects
    blockContent,
];
