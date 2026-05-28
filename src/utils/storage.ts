import { openDB, DBSchema, IDBPDatabase } from 'idb'
import { Script } from '../types'

interface TeleprompterDB extends DBSchema {
  scripts: {
    key: string
    value: Script
    indexes: { 'by-date': number }
  }
}

let db: IDBPDatabase<TeleprompterDB> | null = null

async function getDB() {
  if (!db) {
    db = await openDB<TeleprompterDB>('teleprompter-db', 1, {
      upgrade(db) {
        const scriptStore = db.createObjectStore('scripts', { keyPath: 'id' })
        scriptStore.createIndex('by-date', 'updatedAt')
      },
    })
  }
  return db
}

export async function getScripts(): Promise<Script[]> {
  const database = await getDB()
  const scripts = await database.getAllFromIndex('scripts', 'by-date')
  return scripts.reverse()
}

export async function getScript(id: string): Promise<Script | undefined> {
  const database = await getDB()
  return database.get('scripts', id)
}

export async function saveScript(script: Script): Promise<void> {
  const database = await getDB()
  await database.put('scripts', script)
}

export async function deleteScript(id: string): Promise<void> {
  const database = await getDB()
  await database.delete('scripts', id)
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
