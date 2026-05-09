import { createClient } from '@sanity/client';

// Use write token if needed, but if the local environment is authenticated, we might need a token.
// Astro project usually only has read token in env. Let's see if we can patch it using the default token if it exists in the system or if we can prompt the user to run it.
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'xqrqkfgr',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'adbites',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_AUTH_TOKEN || undefined // We will see if it fails
});

async function run() {
  const persons = await client.fetch(`*[_type == "person" && defined(_system)]`);
  console.log(`Found ${persons.length} locked persons.`);
  
  if (persons.length === 0) return;

  for (const p of persons) {
    try {
      console.log(`Unlocking ${p.name}...`);
      await client.patch(p._id).unset(['_system']).commit();
      console.log(`Successfully unlocked ${p.name}`);
    } catch (e) {
      console.error(`Failed to unlock ${p.name}:`, e.message);
    }
  }
}

run().catch(console.error);
