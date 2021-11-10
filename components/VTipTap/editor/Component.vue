<template>
  <div>
    <div v-if="editor" class="flex flex-wrap v-tip-tap-toolbar">
      <button type="button" @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button type="button" @click="editor.chain().focus().toggleStrike().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button type="button" @click="editor.chain().focus().toggleCode().run()"
              :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button type="button" @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button type="button" @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button type="button" @click="editor.chain().focus().setParagraph().run()"
              :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button type="button" @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button type="button" @click="editor.chain().focus().undo().run()">
        undo
      </button>
      <button type="button" @click="editor.chain().focus().redo().run()">
        redo
      </button>
      <button type="button" @click="$refs.images.click()">
        add image from URL
      </button>
    </div>
    <div class="prose prose-sm">
      <editor-content :editor="editor" />
    </div>
    <input type="file" ref="images" class="hidden" @change="onAddImage" multiple>
  </div>
</template>
<script>
import {Editor, EditorContent} from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Image from './extensions/Image'

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
    },
    images: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.value ? JSON.parse(this.value) : '',
      extensions: [
        StarterKit,
        Image,
      ],
      onUpdate: () => {
        const getJSON = this.editor.getJSON();
        const images = [];

        getJSON.content.forEach(el => {
          if (el.type === 'Image') {
            images.push(el.attrs);
          }
        });

        this.$emit('update:images', images);
        this.$emit('input', JSON.stringify(getJSON));
      },
    })
  },

  methods: {
    onAddImage(event) {
      const formData = new FormData();
      const images = event.target.files;

      if (images.length) {
        for (let image of images) {
          formData.append('images[]', image);
        }

        this.$axios
            .$post(`/api/images/notes`, formData)
            .then(images => {
              const nodes = [];

              images.forEach(image => {
                nodes.push({
                  type: 'Image',
                  attrs: {
                    id: image.id,
                    model_id: image.model_id,
                    src: image.url
                  }
                });
              });

              this.editor.commands.insertContent(nodes);
            });
      }
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.v-tip-tap-toolbar {
  button {
    @apply bg-gray;
    padding: 4px;

    &.is-active {
      @apply bg-gray-dark;
    }
  }
}
/* Basic editor styles */
.ProseMirror {
  padding: 16px;
  border: 1px solid #f1f1f1;

  > * + * {
    margin-top: 0.75em;
  }

  .tiptap-image {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }
}
</style>
