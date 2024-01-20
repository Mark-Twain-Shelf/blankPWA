// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

window.addEventListener("DOMContentLoaded", async () => {
  const dbName = "BlankDB";
  const storeName = "records";
  const primaryKey = "id";
  const itemsClass = "storable";
  const saveInterval = 30000;

  function save(db, items) {
    console.log('save');
    const transaction = db.transaction(storeName, "readwrite");
    transaction.oncomplete = () => {
      console.log('save - transaction complete');
    };
    transaction.onerror = () => {
      console.error(`save - transaction failed with error: ${transaction.error}`);
    };
    const objectStore = transaction.objectStore(storeName);
    for (let item of items) {
      const getRequest = objectStore.get(item.id);
      getRequest.onerror = (event) => {
        console.error(`save - retriving ${item.id} failed with error: ${getRequest.error}`);
      };
      getRequest.onsuccess = (event) => {
        const savedItem = event.target.result;
        if (savedItem && savedItem.text === item.innerText) {
          console.debug(`save - ${item.id} not changed`);
          return;
        }
        const newItem = { id: item.id, time: Date.now(), text: item.innerText };
        const updateRequest = objectStore.put(newItem);
        updateRequest.onerror = (event) => {
          console.error(`save - updating ${item.id} failed with error: ${updateRequest.error}`);
        };
        updateRequest.onsuccess = (event) => {
          console.debug(`save - ${item.id}: ${newItem.text}`);
        };
      };
    }
  }
  
  function load(db) {
    console.log('load');
    const objectStore = db.transaction(storeName).objectStore(storeName);
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (!cursor) {
        console.debug('load - no more data');
        return;
      }
      const item = document.getElementById(cursor.key);
      if (item) {
        if (!item.innerText) {
          item.innerText = cursor.value.text;
          console.debug(`load - ${item.id}: ${item.innerText}`);
        } else {
          console.debug(`load - ${item.id}: has already been edited`);
        }
      } else {
        console.error(`load - no item ${cursor.key} found`);
      }
      cursor.continue();
    };
  }
  
  const items = document.getElementsByClassName(itemsClass);
  let db;

  console.log('Starting IndexedDB operations');
  const request = indexedDB.open(dbName);
  request.onerror = (event) => {
    console.error(`IndexedDB usage error: ${event.target.errorCode}`);
  };
  request.onupgradeneeded = (event) => {
    console.debug('IndexedDB upgrade needed');
    const db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: primaryKey });
    objectStore.transaction.oncomplete = (event) => {
      console.debug('IndexedDB schema upgraded');
      save(db, items);
    };
  };
  request.onsuccess = (event) => {
    console.debug('IndexedDB opened successfully');
    db = event.target.result;
    load(db);
  };
  request.onblocked = (event) => {
    console.error('IndexedDB blocked');
  };
  request.onclose = (event) => {
    console.debug('IndexedDB closed');
    db=null;
  };

  for (let item of items) {
    item.addEventListener("blur", function(event) {
      const item = event.target;
      console.debug(`Blurred: ${item.innerText}`);
      save(db, [item]);
    });
  }

  setInterval(() => {
    save(db, items);
  }, saveInterval);
});
