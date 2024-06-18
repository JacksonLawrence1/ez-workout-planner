import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StorageItem {
  id: string;
};

export class StorageService<T extends StorageItem>{
  private key: string;
  private cache: Map<string, T>;

  constructor(key: string) {
    this.key = key;
    this.cache = new Map();
  }

  get size(): number {
    return this.cache.size;
  }

  get data(): Map<string, T> {
    return this.cache;
  }

  get dataAsArray(): T[] {
    return Array.from(this.cache.values());
  }

  getData(id: string): T | undefined {
    return this.cache.get(id);
  }

  exists(id: string): boolean {
    return this.cache.has(id);
  }

  nameExists(name: string): boolean {
    const id = this.generateId(name);
    return this.exists(id);
  }

  // get updated data from device storage
  // make sure you call this on startup
  async syncCache(): Promise<void> {
    const data = await AsyncStorage.getItem("exercises");

    const parsedData = JSON.parse(data || "{}");
    if (!parsedData.size || parsedData.size === 0) {
      return;
    }

    this.cache = new Map(parsedData);
  }

  // update device storage with new data
  private async syncStorage(): Promise<void> {
    await AsyncStorage.setItem(this.key, JSON.stringify(this.cache));
  }

  async addData(data: T): Promise<void> {
    // TODO: what to do if data already exists?
    this.cache.set(data.id, data);

    // ensure that device storage is updated
    this.syncStorage();
  }

  async deleteData(id: string): Promise<void> {
    this.cache.delete(id);
    this.syncStorage();
  }

  // WARNING: remove this when finished testing
  async clearData(): Promise<void> {
    this.cache.clear();
    await AsyncStorage.removeItem(this.key);
  }

  generateId(name: string): string {
    return name.toLowerCase().replace(/\s/g, "_");
  }
}