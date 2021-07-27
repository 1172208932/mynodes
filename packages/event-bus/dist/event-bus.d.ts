export declare class EventCenterClass {
    private _listeners;
    constructor();
    /**
     * 增加一个事件监听。
     * @param type - 要监听的事件类型。
     * @param listener - 事件监听回调函数。
     * @param context - 上下文
     * @param once - 是否是一次性监听，即回调函数响应一次后即删除，不再响应。
     * @returns - 对象本身。链式调用支持。
     */
    on<T>(type: string, listener: Function, context: T, once: boolean): this;
    /**
     * 删除一个事件监听。如果不传入任何参数，则删除所有的事件监听；如果不传入第二个参数，则删除指定类型的所有事件监听。
     * @param type - 要删除监听的事件类型。
     * @param listener - 要删除监听的回调函数。
     * @returns - 对象本身。链式调用支持。
     */
    off(type: string, listener: Function): this;
    /**
     * 发送事件。当第一个参数类型为Object时，则把它作为一个整体事件对象。
     * @param type - 要发送的事件类型。
     * @param detail - 要发送的事件的具体信息，即事件随带参数。
     * @returns - 是否成功调度事件。
     */
    fire(type: EventName, detail?: Object): boolean;
}

declare type EventName = string | EventNameObj;

declare interface EventNameObj {
    type: string;
}

declare let exportEvent: EventCenterClass;
export default exportEvent;

export { }
