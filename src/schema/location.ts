export default {
    name: 'location',
    title: 'Location (DACH)',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'City Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'zip',
            title: 'ZIP Code (PLZ)',
            type: 'string',
        },
        {
            name: 'context',
            title: 'GEO Context',
            description: 'Why is this location strategically important? (AI Context)',
            type: 'text',
        },
        {
            name: 'competitors',
            title: 'Local Competitors',
            description: 'List of known competitors in this area for analysis.',
            type: 'array',
            of: [{ type: 'string' }],
        },
    ],
};
