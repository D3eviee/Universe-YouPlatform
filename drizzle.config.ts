import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'server/schema.ts', // 👈 Zmień na ścieżkę, gdzie trzymasz definicje tabel
  out: '/drizzle',             // 👈 Folder, do którego wygenerują się pliki migracji SQL
  dialect: 'postgresql',        // 👈 Wybierz swój silnik: 'postgresql', 'mysql' lub 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Link do Twojej bazy danych
  },
  verbose: true,
  strict: true,
});