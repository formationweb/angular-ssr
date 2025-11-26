Écriture dans un object store

```ts
const request = indexedDB.open('myDb', 1);

request.onsuccess = () => {
  const db = request.result;
  
  const tx = db.transaction(['articles'], 'readwrite');
  const store = tx.objectStore('articles');

  const items = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' }
  ];

  items.forEach(item => store.put(item));

  tx.oncomplete = () => {
    console.log('Données enregistrées');
  };

  tx.onerror = () => {
    console.error('Erreur transaction', tx.error);
  };
};
```

Lecture de tous les éléments

```ts
const request = indexedDB.open('myDb', 1);

request.onsuccess = () => {
  const db = request.result;

  const tx = db.transaction(['articles'], 'readonly');
  const store = tx.objectStore('articles');

  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = () => {
    console.log('Éléments récupérés :', getAllRequest.result);
  };

  getAllRequest.onerror = () => {
    console.error('Erreur lecture', getAllRequest.error);
  };
};
```