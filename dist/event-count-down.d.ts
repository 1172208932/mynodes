import { EventCenterClass } from '@newblue/event-bus';

export declare class Countdown extends EventCenterClass {
    private static COUNT_IN_MILLISECOND;
    private static SECOND_IN_MILLISECOND;
    private static MINUTE_IN_MILLISECOND;
    private static HOUR_IN_MILLISECOND;
    private static DAY_IN_MILLISECOND;
    private endTime;
    private remainTime;
    private status;
    private step;
    constructor(endTime: number, step?: number);
    start(): void;
    stop(): void;
    private countdown;
    private parseRemainTime;
}

export declare type CountdownCallback = (remainTimeData: RemainTimeData, remainTime: number) => void;

export declare enum CountdownEventName {
    START = "start",
    STOP = "stop",
    RUNNING = "running"
}

export declare function fillZero(num: number): string;

export declare interface RemainTimeData {
    /** 天数 */
    days: number;
    /**
     * 小时数
     */
    hours: number;
    /**
     * 分钟数
     */
    minutes: number;
    /**
     * 秒数
     */
    seconds: number;
    /**
     * 毫秒数
     */
    count: number;
}

export { }
