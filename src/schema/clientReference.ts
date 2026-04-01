import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'clientReference',
    title: 'Client Reference',
    type: 'document',
    fields: [
        defineField({
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
        }),
        defineField({
            name: 'projectTitle',
            title: 'Project Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'logo',
            title: 'Client Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
        }),
    ],
})
