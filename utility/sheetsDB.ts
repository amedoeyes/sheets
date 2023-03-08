async function connect() {
	const request = indexedDB.open("sheets", 1);

	return new Promise<IDBDatabase>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = () => {
			reject(request.error);
		};
		request.onupgradeneeded = () => {
			const db = request.result;
			const objectStore = db.createObjectStore("sheets", {
				keyPath: "id",
			});
			objectStore.createIndex("id", "id", { unique: true });
			objectStore.createIndex("title", "title", { unique: false });
			objectStore.createIndex("creationDate", "creationDate", {
				unique: false,
			});
			objectStore.createIndex("stations", "stations", {
				unique: false,
			});
			objectStore.createIndex("points", "points", { unique: false });
			objectStore.createIndex("rawData", "rawData", {
				unique: false,
			});
		};
	});
}

async function getAll() {
	const db = await connect();
	const transaction = db.transaction("sheets", "readonly");
	const objectStore = transaction.objectStore("sheets");
	const request = objectStore.getAll();
	return new Promise<Sheet[]>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function getById(id: string) {
	const db = await connect();
	const transaction = db.transaction("sheets", "readonly");
	const objectStore = transaction.objectStore("sheets");
	const request = objectStore.get(id);

	return new Promise<Sheet>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function add(sheet: Sheet) {
	const db = await connect();
	const transaction = db.transaction("sheets", "readwrite");
	const objectStore = transaction.objectStore("sheets");
	const request = objectStore.add(sheet);

	return new Promise<void>((resolve, reject) => {
		request.onsuccess = () => {
			resolve();
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function update(sheet: Sheet) {
	const db = await connect();
	const transaction = db.transaction("sheets", "readwrite");
	const objectStore = transaction.objectStore("sheets");
	const request = objectStore.put(sheet);

	return new Promise<void>((resolve, reject) => {
		request.onsuccess = () => {
			resolve();
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function deleteById(id: string) {
	const db = await connect();
	const transaction = db.transaction("sheets", "readwrite");
	const objectStore = transaction.objectStore("sheets");
	const request = objectStore.delete(id);

	return new Promise<void>((resolve, reject) => {
		request.onsuccess = () => {
			resolve();
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}

const sheetsDB = {
	getAll,
	getById,
	add,
	update,
	deleteById,
};

export default sheetsDB;
