import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'service',
    title: 'Service (Entity)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Service Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
                defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
                defineField({ name: 'keywords', title: 'Focus Keywords', type: 'array', of: [{ type: 'string' }] }),
            ],
        }),
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({ name: 'headline', title: 'Headline', type: 'string' }),
                defineField({ name: 'subline', title: 'Subline', type: 'text', rows: 2 }),
                defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
            ],
        }),
        defineField({
            name: 'content',
            title: 'Page Content',
            type: 'blockContent',
        }),
        defineField({
            name: 'focus',
            title: 'Focus Area',
            type: 'string',
            description: 'Main focus topic (e.g. Stationärer Einzelhandel) for AI weighting.',
        }),
        defineField({
            name: 'kpis',
            title: 'Key Performance Indicators',
            type: 'object',
            fields: [
                defineField({ name: 'managedSpend', title: 'Managed Spend', type: 'string', description: 'e.g. > 1,2 Mio. € p.a.' }),
                defineField({ name: 'roi', title: 'Average ROI', type: 'string' }),
            ],
        }),
        defineField({
            name: 'caseStudies',
            title: 'Case Studies',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
        }),
        defineField({
            name: 'spotlightCaseStudy',
            title: 'Spotlight Case Study',
            description: 'Select one case study to highlight in the deep-dive section.',
            type: 'reference',
            to: [{ type: 'caseStudy' }],
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'faqItem',
                    title: 'FAQ Item',
                    fields: [
                        { name: 'question', title: 'Question', type: 'string' },
                        { name: 'answer', title: 'Answer', type: 'text', rows: 4 },
                    ],
                },
            ],
        }),
        defineField({
            name: 'managedBy',
            title: 'Managed By',
            type: 'reference',
            to: [{ type: 'person' }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'SEO (Search Engine Optimization)', value: 'SEO' },
                    { title: 'GEO (Generative Engine Optimization)', value: 'GEO' },
                    { title: 'AI Agent Integration', value: 'AI-Agent' },
                ],
            },
        }),
        defineField({
            name: 'technicalSpecs',
            title: 'Technical Specifications',
            type: 'object',
            fields: [
                defineField({ name: 'frameworks', title: 'Frameworks/Tools', type: 'string' }),
                defineField({ name: 'deliverables', title: 'Key Deliverables', type: 'string' }),
            ],
        }),
        defineField({
            name: 'priceRange',
            title: 'Price Range',
            type: 'string',
            options: {
                list: [
                    { title: 'Standard (€)', value: '€' },
                    { title: 'Business (€€)', value: '€€' },
                    { title: 'Premium (€€€)', value: '€€€' },
                ],
            },
        }),
        defineField({
            name: 'llmsDescription',
            title: 'LLM Description (AI Index)',
            type: 'text',
            rows: 4,
            description: 'Factual, entity-rich 1–2 sentence description for AI crawlers (llms.txt, .md pages). If set, this overrides the SEO meta description in all AI-facing outputs. Write what the service IS, not marketing copy.',
        }),
    ],
});
