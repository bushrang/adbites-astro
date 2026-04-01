import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'xqrqkfgr',
    dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'adbites',
    apiVersion: "2024-01-01",
    useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}
