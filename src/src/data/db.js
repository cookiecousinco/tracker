// IndexedDB setup using a lightweight wrapper
// Database: cookiecousinDB
// Stores: inventory, batches, sales, expenses

const DB_NAME = "cookiecousinDB";
const DB_VERSION = 1;
let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db);

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const dbInstance = e.target.result;

      if (!dbInstance.objectStoreNames.contains("inventory")) {
        dbInstance.createObjectStore("inventory", { keyPath: "id", autoIncrement: true });
      }

      if (!dbInstance.objectStoreNames.contains("batches")) {
        dbInstance.createObjectStore("batches", { keyPath: "id", autoIncrement: true });
      }

      if (!dbInstance.objectStoreNames.contains("sales")) {
        dbInstance.createObjectStore("sales", { keyPath: "id", autoIncrement: true });
      }

      if (!dbInstance.objectStoreNames.contains("expenses")) {
        dbInstance.createObjectStore("expenses", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };

    request.onerror = (e) => reject(e);
  });
}

export function addData(storeName, data) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(true);
      request.onerror = (e) => reject(e);
    });
  });
}

export function getAllData(storeName) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e);
    });
  });
}

export function deleteData(storeName, id) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = (e) => reject(e);
    });
  });
}

export function updateData(storeName, data) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(true);
      request.onerror = (e) => reject(e);
    });
  });
}
