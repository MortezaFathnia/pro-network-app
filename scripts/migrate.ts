import { db } from '@/lib/db'
import { migrate } from 'drizzle-orm/node-postgres/migrator'


export default async function main() {
    await migrate(db, { migrationsFolder: 'drizzle' })
}

if (require.main === module) {
    main();
}