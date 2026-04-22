export default {
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Internal Title',
            type: 'string',
            description: 'For internal reference inside Sanity.',
        },
        {
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            description: 'e.g., "lokaler-shop-pilot". Determines the URL: /produkte/lokaler-shop-pilot',
        },
        {
            name: 'heroSection',
            title: 'Hero Section (50:50 Grid)',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline (H1)', type: 'string', description: 'Main headline for the product page.' },
                { name: 'subline', title: 'Subheadline', type: 'text', rows: 3 },
                { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } },
                { name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', description: 'Optional: Leaves button hidden if empty.' },
                { name: 'primaryButtonUrl', title: 'Primary Button URL', type: 'string', description: 'Usually an anchor link like "#contact" or a real URL.' },
                { 
                    name: 'trustLogos', 
                    title: 'Optional Integration/Platform Icons (under Button)', 
                    type: 'array', 
                    of: [{ type: 'image' }], 
                    description: 'E.g. Facebook, Instagram, Google Ads icons. Displayed below the primary button.'
                },
            ],
        },
        {
            name: 'introSection',
            title: 'Intro Section',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string', description: 'Centered headline' },
                { name: 'subline', title: 'Intro Text', type: 'text', rows: 4, description: 'Short intro text appearing below the headline' },
            ],
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'logos',
            title: 'Partner / Trust Logos (Marquee)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Logo Name / Alt Text', type: 'string' },
                        { name: 'image', title: 'Logo Image', type: 'image', options: { hotspot: true } },
                        { name: 'textMarkup', title: 'Text Markup (Fallback)', type: 'string' },
                        { name: 'customClass', title: 'Custom CSS Classes', type: 'string' },
                    ],
                },
            ],
            description: 'Logos displayed in the scrolling banner below the Hero section.',
        },
        {
            name: 'featureSections',
            title: 'Feature Sections (3 to 5 recommended)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'badge', title: 'Badge / Eyecatcher', type: 'string' },
                        { name: 'headline', title: 'Feature Headline', type: 'string' },
                        { name: 'text', title: 'Feature Description Text', type: 'array', of: [{ type: 'block' }] },
                        { name: 'image', title: 'Feature Image / Graphic', type: 'image', options: { hotspot: true } },
                        { name: 'buttonText', title: 'Optional Button Text', type: 'string' },
                        { name: 'buttonUrl', title: 'Optional Button URL', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'visualSection',
            title: 'Visual Section (Interactive Designs)',
            type: 'object',
            fields: [
                {
                    name: 'designType',
                    title: 'Design Layout Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Design 1: Social Media Fan Out', value: 'design-1-social-fan-out' },
                            { title: 'Design 2: (Coming Soon)', value: 'design-2' },
                            { title: 'Design 3: (Coming Soon)', value: 'design-3' }
                        ],
                    },
                    initialValue: 'design-1-social-fan-out',
                },
                {
                    name: 'socialFanOutData',
                    title: 'Social Fan Out Setup',
                    type: 'object',
                    hidden: ({ parent }: any) => parent?.designType !== 'design-1-social-fan-out',
                    fields: [
                        { name: 'headline', title: 'Headline', type: 'string' },
                        { name: 'subline', title: 'Subheadline', type: 'text', rows: 3 },
                        { 
                            name: 'centerPhoneImage', 
                            title: 'Center Phone Inner Image', 
                            type: 'image', 
                            options: { hotspot: true } 
                        },
                        {
                            name: 'fanCards',
                            title: 'Background Fan Cards',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }]
                        }
                    ],
                    options: { collapsible: true, collapsed: false }
                }
            ],
            options: { collapsible: true, collapsed: true }
        },
        {
            name: 'successNumbersSection',
            title: 'Success Numbers Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Headline', type: 'string' },
                {
                    name: 'metrics',
                    title: 'Metrics Array (Max 4)',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'topLabel', title: 'Top Label', type: 'string' },
                                { name: 'value', title: 'Big Value', type: 'string' },
                                { name: 'bottomLabel', title: 'Bottom Label', type: 'string' }
                            ]
                        }
                    ],
                    validation: (Rule: any) => Rule.max(4)
                },
                { name: 'mascotImage', title: 'Mascot Image', type: 'image', options: { hotspot: true } }
            ],
            options: { collapsible: true, collapsed: true }
        },
        {
            name: 'casesSection',
            title: 'Cases Section',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Echte Ergebnisse für echte Kunden' },
                { name: 'subline', title: 'Subline', type: 'text', rows: 3 },
                {
                    name: 'cases',
                    title: 'Selected Cases',
                    type: 'array',
                    of: [{ type: 'reference', to: { type: 'caseStudy' } }],
                    validation: (Rule: any) => Rule.max(3).warning('Best to stick to max 3 cases.'),
                },
            ],
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'clientLogoGridSection',
            title: 'Client Logo Grid Section',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string', initialValue: 'Kunden, die auf uns vertrauen' },
                { name: 'subline', title: 'Subline', type: 'text', rows: 2 },
                {
                    name: 'logos',
                    title: 'Client Logos',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'image', title: 'Logo Image', type: 'image', options: { hotspot: true } },
                                { name: 'altText', title: 'Alt Text / Company Name', type: 'string' }
                            ]
                        }
                    ]
                }
            ],
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'faqSection',
            title: 'FAQ Section',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Left Headline', type: 'string', initialValue: 'Fragen?\nLassen Sie uns das klären.' },
                { name: 'sublines', title: 'Left Description Paragraphs', type: 'array', of: [{ type: 'string' }] },
                {
                    name: 'faqs',
                    title: 'FAQs List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'question', title: 'Question', type: 'string' },
                                { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
                            ],
                        },
                    ],
                },
            ],
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'ctaSection',
            title: 'Call To Action Section',
            type: 'object',
            fields: [
                { name: 'headline', title: 'CTA Headline', type: 'string' },
                { name: 'description', title: 'CTA Description', type: 'text', rows: 3 },
                { name: 'buttonText', title: 'Button Text', type: 'string' },
                { name: 'buttonUrl', title: 'Button URL', type: 'string' },
                { name: 'trustText', title: 'Trust Under Button', type: 'string' },
            ],
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
            ],
            options: { collapsible: true, collapsed: true },
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
};
