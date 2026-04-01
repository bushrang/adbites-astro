import { defineType, defineArrayMember } from 'sanity'

export default defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{ title: 'Bullet', value: 'bullet' }],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                            },
                        ],
                    },
                    {
                        title: 'Entity',
                        name: 'entity',
                        type: 'object',
                        fields: [
                            {
                                name: 'type',
                                title: 'Type',
                                type: 'string',
                                options: {
                                    list: [
                                        { title: 'Technology', value: 'tech' },
                                        { title: 'Regulation', value: 'regulation' },
                                        { title: 'Generic Entity', value: 'entity' },
                                    ],
                                }
                            }
                        ]
                    }
                ],
            },
        }),
        defineArrayMember({
            type: 'image',
            options: { hotspot: true },
        }),
        defineArrayMember({
            type: 'table',
        }),
        defineArrayMember({
            name: 'callout',
            type: 'object',
            title: 'Callout / Highlight',
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    title: 'Callout Text',
                    validation: Rule => Rule.required()
                },
                {
                    name: 'tone',
                    type: 'string',
                    title: 'Tone',
                    options: {
                        list: [
                            { title: 'Brand (Primary)', value: 'brand' },
                            { title: 'Info (Blue)', value: 'info' },
                            { title: 'Success (Green)', value: 'success' },
                            { title: 'Warning (Orange)', value: 'warning' },
                        ],
                        layout: 'radio'
                    },
                    initialValue: 'brand'
                }
            ],
            preview: {
                select: {
                    title: 'text',
                    subtitle: 'tone'
                },
                prepare(selection) {
                    const { title, subtitle } = selection;
                    return {
                        title: title || 'Empty callout',
                        subtitle: `Callout (${subtitle})`
                    };
                }
            }
        }),
    ],
})
