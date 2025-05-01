export class LocalStorageService {
    getItem(key: string): any {
        const data = localStorage.getItem(key);
        console.log(`Retrieving item with key "${key}" from localStorage:`, data);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error(`Error parsing data for key "${key}" from local storage:`, error);
            }
        }
        return null;
    }

    setItem(key: string, value: any): void {
        try {
            const jsonData = JSON.stringify(value);
            localStorage.setItem(key, jsonData);
            console.log(`Saving item with key "${key}" to localStorage:`, jsonData);
        } catch (error) {
            console.error(`Error saving data for key "${key}" to local storage:`, error);
        }
    }

    removeItem(key: string): void {
        console.log(`Removing item with key "${key}" from localStorage`);
        localStorage.removeItem(key);
    }
}


export const storageService = new LocalStorageService();
