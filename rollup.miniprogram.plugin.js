import inject from 'rollup-plugin-inject';
import modify from 'rollup-plugin-modify';

const adapterArray = {
  window: 'windowAlias',
  atob: 'atob',
  devicePixelRatio: 'devicePixelRatio',
  document: 'documentAlias',
  Element: 'Element',
  Event: 'Event',
  EventTarget: 'EventTarget',
  HTMLCanvasElement: 'HTMLCanvasElement',
  HTMLElement: 'HTMLElement',
  HTMLMediaElement: 'HTMLMediaElement',
  HTMLVideoElement: 'HTMLVideoElement',
  Image: 'Image',
  navigator: 'navigator',
  Node: 'Node',
  requestAnimationFrame: 'requestAnimationFrame',
  cancelAnimationFrame: 'cancelAnimationFrame',
  screen: 'screen',
  XMLHttpRequest: 'XMLHttpRequestAlias',
  performance: 'performance',
  HTMLImageElement: 'Image',
};
const adapterVars = {};



const plugins = [
  inject(adapterVars),
  modify({
    find: /@eva\/([\w\.\/-]*)/g,
    replace: (match, moduleName) => {
      console.log(match, moduleName);
      if (moduleName.indexOf('/dist/miniprogram') > -1) {
        return `@eva/${moduleName}`;
      }
      return `@eva/${moduleName}/dist/miniprogram`;
    },
  }),
  modify({
    find: /pixi\.js/g,
    replace: `@eva/miniprogram-pixi`,
  }),
];

export default plugins;
