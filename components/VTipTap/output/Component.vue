<template>
  <div class="prose-sm">
    <div v-html="html"></div>
  </div>
</template>

<script>
import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Image from './components/Image';

export default {
  props: {
    json: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    this.html = generateHTML(JSON.parse(this.json), [
      Document,
      Paragraph,
      Text,
      Bold,
      Image,
    ]);
  },
}
</script>