# Single Line Mode Monaco Editor for Vue

Single line mode [monaco editor](https://github.com/Microsoft/monaco-editor) for Vue.

[![vue-monaco-singleline](https://nodei.co/npm/vue-monaco-singleline.png)](https://npmjs.org/package/vue-monaco-singleline)

# Installation

```sh
# npm
npm install vue-monaco-singleline

# or yarn
yarn add vue-monaco-singleline
```

# Online Demo

- [Simple](https://codesandbox.io/s/vue-monaco-singleline-simple-9tkul?file=/src/App.vue)
- [Change Height, Width, FontSize](https://codesandbox.io/s/vue-monaco-singleline-change-style-mnwix?file=/src/App.vue)
- [Custom Language and Theme](https://vikyd.github.io/vue-monaco-singleline-custom-language/)

# Using inside Vue Component

```vue
<template>
  <div id="app">
    <monaco-singleline v-model="value" :options="options" />
  </div>
</template>

<script>
import MonacoSingleline from 'vue-monaco-singleline'
export default {
  name: 'App',
  components: {
    MonacoSingleline,
  },
  data() {
    return {
      value: 'abc 123',
      options: {
        // Monaco Editor Options
        // all options: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
      },
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
  },
}
</script>
```

# Want normal language highlight

First of all, install npm package if want normal language highlight:

```sh
# npm
npm install -D monaco-editor-webpack-plugin@1.9.1

# or yarn
yarn add -D monaco-editor-webpack-plugin@1.9.1
```

Then:

If using [Vue CLI], can add to `vue.config.js`:

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'javascript', 'html', 'xml'],
      },
    ])
  },
}
```

If also want Javascript autocompletion, add `typescript` to `languages`, because `typescript` is the instantiator of `javascript`:

> see: [Some languages share the same web worker. If one of the following languages is included, you must also include the language responsible for instantiating their shared worker](https://github.com/microsoft/monaco-editor-webpack-plugin#options)

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'typescript', 'javascript', 'html', 'xml'],
      },
    ])
  },
}
```

If using with Webpack only, see [here](https://github.com/FE-Mars/monaco-editor-vue#using-with-webpack).

# Props

Support full props of [monaco-editor-vue](https://github.com/FE-Mars/monaco-editor-vue#properties).

- `value`: editor content
  - default: ''
- `v-model`: bind editor content (should not use `value` at this time)
- `placeholder`: placeholder
- `width`: width of monaco editor (not this component)
  - Type: `Number`(px) or `String`(same as css `width`)
  - default: `100%`
  - should not use this prop in most case, should set style or class to this component `<monaco-singleline>`
- `height`: height of monaco editor (not this component)
  - Type: `Number`(px) or `String`(same as css `width`)
  - default: `21`（px）
- `diffEditor`: monaco editor diff mode
  - Type: 'Boolean'
  - default: `false`
  - example: TODO: codesandbox
- `original` original conent of editor, only works when `diffEditor` is `true`
  - in contrast, `value` or `v-model` is the modified content
- `language` the initial language of the auto created model in the editor. Defaults to `javascript`.
  - default: 'javascript'
  - notice: no any highlight or autocompletion, if not adding `MonacoWebpackPlugin` to `vue.config.js`
- `theme` the theme of the editor. Defaults to `vs`.
  - default: `vs`
  - all out-of-the-box themes: `vs`, `vs-dark`, `hc-black`, see [here](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#theme)
- `options` refer to [Monaco interface IEditorConstructionOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html).
  - default: see `DefaultOptions` inside source file [monaco-singleline.vue](src/monaco-singleline.vue)
- `editorBeforeMount(monaco)` The function called before the editor mounted (similar to `beforeMount` of Vue).
  - `editorBeforeMount` is Vue `props` not `event`, should be used like `:editorBeforeMount` not `@editorBeforeMount`
- `editorMounted(editor, monaco)` The function called when the editor has been mounted (similar to `mounted` of Vue).
  - `editorMounted` is Vue `props` not `event`, should use like `:editorMounted`

# Default Options

See `DefaultOptions` inside source file [monaco-singleline.vue](src/monaco-singleline.vue).

# Events

- `change(newValue, event)` an event emitted when the content of the current model has changed.
  - this event will not emit before value change, if want to, should make monaco editor instance to listen [onKeyUp](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html#onkeyup) event or so. seet [this demo](TODO:)

More events should be found on [monaco editor events](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html), and be set on `editorMounted`.

# Methods

- `focus`
  - example: `this.$refs.myEditor.focus()`, or `this.editor.focus()`(on monaco instance)

More methods should be found on [monaco editor methods](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html), and be used on monaco editor instance(not this component's ref).

# Height and Width

When set option `automaticLayout: true`(already default), [Monaco has a built-in auto resize to parent container functionality](https://stackoverflow.com/a/47163918/2752670).

It is highly recommended that change this component height and width by CSS on this component.

# Custom Style

It is highly recommended that custom this component by override CSS style inside.

See [Vue Deep Selectors](https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors)

- wrapper class: `monaco-singleline`
  - controls padding to border e.t.c
- placeholder class: `placeholder`

# Font Size and height

[Online Demo here.](https://codesandbox.io/s/vue-monaco-singleline-change-style-mnwix?file=/src/App.vue)

If want to change font size, you should change:

- change monaco editor options `fontSize`
- and, change the `height` prop to a suitable value

You may need some art to fine tuning the best you like.

Q: Why not auto ?

A: monaco editor will fit to parent element size, not parent fit to monaco editor.

# ReadOnly mode

```vue
<monaco-singleline readOnly />
```

Will:

- disable editing
- hide edit cursor

# Development

npm:

```sh
# install dependencies
npm install

# run local example app
npm run serve

# compiles and minifies for production
npm run build
```

yarn:

```sh
# install dependencies
yarn

# run local example app
yarn serve

# compiles and minifies for production
yarn build
```

# Useful Resources

- [monaco-editor-vue](https://github.com/FE-Mars/monaco-editor-vue)
- [monaco editor create options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html)
- [monaco editor issue: Single line mode](https://github.com/microsoft/monaco-editor/issues/2009)
- [monaco editor issue: Is there any way to switch to one-line mode?](https://github.com/microsoft/monaco-editor/issues/1601)

# Thanks

[monaco-editor-vue](https://github.com/FE-Mars/monaco-editor-vue)
