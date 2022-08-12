# NewBlue(event-count-down)

## 前言

### 说明

基于发布订阅的倒计时

## 如何应用？

### 📦 Install

```bash
yarn add @newblue/event-count-down
```

### Usage

```js
    import {
        Countdown, //构造函数
        CountdownEventName, //事件名称
        fillZero //是否要填充0
    } from '@newblue/event-count-down';
```

## Contribute

1. `yarn dev` to develop package
2. `cd test && yarn && yarn dev` to develop test

## Publish

```bash
npm run pub
```

## 技术

### 技术栈：

rollup/ts/...

### 🔨 示例

```js
    /**
     * Countdown实例化入参
     * param1 - 结束时间。
     * param2 - 时间间隔。
     */
    const countdown = new Countdown(Date.now() + 60 * 60 * 1000, 1000);
    countdown.on(CountdownEventName.RUNNING, (remainTimeData) => {
        const {
            hours,
            minutes,
            seconds,
            count
        } = remainTimeData.detail.parseRemainTime;
        let timeDisplay = [hours, minutes, seconds, count].map(fillZero).join(':');
        console.log(timeDisplay)
    });
```
