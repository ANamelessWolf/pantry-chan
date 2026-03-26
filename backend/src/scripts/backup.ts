import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import mongoose from 'mongoose';
import { EJSON } from 'bson';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = 'pantry';
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27019';
const MEDIA_DIR = path.resolve(__dirname, '../../media');
const BACKUPS_DIR = path.resolve(__dirname, '../../backups');

async function backup() {
  const timestamp = new Date()
    .toISOString()
    .replace('T', '_')
    .replace(/:/g, '-')
    .slice(0, 19);
  const backupName = `pantry_backup_${timestamp}`;
  const zipPath = path.join(BACKUPS_DIR, `${backupName}.zip`);

  console.log(`Connecting to ${MONGO_URI}...`);
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });

  const db = mongoose.connection.db!;
  const collectionInfos = await db.listCollections().toArray();

  console.log('Exporting collections...');
  const collectionData: Record<string, string> = {};
  for (const info of collectionInfos) {
    const docs = await db.collection(info.name).find({}).toArray();
    collectionData[info.name] = EJSON.stringify(docs, { relaxed: false });
    console.log(`  -> ${info.name} (${docs.length} docs)`);
  }

  await mongoose.disconnect();

  fs.mkdirSync(BACKUPS_DIR, { recursive: true });

  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    for (const [colName, json] of Object.entries(collectionData)) {
      archive.append(json, { name: `${backupName}/db/${colName}.json` });
    }

    if (fs.existsSync(MEDIA_DIR)) {
      archive.directory(MEDIA_DIR, `${backupName}/media`);
    } else {
      console.log('Warning: media directory not found, skipping.');
    }

    archive.finalize();
  });

  console.log(`Backup saved: ${zipPath}`);
}

backup().catch((err) => {
  console.error(err);
  process.exit(1);
});
