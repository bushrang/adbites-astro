import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'person' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessiblity.',
                    options: {
                        isHighlighted: true,
                    },
                },
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (rule) => rule.required(),
            initialValue: () => new Date().toISOString()
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'A short summary of the post for the blog index page.',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
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
            description: 'Optional FAQs that will be displayed at the bottom of the article and injected as JSON-LD schema for SEO.',
        }),
        defineField({
            name: 'sources',
            title: 'Sources',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'sourceItem',
                    title: 'Source Item',
                    fields: [
                        { name: 'title', title: 'Source Title', type: 'string', validation: Rule => Rule.required() },
                        { name: 'url', title: 'Source URL', type: 'url', validation: Rule => Rule.required() }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'url'
                        }
                    }
                }
            ],
            description: 'Optional sources that will appear at the bottom of the article with proper SEO/GEO <cite> tags.',
        }),
        // SEO Fields
        defineField({
            title: 'SEO Setup',
            name: 'seoGroup',
            type: 'object',
            options: { collapsible: true, collapsed: false },
            fields: [
                defineField({
                    name: 'seoTitle',
                    title: 'SEO Title',
                    type: 'string',
                    description: 'Optional. Override the default title for search engines.',
                }),
                defineField({
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Recommended limit is 155 characters.',
                    validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
                }),
                defineField({
                    name: 'canonicalUrl',
                    title: 'Canonical URL',
                    type: 'url',
                    description: 'Optional. If this post was originally published elsewhere.',
                })
            ]
        })
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
