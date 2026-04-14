import { defineType } from 'sanity';

export default defineType({
    name: 'legalPage',
    title: 'Legal Pages (Impressum, Datenschutz)',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            description: 'URL path, e.g. "impressum" or "datenschutz".',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'The main text for the page.',
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
        },
    },
});
