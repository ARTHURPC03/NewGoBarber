import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/cache'
import ICacheProvider from '../models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedDate = JSON.parse(data) as T

    return parsedDate
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }
}
