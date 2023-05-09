import { Sheet, Sheets } from "@/types";

const DB_NAME = "sheets";
const DB_VERSION = 1;
const OBJECT_STORE_NAME = "sheets";
const KEY_PATH = "id";

export default class SheetsDB {
	private db: IDBDatabase | null;

	constructor() {
		this.db = null;
	}

	async connect(): Promise<void> {
		if (this.db) return;

		try {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onupgradeneeded = () => {
				const db = request.result;

				const objectStore = db.createObjectStore(OBJECT_STORE_NAME, {
					keyPath: KEY_PATH,
				});

				objectStore.createIndex("id", "id", {
					unique: true,
				});
				objectStore.createIndex("title", "title");
				objectStore.createIndex("creationDate", "creationDate");
				objectStore.createIndex("cells", "cells");
				objectStore.createIndex("processedData", "processedData");
				objectStore.createIndex("rawData", "rawData");
			};

			this.db = await new Promise<IDBDatabase>((resolve, reject) => {
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});
		} catch (error) {
			console.error(error);
		}
	}

	async getAll(): Promise<Sheets | null> {
		if (!this.db) await this.connect();
		if (!this.db) return null;

		const transaction = this.db.transaction(OBJECT_STORE_NAME, "readonly");
		const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
		const request = objectStore.getAll();

		return new Promise<Sheets>((resolve, reject) => {
			request.onsuccess = () => resolve(request.result);

			request.onerror = () => reject(request.error);
		});
	}

	async getById(id: string): Promise<Sheet | null> {
		if (!this.db) await this.connect();
		if (!this.db) return null;

		const transaction = this.db.transaction(OBJECT_STORE_NAME, "readonly");
		const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
		const request = objectStore.get(id);

		return new Promise<Sheet>((resolve, reject) => {
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async add(sheet: Sheet): Promise<Sheet | null> {
		if (!this.db) await this.connect();
		if (!this.db) return null;

		const transaction = this.db.transaction(OBJECT_STORE_NAME, "readwrite");
		const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
		const request = objectStore.add(sheet);

		return new Promise<Sheet>((resolve, reject) => {
			request.onsuccess = () => resolve(sheet);
			request.onerror = () => reject(request.error);
		});
	}

	async update(sheet: Sheet): Promise<Sheet | null> {
		if (!this.db) await this.connect();
		if (!this.db) return null;

		const transaction = this.db.transaction(OBJECT_STORE_NAME, "readwrite");
		const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
		const request = objectStore.put(sheet);

		return new Promise<Sheet>((resolve, reject) => {
			request.onsuccess = () => resolve(sheet);
			request.onerror = () => reject(request.error);
		});
	}

	async deleteById(id: string): Promise<string | null> {
		if (!this.db) await this.connect();
		if (!this.db) return null;

		const transaction = this.db.transaction(OBJECT_STORE_NAME, "readwrite");
		const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
		const request = objectStore.delete(id);

		return new Promise<string>((resolve, reject) => {
			request.onsuccess = () => resolve(id);
			request.onerror = () => reject(request.error);
		});
	}
}
