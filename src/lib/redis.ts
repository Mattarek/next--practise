import { Redis } from '@upstash/redis';

export const redis = new Redis({
    url: 'https://us1-renewing-grizzly-39168.upstash.io',
    token: process.env.REDIS_KEY as string,
});
