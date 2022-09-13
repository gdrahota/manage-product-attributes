<template>
  <div>
    <template v-if="editor">
      <q-btn-group
        v-for="(menu, key) of menus"
        :key="key"
        class="q-mb-sm q-mr-md"
        push
      >
        <q-btn
          v-for="(menuItem, key) of menu"
          :key="key"
          :color="editor.isActive(menuItem.isActive, menuItem.isActiveOption) ? 'blue-2' : 'white'"
          no-caps
          text-color="primary"
          @click="onMenuClick(menuItem)"
        >
          <span
            :class="menuItem.class"
            v-html="menuItem.label"
          />
        </q-btn>
      </q-btn-group>
    </template>

    <editor-content
      :editor="editor"
      class="bg-blue-grey-1 shadow-1"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import menus from './menus'
import Underline from '@tiptap/extension-underline'

export default {
  beforeDestroy() {
    this.editor.destroy()
  },

  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      menus,
    }
  },

  methods: {
    onMenuClick( { onClickFnName, onClickParam } ) {
      this.editor.chain().focus()[ onClickFnName ](onClickParam).run()
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Underline,
      ],
      onUpdate: () => {
        //HTML
        this.$emit('set', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  watch: {
    value( value ) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if ( isSame ) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
}
</script>

<style lang="sass">
.ProseMirror
  border: 1px solid #607d8b
  border-radius: 4px
  padding: 5px
  min-height: 200px
  max-height: 400px
  overflow-y: auto
</style>
