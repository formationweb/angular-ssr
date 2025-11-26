import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IndexedDbService {
    private readonly dbName = 'myapp-db'
    private db: IDBDatabase | null = null 
    private isDbInit = false

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
                this.isDbInit = true
                resolve(true)
            }
        })
    }

    isAvailable() {
        return typeof indexedDB !== 'undefined'
    }

    isReady() {
        return this.isDbInit
    }
}