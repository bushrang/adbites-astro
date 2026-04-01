import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import type { StructureBuilder } from 'sanity/structure';
import { table } from '@sanity/table';
import { schemaTypes } from './src/schema';

// Use environment variables or fallbacks
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'xqrqkfgr';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'adbites';

export default defineConfig({
    name: 'adbites-studio',
    title: 'Adbites GEO Graph',
    projectId,
    dataset,
    basePath: '/studio',
    plugins: [
        table(),
        structureTool({
            structure: (S: StructureBuilder) =>
                S.list()
                    .title('Content')
                    .items([
                        // Singleton: Organization
                        S.listItem()
                            .title('Organization')
                            .id('organization')
                            .child(
                                S.document()
                                    .schemaType('organization')
                                    .documentId('organization')
                            ),
                        // Regular documents, filtered to exclude the singleton
                        ...S.documentTypeListItems().filter(
                            (listItem) => !['organization'].includes(listItem.getId() as string)
                        ),
                    ]),
        }),
    ],
    schema: {
        types: schemaTypes,
    },
});
