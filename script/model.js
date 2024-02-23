class Model {
    constructor() {
        this.dataBase;
        this.dataBaseRequest = indexedDB.open('noteDataBase', 1);
        this.dataBaseRequest.addEventListener('success', () => this.dataBaseSucceed(event));
        this.dataBaseRequest.addEventListener('error', () => this.dataBaseError(event));
        this.dataBaseRequest.addEventListener('upgradeneeded', () => this.upgradeDataBase(event));
    }
    dataBaseSucceed(ev) {
        this.dataBase = ev.target.result;
    }
    dataBaseError(ev) {
        window.alert("User did'nt allow indexedDB to work' + ev.target.error");
    }
    upgradeDataBase(ev) {
        const dataBase = ev.target.result;
        if (!dataBase.objectStoreNames.contains('notes')) {
            dataBase.createObjectStore('notes', {
                keyPath : 'id',
                autoIncrement : true
            });
        }
        this.dataBase = dataBase;
    }
    addNote(note) {
        const transaction = this.dataBase.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');
        return objectStore.add(note);
    }
    updateNote(note) {
        const transaction = this.dataBase.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');
        return objectStore.put(note);
    }
    displayNotes() {
        const transaction = this.dataBase.transaction(['notes'], 'readonly');
        const objectStore = transaction.objectStore('notes');
        return objectStore.openCursor();
    }
    deleteNote(noteId) {
        const transaction = this.dataBase.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');
        return objectStore.delete(noteId);
    }
}
export const dataBase = new Model();