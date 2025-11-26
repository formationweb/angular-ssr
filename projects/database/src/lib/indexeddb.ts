import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IndexedDbService {
    private readonly dbName = 'myapp-dba'
    private db: IDBDatabase | null = null 

    init(storeNames: string[]): Promise<boolean> {
        if (!this.isAvailable()) {
            return Promise.resolve(true)
        }
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName)
            request.onerror = () => {
                reject(new Error('indexedb failed'))
            }  

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result
                storeNames.forEach((storeName) => {
                    const objectStore = db.createObjectStore(storeName, {
                        keyPath: 'id'
                    })
                    objectStore.createIndex('id', 'id', {
                        unique: true
                    })
                })
            }

            request.onsuccess = () => {
                this.db = request.result
                resolve(true)
            }
        })
    }

    isAvailable() {
        return typeof indexedDB !== 'undefined'
    }

    isReady() {
        return !!this.db
    }

    setItems<T>(storeName: string, items: T[]): Observable<T[]> {
        if (!this.isAvailable) {
            return of([])
        }
        return new Observable((subscriber) => {
            if (!this.db) {
                return 
            }
            const tx = this.db.transaction([storeName], 'readwrite');
            const store = tx.objectStore(storeName);
          
            items.forEach(item => store.put(item));
          
            tx.oncomplete = () => {
                subscriber.next(items)
                subscriber.complete()
            };
          
            tx.onerror = () => {
                subscriber.error(tx.error)
            };  
        })
    }

    getItems<T>(storeName: string): Observable<T[]> {
        if (!this.isAvailable) {
            return of([])
        }
        return new Observable((subscriber) => {
            if (!this.db) {
                return 
            }
            const tx = this.db.transaction([storeName], 'readonly');
            const store = tx.objectStore(storeName);

            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                subscriber.next(getAllRequest.result)
                subscriber.complete()
            };

            getAllRequest.onerror = () => {
                subscriber.error(getAllRequest.error)
            };
        })
    }
}