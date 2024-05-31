import AsyncStorage from "@react-native-async-storage/async-storage";

type dataType<T> = Map<string, T>;

interface hasId {
  id: string;
};

export abstract class BaseStorageClass<T extends hasId, Callback> {
  private key: string;
  private cache: dataType<T>;
  callbacks: Map<string, Callback>;

  constructor(key: string) {
    this.key = key;
    this.cache = new Map();
    this.callbacks = new Map();
  }

  get size(): number {
    return this.cache.size;
  }

  get data(): dataType<T> {
    return this.cache;
  }

  // add a 'setState' method to the list of callbacks
  // not responsible for non-unique keys
  subscribe(id: string, callback: Callback) {
    this.callbacks.set(id, callback);
  }

  unsubscribe(id: string) {
    this.callbacks.delete(id);
  }

  // implement this in the child class
  abstract sendDataToSubscribers(): void; 

  // get updated data from device storage
  // make sure you call this on startup
  async syncCache(): Promise<void> {
    const data = await AsyncStorage.getItem("exercises");
    this.cache = new Map(JSON.parse(data || "{}"));
  }

  // update device storage with new data
  private async syncStorage(): Promise<void> {
    await AsyncStorage.setItem(this.key, JSON.stringify(this.cache));
    
    // call all the callbacks with the new data
    this.sendDataToSubscribers();
  }

  protected async getData(id: string): Promise<T | undefined> {
    return this.cache.get(id);
  }

  // TODO: add a check if data already exists
  protected async addData(data: T | T[]): Promise<void> {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        this.cache.set(item.id, item);
      });
    } else {
      this.cache.set(data.id, data);
    }

    // ensure that device storage is updated
    this.syncStorage();
  }

  // TODO: remove this when finished testing
  async clearData(): Promise<void> {
    this.cache.clear();
    await AsyncStorage.removeItem(this.key);
  }
}
