import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

function createDb() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    return null
  }
  try {
    const client = postgres(connectionString, { prepare: false })
    return drizzle(client, { schema })
  } catch {
    return null
  }
}

export const db = createDb()
export { schema }
