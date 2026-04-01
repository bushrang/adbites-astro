export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'logos',
            title: 'Partner Logos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'logoItem',
                    fields: [
                        { name: 'name', title: 'Logo Name / Alt Text', type: 'string', description: 'Used for accessibility if it is an image.' },
                        { name: 'image', title: 'Logo Image', type: 'image', options: { hotspot: true }, description: 'Upload a PNG/SVG if you have one.' },
                        { name: 'textMarkup', title: 'Text Markup (Fallback)', type: 'string', description: 'e.g., happy<span class="font-normal">♡baby</span>. Used if no image is uploaded.' },
                        { name: 'customClass', title: 'Custom CSS Classes', type: 'string', description: 'e.g., tracking-widest lowercase' },
                    ],
                },
            ],
            description: 'Logos displayed in the scrolling banner below the Hero section.',
        },
        {
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            description: 'e.g., "🚀 V2.0 ist jetzt verfügbar"',
        },
        {
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'string',
            description: 'The main H1 title.',
        },
        {
            name: 'heroSubline',
            title: 'Hero Subline',
            type: 'text',
            rows: 3,
            description: 'The descriptive paragraph below the headline.',
        },
        {
            name: 'ctaText',
            title: 'Primary Button Text',
            type: 'string',
            description: 'e.g., "Kostenloses Erstgespräch"',
        },
        {
            name: 'trustCount',
            title: 'Trust Count Number',
            type: 'string',
            description: 'e.g., "280+"',
        },
        {
            name: 'trustText',
            title: 'Trust Text description',
            type: 'string',
            description: 'e.g., "Einzelhändler vertrauen uns"',
        },
        {
            name: 'introSection',
            title: 'Intro Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'e.g., "Dein Marketing Ökosystem..."',
                },
                {
                    name: 'subline',
                    title: 'Subline',
                    type: 'text',
                    rows: 4,
                    description: 'The descriptive text block.',
                },
            ],
        },
        {
            name: 'expertiseSection',
            title: 'Avatar Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'e.g., "Lokale Expertise trifft auf einen Mitarbeiter..."',
                },
                {
                    name: 'image',
                    title: 'Section Image',
                    type: 'image',
                    options: { hotspot: true },
                    description: 'The image displayed alongside the text (e.g., the mobile phone mockup).',
                },
                {
                    name: 'contentBlocks',
                    title: 'Content Blocks',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'leadIn', title: 'Bold Lead-In Text', type: 'string', description: 'e.g., "Echte Handelserfahrung statt Theorie."' },
                                { name: 'text', title: 'Main Text', type: 'text', rows: 4 },
                            ],
                        },
                    ],
                    description: 'The paragraphs of text displayed next to the image.',
                },
                {
                    name: 'screenVideo',
                    title: 'Screen Video (Underlay)',
                    type: 'file',
                    options: {
                        accept: 'video/mp4',
                    },
                    description: 'Upload an MP4 video to play under the transparent screen of the image.',
                },
            ],
        },
        {
            name: 'servicesSection',
            title: 'Services Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'e.g., "Ein Partner. Alle Kanäle..."',
                },
                {
                    name: 'subline',
                    title: 'Subline',
                    type: 'text',
                    rows: 3,
                    description: 'The descriptive text block.',
                },
                {
                    name: 'cards',
                    title: 'Service Cards',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'badge', title: 'Badge (2 chars)', type: 'string' },
                                { name: 'title', title: 'Card Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 4 },
                                {
                                    name: 'checklist',
                                    title: 'Checklist Items',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'testimonialsSection',
            title: 'Testimonials Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'e.g., "Zufriedene Händler"',
                },
                {
                    name: 'subline',
                    title: 'Subline',
                    type: 'text',
                    rows: 3,
                    description: 'The descriptive text block.',
                },
                {
                    name: 'testimonials',
                    title: 'Testimonials',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'company', title: 'Company Name', type: 'string' },
                                { name: 'accentColor', title: 'Accent Color Class', type: 'string', description: 'e.g. text-green-400' },
                                { name: 'rating', title: 'Rating', type: 'string', initialValue: '4.9' },
                                { name: 'text', title: 'Quote Text', type: 'text', rows: 4 },
                                { name: 'author', title: 'Author Name', type: 'string' },
                                { name: 'role', title: 'Author Role', type: 'string' },
                                { name: 'rotation', title: 'Rotation Class', type: 'string', description: 'e.g. -rotate-2' },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            name: 'teamSection',
            title: 'Team Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'Use HTML tags like <br/> and <span class="text-brand-primary"> for styling.',
                },
                {
                    name: 'members',
                    title: 'Team Members',
                    type: 'array',
                    of: [{ type: 'reference', to: { type: 'person' } }],
                },
            ],
        },
        {
            name: 'casesSection',
            title: 'Cases Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'e.g., "Echte Ergebnisse"',
                },
                {
                    name: 'subline',
                    title: 'Subline',
                    type: 'text',
                    rows: 3,
                    description: 'Intro text for the cases section.',
                },
                {
                    name: 'cases',
                    title: 'Selected Cases',
                    type: 'array',
                    of: [{ type: 'reference', to: { type: 'caseStudy' } }],
                    validation: (Rule: any) => Rule.max(3).warning('Best to stick to 3 cases for the grid.'),
                },
            ],
        },
        {
            name: 'proofOfConceptSection',
            title: 'Proof of Concept Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'Use <br /> for line breaks. e.g. "Funktioniert das wirklich? <br /> Hier sind die Daten."',
                },
                {
                    name: 'cases',
                    title: 'Cases',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', title: 'Case Title', type: 'string', description: 'e.g., "Der Mode-Händler"' },
                                { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
                                { name: 'badge', title: 'Badge Text', type: 'string', description: 'e.g., "Fokus: Frequenz-Steigerung"' },
                                { name: 'challenge', title: 'Challenge', type: 'text', rows: 3 },
                                { name: 'solution', title: 'Solution', type: 'text', rows: 3 },
                                {
                                    name: 'metrics',
                                    title: 'Metrics',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                { name: 'value', title: 'Metric Value', type: 'string', description: 'e.g., "+142"' },
                                                { name: 'label', title: 'Metric Label', type: 'string', description: 'e.g., "Eingelöste Gutscheine (in 4 Wochen)"' },
                                            ]
                                        }
                                    ],
                                    validation: (Rule: any) => Rule.max(2).warning('Exactly 2 metrics look best.')
                                },
                                { name: 'linkText', title: 'Link Text', type: 'string', description: 'e.g., "Ganze Fallstudie lesen"' }
                            ]
                        }
                    ]
                }
            ],
        },
        {
            name: 'founderDemoSection',
            title: 'Founder Demo Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'Main headline. Use <br/> for line breaks and <span class="text-white"> for emphasis.',
                },
                {
                    name: 'subline',
                    title: 'Subline',
                    type: 'text',
                    description: 'Supporting description text below the headline.',
                },
                {
                    name: 'videoUrl',
                    title: 'YouTube Video URL',
                    type: 'url',
                    description: 'The full URL of the YouTube video to embed (e.g., https://www.youtube.com/watch?v=...)',
                }
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'multiWorkspaceSection',
            title: 'ShopPilot Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'Main headline. Use <br/> for line breaks.',
                },
                {
                    name: 'image',
                    title: 'Laptop Platform Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'features',
                    title: 'Features List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', title: 'Feature Title', type: 'string' },
                                { name: 'description', title: 'Feature Description', type: 'text' },
                            ]
                        }
                    ]
                }
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'adbitesAdLift',
            title: 'Adbites AdLift Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    description: 'Main headline. Use <br/> for line breaks.',
                },
                {
                    name: 'subline',
                    title: 'Subline',
                    type: 'text',
                    description: 'Supporting description text at the bottom.',
                },
                {
                    name: 'cards',
                    title: 'Overlapping Cards',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } },
                                { name: 'alt', title: 'Image Alt Text', type: 'string' },
                                { name: 'targetClass', title: 'Positioning Classes', type: 'string', description: 'e.g., "z-10 -rotate-6 lg:-ml-0"' },
                                { name: 'badgeText', title: 'Tooltip Badge Text', type: 'string', description: 'Optional. e.g., "@username"' },
                                { name: 'badgeColor', title: 'Tooltip Badge Color', type: 'string', description: 'Optional. Tailwind class e.g., "bg-blue-500"' },
                                { name: 'badgePosition', title: 'Tooltip Badge Position', type: 'string', description: 'Optional. Tailwind classes e.g., "-top-10 -left-6"' }
                            ]
                        }
                    ],
                    description: 'Images that spread out on scroll. Classes determine final positions.',
                },
                {
                    name: 'logos',
                    title: 'Supported Platforms Logos',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            name: 'logoItem',
                            fields: [
                                { name: 'name', title: 'Logo Name / Alt Text', type: 'string' },
                                { name: 'image', title: 'Logo Image', type: 'image', options: { hotspot: true } },
                                { name: 'textMarkup', title: 'Text Markup (Fallback)', type: 'string' },
                                { name: 'customClass', title: 'Custom CSS Classes', type: 'string' },
                            ],
                        },
                    ],
                    description: 'Logos displayed below the cards (Facebook, Instagram, etc).',
                },
                { name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Join for $9.99/m' },
                { name: 'primaryButtonUrl', title: 'Primary Button URL', type: 'string', initialValue: '#' },
                { name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Read more' },
                { name: 'secondaryButtonUrl', title: 'Secondary Button URL', type: 'string', initialValue: '#' },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        },
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
            ],
        },
    ],
    preview: {
        select: {
            title: 'heroHeadline',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title as string;
            return {
                title: title || 'Homepage',
            };
        },
    },
};
