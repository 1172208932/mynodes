'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var EventObject = /** @class */ (function () {
    function EventObject(type, target, detail) {
        this.type = type;
        this.target = target;
        this.detail = detail;
        this.timeStamp = +new Date();
    }
    return EventObject;
}());
var EventCenterClass = /** @class */ (function () {
    function EventCenterClass() {
        this._listeners = {};
    }
    /**
    * 增加一个事件监听。
    * @param type - 要监听的事件类型。
    * @param listener - 事件监听回调函数。
    * @param context - 上下文
    * @param once - 是否是一次性监听，即回调函数响应一次后即删除，不再响应。
    * @returns - 对象本身。链式调用支持。
    */
    EventCenterClass.prototype.on = function (type, listener, context, once) {
        var listeners;
        listeners = (this._listeners = this._listeners || {});
        var eventListeners = (listeners[type] = listeners[type] || []);
        for (var i = 0, len = eventListeners.length; i < len; i++) {
            var el = eventListeners[i];
            if (el.listener === listener)
                return;
        }
        eventListeners.push({ listener: listener, context: context, once: once });
        return this;
    };
    /**
    * 删除一个事件监听。如果不传入任何参数，则删除所有的事件监听；如果不传入第二个参数，则删除指定类型的所有事件监听。
    * @param type - 要删除监听的事件类型。
    * @param listener - 要删除监听的回调函数。
    * @returns - 对象本身。链式调用支持。
    */
    EventCenterClass.prototype.off = function (type, listener) {
        var listeners;
        listeners = (this._listeners = this._listeners || {});
        // remove all event listeners
        if (arguments.length == 0) {
            listeners = null;
            return this;
        }
        var eventListeners = listeners && listeners[type];
        if (eventListeners) {
            // remove event listeners by specified type
            if (arguments.length == 1) {
                delete listeners[type];
                return this;
            }
            for (var i = 0, len = eventListeners.length; i < len; i++) {
                var el = eventListeners[i];
                if (el.listener === listener) {
                    eventListeners.splice(i, 1);
                    if (eventListeners.length === 0)
                        delete listeners[type];
                    break;
                }
            }
        }
        return this;
    };
    /**
   * 发送事件。当第一个参数类型为Object时，则把它作为一个整体事件对象。
   * @param type - 要发送的事件类型。
   * @param detail - 要发送的事件的具体信息，即事件随带参数。
   * @returns - 是否成功调度事件。
   */
    EventCenterClass.prototype.fire = function (type, detail) {
        var event;
        var eventType;
        if (typeof type === 'string') {
            eventType = type;
        }
        else {
            event = type;
            eventType = type.type;
        }
        var listeners = this._listeners;
        if (!listeners)
            return false;
        var eventListeners = listeners[eventType];
        if (eventListeners) {
            var eventListenersCopy = eventListeners.slice(0);
            event = event || new EventObject(eventType, this, detail);
            for (var i = 0; i < eventListenersCopy.length; i++) {
                var el = eventListenersCopy[i];
                el.listener.call(el.context, event);
                if (el.once) {
                    var index = eventListeners.indexOf(el);
                    if (index > -1) {
                        eventListeners.splice(index, 1);
                    }
                }
            }
            if (eventListeners.length == 0)
                delete listeners[eventType];
            return true;
        }
        return false;
    };
    return EventCenterClass;
}());
var exportEvent = new EventCenterClass();

exports.EventCenterClass = EventCenterClass;
exports["default"] = exportEvent;
