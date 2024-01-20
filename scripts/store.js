// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

import { debugMsg, logLevel } from './debug.js';

window.addEventListener("DOMContentLoaded", async () => {
  const dbName = "BlankDB";
  const storeName = "records";
  const primaryKey = "id";
  const itemsClass = "storable";
  const saveInterval = 30000;

  function save(db, items) {
    debugMsg('save');
    const transaction = db.transaction(storeName, "readwrite");
    transaction.oncomplete = () => {
      debugMsg('save - transaction complete', logLevel.debug);
    };
    transaction.onerror = () => {
      debugMsg(`save - transaction failed with error: ${transaction.error}`, logLevel.error);
    };
    const objectStore = transaction.objectStore(storeName);
    for (let item of items) {
      const getRequest = objectStore.get(item.id);
      getRequest.onerror = (event) => {
        debugMsg(`save - retriving ${item.id} failed with error: ${getRequest.error}`, logLevel.error);
      };
      getRequest.onsuccess = (event) => {
        const savedItem = event.target.result;
        if (savedItem && savedItem.text === item.innerText) {
          debugMsg(`save - ${item.id} not changed`, logLevel.debug);
          return;
        }
        const newItem = { id: item.id, time: Date.now(), text: item.innerText };
        const updateRequest = objectStore.put(newItem);
        updateRequest.onerror = (event) => {
          debugMsg(`save - updating ${item.id} failed with error: ${updateRequest.error}`, logLevel.error);
        };
        updateRequest.onsuccess = (event) => {
          debugMsg(`save - ${item.id}: ${newItem.text}`, logLevel.debug);
        };
      };
    }
  }
  
  function load(db) {
    debugMsg('load');
    const objectStore = db.transaction(storeName).objectStore(storeName);
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (!cursor) {
        debugMsg('load - no more data', logLevel.debug);
        return;
      }
      const item = document.getElementById(cursor.key);
      if (item) {
        item.innerText = cursor.value.text;
        debugMsg(`load - ${item.id}: ${item.innerText}`, logLevel.debug);
      } else {
        debugMsg(`load - no item ${cursor.key} found`, logLevel.error);
      }
      cursor.continue();
    };
  }
  
  const items = document.getElementsByClassName(itemsClass);
  let db;

  debugMsg('Starting IndexedDB operations');
  const request = indexedDB.open(dbName);
  request.onerror = (event) => {
    debugMsg(`IndexedDB usage error: ${event.target.errorCode}`, logLevel.error);
  };
  request.onupgradeneeded = (event) => {
    debugMsg('IndexedDB upgrade needed', logLevel.debug);
    const db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: primaryKey });
    objectStore.transaction.oncomplete = (event) => {
      debugMsg('IndexedDB schema upgraded', logLevel.debug);
      save(db, items);
    };
  };
  request.onsuccess = (event) => {
    debugMsg('IndexedDB opened successfully', logLevel.debug);
    db = event.target.result;
    load(db);
  };
  request.onblocked = (event) => {
    debugMsg('IndexedDB blocked', logLevel.error);
  };
  request.onclose = (event) => {
    debugMsg('IndexedDB closed', logLevel.debug);
    db=null;
  };

  for (let item of items) {
    item.addEventListener("blur", function(event) {
      const item = event.target;
      debugMsg(`Blurred: ${item.innerText}`, logLevel.debug);
      save(db, [item]);
    });
  }

  setInterval(() => {
    save(db, items);
  }, saveInterval);
});
