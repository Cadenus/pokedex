type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, entry);
    }

    get<T>(key:string) {
        const entry = this.#cache.get(key);
        if(entry === undefined) {
            return undefined;
        } else {
            return entry.val;
        }
    }

    #reap() {
        this.#cache.forEach((value, key, map) => {
            if(value.createdAt <= Date.now() - this.#interval) {
                this.#cache.delete(key)
            }
        });
    }

    #startReapLoop() {
        this.#reap();
        this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}