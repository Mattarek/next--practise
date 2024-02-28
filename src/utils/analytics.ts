import { redis } from '@/lib/redis';
import { getDate } from './getDate';

interface AnalyticsArgs {
    retention?: number;
}

interface TrackOptions {
    presist?: boolean;
}

export class Analytics {
    private retention: number = 60 * 60 * 24 * 7;

    constructor(opts?: AnalyticsArgs) {
        if (opts?.retention) this.retention = opts.retention;
    }

    async track(namespace: string, event: object = {}, opts?: TrackOptions) {
        let key = `analytics::${namespace}`;

        if (!opts?.presist) {
            key += `::${getDate()}`;
        }

        await redis.hincrby(key, JSON.stringify(event), 1);
        if (!opts?.presist) await redis.expire(key, this.retention);
    }

    async retrive(namespace: string, date: string) {
        const res = await redis.hgetall<Record<string, string>>(
            `analytics::${namespace}::${date}`,
        );
        return {
            date,
            events: Object.entries(res ?? []).map(([key, value]) => ({
                [key]: Number(value),
            })),
        };
    }
}

export const analytics = new Analytics();
