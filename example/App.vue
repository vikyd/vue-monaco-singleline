<template>
  <div id="app">
    <h1>Vue Single Line Monaco Editor - Example Page</h1>
    <div class="btns">
      <button @click="onLargerFontSizeClick">Larger FontSize</button>
      <button @click="onFocusClick">Focus</button>
      <button @click="onAddWidthClick">Add Width</button>
    </div>
    <monaco-singleline
      :style="{ width: `${width}%` }"
      ref="myEditor"
      v-model="line"
      placeholder="this is placeholder"
      :height="height"
      :options="opts"
      :editorBeforeMount="onEditorBeforeMount"
      :editorMounted="onEditorMounted"
      @change="onEditorChange"
    />
    <monaco-singleline v-model="line2" placeholder="this is placeholder" />
    <monaco-singleline
      v-model="line3"
      placeholder="this is placeholder"
      :options="{ fontSize: '50px' }"
      :height="70"
      class="my-editor3"
    />
    <monaco-singleline
      value="readOnly mode, will hide edit cursor"
      placeholder="this is placeholder"
      readOnly
    />
  </div>
</template>

<script>
import MonacoSingleline from '../src/'

export default {
  name: 'App',
  components: {
    MonacoSingleline,
  },
  data() {
    return {
      editor: '',
      line: '123 Jy Hi 世界',
      line2: '',
      line3: '123 Jy Hi 世界',
      width: 30,
      height: 21,
      opts: {
        fontFamily:
          'PingFang SC, -apple-system, Helvetica Neue, Helvetica, BlinkMacSystemFont, Microsoft YaHei, tahoma, Arial, Open Sans, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif',
      },
    }
  },
  mounted() {
    // this.$refs.myEditor.focus()
  },
  methods: {
    onEditorBeforeMount(monaco) {
      console.log('before editor mount')
    },
    onEditorMounted(editor, monaco) {
      // this is monaco editor instance
      this.editor = editor
      console.log('editor mounted')
    },
    onEditorChange(value) {
      // console.log(value)
    },
    onLargerFontSizeClick() {
      this.$set(this.opts, 'fontSize', '50px')
      this.height = 70
    },
    onFocusClick() {
      this.$refs.myEditor.focus()
    },
    onAddWidthClick() {
      this.width += 5
    },
  },
}
</script>

<style lang="less" scoped>
#app {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px auto;
  width: 1000px;
}

.btns {
  display: flex;
  gap: 5px;
  // margin-bottom: 5px;
}
</style>
