import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'xqrqkfgr',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'adbites',
  apiVersion: '2023-05-03',
  useCdn: false
});

async function run() {
  const persons = await client.fetch(`*[_type == "person"]{ _id, _type, name, role, _rev, _createdAt, _updatedAt, "isDraft": _id in path("drafts.**") }`);
  console.log(JSON.stringify(persons, null, 2));
}

run().catch(console.error);
