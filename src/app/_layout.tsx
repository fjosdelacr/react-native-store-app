import { Stack } from "expo-router";
import { ThemeProvider } from "@/core/contexts/theme.context";
import { SQLiteProvider, SQLiteDatabase } from "expo-sqlite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );`);
};

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SQLiteProvider databaseName="store.db" onInit={initDatabase}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SQLiteProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
