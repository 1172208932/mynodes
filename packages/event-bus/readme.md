# DuibaGroup(EventBus)

![兑吧Logo](https://yun.duiba.com.cn/spark/assets/db1bfaea405341e515cf6537e63573087e826cbe.png)

## 前言

### 说明

简单的发布订阅通信类（[类似eventemitter3](https://github.com/primus/eventemitter3)）

## 如何应用？

### 📦 Install

```bash
yarn add @duiba/event-bus
```

### Usage

```js
import EventBus from '@duiba/event-bus';
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
    componentDidMount() {
        EventBus.on('BEGIN', this.immediatelyBegin, this);
    }
    componentWillUnmount() {
        EventBus.off('BEGIN', this.immediatelyBegin);
    }

    // other class
    EventBus.fire('BEGIN')
```
