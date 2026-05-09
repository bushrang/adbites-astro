import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'xqrqkfgr',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'adbites',
  apiVersion: '2023-05-03',
  useCdn: false
});

async function run() {
  const person = await client.fetch(`*[_type == "person" && name == "Thorben Frank"][0]`);
  console.log(JSON.stringify(person, null, 2));
}

run().catch(console.error);
