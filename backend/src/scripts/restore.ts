import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import mongoose from 'mongoose';
import { EJSON } from 'bson';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = 'pantry';
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27019';
const MEDIA_DIR = path.resolve(__dirname, '../../media');

async function restore() {
  const zipPath = process.argv[2];

  if (!zipPath) {
    console.error('Usage: npm run db:restore -- <path/to/backup.zip>');
    process.exit(1);
  }

  const resolvedZip = path.resolve(zipPath);
  if (!fs.existsSync(resolvedZip)) {
    console.error(`Error: File not found: ${resolvedZip}`);
    process.exit(1);
  }

  console.log(`Extracting ${resolvedZip}...`);
  const zip = new AdmZip(resolvedZip);
  const entries = zip.getEntries();

  // Find the top-level backup folder name from the zip
  const topFolder = entries[0]?.entryName.split('/')[0];
  if (!topFolder) {
    console.error('Error: Empty or invalid zip file.');
    process.exit(1);
  }

  // Load all DB json entries into memory
  const dbEntries = entries.filter(
    (e) => e.entryName.startsWith(`${topFolder}/db/`) && e.entryName.endsWith('.json')
  );
  const mediaEntries = entries.filter(
    (e) => e.entryName.startsWith(`${topFolder}/media/`) && !e.isDirectory
  );

  console.log(`Connecting to ${MONGO_URI}...`);
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  const db = mongoose.connection.db!;

  console.log('Restoring collections...');
  for (const entry of dbEntries) {
    const colName = path.basename(entry.entryName, '.json');
    const docs = EJSON.parse(entry.getData().toString('utf8')) as object[];

    await db.collection(colName).drop().catch(() => {});
    if (docs.length > 0) {
      await db.collection(colName).insertMany(docs);
    }
    console.log(`  -> ${colName} (${docs.length} docs)`);
  }

  await mongoose.disconnect();

  console.log('Restoring media...');
  fs.rmSync(MEDIA_DIR, { recursive: true, force: true });
  fs.mkdirSync(MEDIA_DIR, { recursive: true });

  for (const entry of mediaEntries) {
    const relativePath = entry.entryName.slice(`${topFolder}/media/`.length);
    const destPath = path.join(MEDIA_DIR, relativePath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, entry.getData());
  }

  console.log('Restore complete.');
}

restore().catch((err) => {
  console.error(err);
  process.exit(1);
});
