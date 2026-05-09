import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function unlockPersons() {
  // Fetch all persons that have the _system field (which makes them read-only/managed)
  const persons = await client.fetch(`*[_type == "person" && defined(_system)]`)
  
  if (persons.length === 0) {
    console.log('No locked persons found!')
    return
  }

  console.log(`Found ${persons.length} locked persons. Unlocking...`)

  for (const person of persons) {
    try {
      console.log(`Unlocking ${person.name}...`)
      await client
        .patch(person._id)
        .unset(['_system']) // This strips the sync lock
        .commit()
      console.log(`✅ Successfully unlocked ${person.name}`)
    } catch (err) {
      console.error(`❌ Failed to unlock ${person.name}:`, err.message)
    }
  }
}

unlockPersons().catch(console.error)
