import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";

const DB_NAME = "flowspend.db";
const KEY_NAME = "flowspend_key";

export async function getDatabase() {
  let key = await SecureStore.getItemAsync(KEY_NAME);

  if (!key) {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to setup secure vault",
    });

    if (!auth.success) {
      throw new Error("Authentication failed");
    }

    key = Math.random().toString(36).slice(2);
    await SecureStore.setItemAsync(KEY_NAME, key);
  } else {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock FlowSpend Vault",
    });

    if (!auth.success) {
      throw new Error("Authentication failed");
    }
  }

  const db = SQLite.openDatabaseSync(DB_NAME);

  return db;
}
