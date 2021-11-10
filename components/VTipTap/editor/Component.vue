<template>
  <div>
    <bubble-menu :editor="editor" v-if="editor">
      <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H2
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H3
      </button>
    </bubble-menu>
    <floating-menu :editor="editor" v-if="editor">
      <button type="button" @click="$refs.images.click()">
        Image
      </button>
      <button type="button" @click="addVideo">
        Video
      </button>
    </floating-menu>
    <editor-content :editor="editor" />
    <input type="file" ref="images" class="hidden" @change="onAddImage" multiple>
  </div>
</template>
<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Image from './extensions/Image'
import Embed from './extensions/Embed'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
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
        Embed,
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
    addVideo() {
      const url = window.prompt(
          'Ссылка на видео',
      )
      if (url) {
        this.editor.chain().focus().insertVideoPlayer({ url }).run()
      }
    },
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

  img {
    width: 100%;
  }

  > * + * {
    margin-top: 1rem;
  }

  .tiptap-image {
    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }
}

.tippy-box {
  background-color: #0c193a;
  color: white;
}
</style>
