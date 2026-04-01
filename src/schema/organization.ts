import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'organization',
    title: 'Organization (Singleton)',
    type: 'document',
    groups: [
        { name: 'identity', title: 'Allgemein' },
        { name: 'location', title: 'Standort & Kontakt' },
        { name: 'trust', title: 'Vertrauen & Verifizierung' },
        { name: 'relations', title: 'Team & Kunden' },
    ],
    fields: [
        // 1. Core Identity
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'identity',
            initialValue: 'Adbites GmbH',
        }),
        defineField({
            name: 'legalName',
            title: 'Legal Name (Handelsregister)',
            type: 'string',
            group: 'identity',
            initialValue: 'Adbites GmbH',
        }),
        defineField({
            name: 'url',
            title: 'Website URL',
            type: 'url',
            group: 'identity',
            initialValue: 'https://www.adbites.de',
        }),
        defineField({
            name: 'foundingDate',
            title: 'Founding Date',
            type: 'date',
            group: 'identity',
            initialValue: '2007-01-01',
        }),
        defineField({
            name: 'description',
            title: 'Description (160 chars)',
            type: 'text',
            rows: 3,
            group: 'identity',
            validation: (Rule) => Rule.max(160).warning('Keep it concise for SEO.'),
        }),
        defineField({
            name: 'taxId',
            title: 'Tax ID (Steuernummer)',
            type: 'string',
            group: 'identity',
        }),
        defineField({
            name: 'vatId',
            title: 'VAT ID (USt-IdNr.)',
            type: 'string',
            group: 'identity',
            description: 'Crucial for trust signals.',
        }),
        defineField({
            name: 'isoCode',
            title: 'ISO Region Code',
            type: 'string',
            group: 'location',
            initialValue: 'DE-NW',
            description: 'e.g., DE-NW for North Rhine-Westphalia',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            group: 'identity',
            options: { hotspot: true },
        }),

        // 2. Digital Footprint
        defineField({
            name: 'sameAs',
            title: 'Same As (Digital Footprint)',
            type: 'array',
            group: 'trust',
            of: [{ type: 'url' }],
            description: 'LinkedIn, North Data, Crunchbase, OMR, etc.',
        }),

        // 3. Physical Presence
        defineField({
            name: 'address',
            title: 'Address',
            type: 'object',
            group: 'location',
            fields: [
                { name: 'streetAddress', type: 'string', title: 'Street' },
                { name: 'addressLocality', type: 'string', title: 'City' },
                { name: 'postalCode', type: 'string', title: 'ZIP Code' },
                { name: 'addressCountry', type: 'string', title: 'Country Code (DE)' },
            ]
        }),
        defineField({
            name: 'geo',
            title: 'Geo Coordinates',
            type: 'geopoint',
            group: 'location',
        }),
        defineField({
            name: 'contactPoints',
            title: 'Contact Points',
            type: 'array',
            group: 'location',
            of: [
                {
                    type: 'object',
                    name: 'contactPoint',
                    fields: [
                        { name: 'contactType', type: 'string', title: 'Contact Type' },
                        { name: 'email', type: 'string', title: 'Email' },
                        { name: 'telephone', type: 'string', title: 'Telephone' },
                    ]
                }
            ]
        }),

        // 4. E-E-A-T & Expertise
        defineField({
            name: 'founders',
            title: 'Founders',
            type: 'array',
            group: 'relations',
            of: [{ type: 'reference', to: [{ type: 'person' }] }],
        }),
        defineField({
            name: 'knowsAbout',
            title: 'Knows About (Topics)',
            type: 'array',
            group: 'relations',
            of: [{ type: 'string' }],
            description: 'Semantic topics like "Meta Ads", "Retail Marketing"',
        }),
        defineField({
            name: 'areaServed',
            title: 'Area Served',
            type: 'array',
            group: 'relations',
            of: [{ type: 'string' }],
            initialValue: ['DE', 'AT', 'CH'],
        }),

        // 5. GEO Performance Data
        defineField({
            name: 'managedBudget',
            title: 'Managed Budget',
            type: 'string',
            group: 'trust',
            description: 'e.g., "1.200.000 € pro Jahr"',
        }),
        defineField({
            name: 'specialization',
            title: 'Specialization',
            type: 'string',
            group: 'trust',
            initialValue: 'Digitales Marketing für den stationären Einzelhandel',
        }),
        defineField({
            name: 'majorClients',
            title: 'Major Clients',
            type: 'array',
            group: 'relations',
            of: [{ type: 'reference', to: [{ type: 'clientReference' }] }],
        }),
    ],
})
