import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { Injectable } from "@angular/core";
import { Article } from '../articles/articles.service';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';

addRxPlugin(RxDBMigrationSchemaPlugin);

type Database = RxDatabase<{
    articles: RxCollection<Article>
}>

@Injectable({
    providedIn: 'root'
})
export class RxDbService {
    private db: Database | null = null

    async init() {
        if (!this.isAvailable()) {
            return Promise.resolve()
        }
        this.db = await createRxDatabase<Database>({
            name: 'myapp-db',
            storage: getRxStorageDexie()
        })
        await this.db.addCollections({
            articles: {
                schema: {
                    version: 1,
                    primaryKey: 'id',
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            maxLength: 100
                        },
                        title: {
                            type: 'string'
                        },
                        body: {
                            type: 'string'
                        },
                        userId: {
                            type: 'number'
                        }
                    }
                }
            }
        })
    }

    isReady() {
        return !!this.db
    }

    isAvailable() {
        return typeof indexedDB !== 'undefined'
    }

    get collectionArticles() {
        return this.db!.collections.articles
    }
}