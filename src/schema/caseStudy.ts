export default {
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        {
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'projectImage',
            title: 'Project Image',
            type: 'image',
            description: 'A dedicated image for the cases overview card (e.g. screenshot or photo).',
            options: { hotspot: true },
        },
        {
            name: 'video',
            title: 'Case Video',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        },
        {
            name: 'challenge',
            title: 'The Challenge (Problem)',
            type: 'text',
            rows: 3,
        },
        {
            name: 'solution',
            title: 'The Solution (Intervention)',
            type: 'text',
            rows: 3,
        },
        {
            name: 'results',
            title: 'Success Metrics (Results)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'metric', title: 'Metric (e.g. ROAS)', type: 'string' },
                        { name: 'value', title: 'Value (e.g. +45%)', type: 'string' },
                    ],
                }
            ],
        },
        {
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'service' } }],
        },
        {
            name: 'logo',
            title: 'Client Logo',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'spotlightHeadline',
            title: 'Spotlight Headline',
            description: 'Headline for the Deep Dive / Spotlight section (e.g. "How Client X finished 2 weeks work in 2 hours")',
            type: 'string',
        },
        {
            name: 'spotlightDescription',
            title: 'Spotlight Description',
            description: 'Main text for the Deep Dive section (replaces Challenge/Solution split)',
            type: 'text',
            rows: 6,
        },
        {
            name: 'quoteText',
            title: 'Quote Text',
            type: 'text',
            rows: 3,
        },
        {
            name: 'quoteAuthor',
            title: 'Quote Author',
            type: 'string',
        },
        {
            name: 'quoteAuthorRole',
            title: 'Quote Author Role',
            type: 'string',
        },
        {
            name: 'quoteAuthorImage',
            title: 'Quote Author Image',
            type: 'image',
        },
    ],
};
