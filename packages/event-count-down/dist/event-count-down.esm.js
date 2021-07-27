import { EventCenterClass } from '@duiba/event-bus';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var CountdownStatus;
(function (CountdownStatus) {
    CountdownStatus[CountdownStatus["running"] = 0] = "running";
    CountdownStatus[CountdownStatus["paused"] = 1] = "paused";
    CountdownStatus[CountdownStatus["stoped"] = 2] = "stoped";
})(CountdownStatus || (CountdownStatus = {}));
var CountdownEventName;
(function (CountdownEventName) {
    CountdownEventName["START"] = "start";
    CountdownEventName["STOP"] = "stop";
    CountdownEventName["RUNNING"] = "running";
})(CountdownEventName || (CountdownEventName = {}));
function fillZero(num) {
    return ("0" + num).slice(-2);
}
var Countdown = /** @class */ (function (_super) {
    __extends(Countdown, _super);
    function Countdown(endTime, step) {
        if (step === void 0) { step = 1e3; }
        var _this = _super.call(this) || this;
        _this.remainTime = 0;
        _this.status = CountdownStatus.stoped;
        _this.endTime = endTime;
        _this.step = step;
        _this.start();
        return _this;
    }
    Countdown.prototype.start = function () {
        this.fire(CountdownEventName.START);
        this.status = CountdownStatus.running;
        this.countdown();
    };
    Countdown.prototype.stop = function () {
        this.fire(CountdownEventName.STOP);
        this.status = CountdownStatus.stoped;
    };
    Countdown.prototype.countdown = function () {
        var _this = this;
        if (this.status !== CountdownStatus.running) {
            return;
        }
        this.remainTime = Math.max(this.endTime - Date.now(), 0);
        this.fire(CountdownEventName.RUNNING, { parseRemainTime: this.parseRemainTime(this.remainTime), remainTime: this.remainTime });
        if (this.remainTime > 0) {
            setTimeout(function () { return _this.countdown(); }, this.step);
        }
        else {
            this.stop();
        }
    };
    Countdown.prototype.parseRemainTime = function (remainTime) {
        var time = remainTime;
        var days = Math.floor(time / Countdown.DAY_IN_MILLISECOND);
        time = time % Countdown.DAY_IN_MILLISECOND;
        var hours = Math.floor(time / Countdown.HOUR_IN_MILLISECOND);
        time = time % Countdown.HOUR_IN_MILLISECOND;
        var minutes = Math.floor(time / Countdown.MINUTE_IN_MILLISECOND);
        time = time % Countdown.MINUTE_IN_MILLISECOND;
        var seconds = Math.floor(time / Countdown.SECOND_IN_MILLISECOND);
        time = time % Countdown.SECOND_IN_MILLISECOND;
        var count = Math.floor(time / Countdown.COUNT_IN_MILLISECOND);
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            count: count,
        };
    };
    Countdown.COUNT_IN_MILLISECOND = 1 * 100;
    Countdown.SECOND_IN_MILLISECOND = 10 * Countdown.COUNT_IN_MILLISECOND;
    Countdown.MINUTE_IN_MILLISECOND = 60 * Countdown.SECOND_IN_MILLISECOND;
    Countdown.HOUR_IN_MILLISECOND = 60 * Countdown.MINUTE_IN_MILLISECOND;
    Countdown.DAY_IN_MILLISECOND = 24 * Countdown.HOUR_IN_MILLISECOND;
    return Countdown;
}(EventCenterClass));

export { Countdown, CountdownEventName, fillZero };
