import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as SQLite from 'expo-sqlite';

import { AudioFile } from '@/constants/audio.const';

interface DownloadDBContextProps {
  addDownloadedAudio: (audio: AudioFile, localUri: string) => void;
  getDownloadedAudios: () => Promise<AudioFile[]>;
  removeDownloadedAudio: (id: string) => void;
}

const DownloadDBContext = createContext<DownloadDBContextProps | undefined>(
  undefined,
);

export const DATABASE_NAME = 'downloads';

export const DownloadedDBProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDbReady, setIsDbReady] = useState(false);
  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await db.execAsync(`CREATE TABLE IF NOT EXISTS ${DATABASE_NAME} (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        metadata_name TEXT NOT NULL,
        author TEXT,
        local_uri TEXT NOT NULL,
        cover_img TEXT,
        thumbhash TEXT,
        last_modified TEXT,
        size INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
      setIsDbReady(true);
    });
  }, [db]);

  const addDownloadedAudio = (audio: AudioFile, localUri: string) => {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `
        INSERT INTO ${DATABASE_NAME} (
        id,
        name,
        metadata_name,
        author,
        local_uri,
        cover_img,
        thumbhash,
        last_modified,
        size
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        audio.metadata.id,
        audio.name,
        audio.metadata.name,
        audio.metadata.author,
        localUri,
        audio.metadata.cover_img,
        audio.metadata.thumbhash ?? '',
        audio.last_modified,
        audio.size,
      );
    });
  };

  const getDownloadedAudios = async () => {
    return db
      .getAllAsync<SqliteAudioFile>(
        `SELECT * FROM ${DATABASE_NAME} ORDER BY created_at DESC;`,
      )
      .then((rows) => rows.map(mapSQLiteToAudioFile));
  };

  const removeDownloadedAudio = (id: string) => {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM ${DATABASE_NAME} WHERE id = ?;`, id);
    });
  };

  return (
    <DownloadDBContext.Provider
      value={{
        addDownloadedAudio,
        getDownloadedAudios,
        removeDownloadedAudio,
      }}
    >
      {isDbReady ? children : null}
    </DownloadDBContext.Provider>
  );
};

export const useDownloadedDB = (): DownloadDBContextProps => {
  const context = useContext(DownloadDBContext);
  if (!context) {
    throw new Error('useSqlite must be used within a SqliteProvider');
  }
  return context;
};

type SqliteAudioFile = {
  id: string;
  name: string;
  author: string;
  cover_img: string;
  thumbhash: string;
  last_modified: string;
  size: number;
  local_uri: string;
};

const mapSQLiteToAudioFile = (row: SqliteAudioFile): AudioFile => {
  return {
    name: row.name,
    size: row.size,
    last_modified: row.last_modified,
    local_uri: row.local_uri,
    metadata: {
      fft: '',
      id: row.id,
      author: row.author,
      name: row.name,
      cover_img: row.cover_img,
      thumbhash: row.thumbhash,
    },
  };
};
