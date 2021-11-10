<template>
  <div class="node-toolbar">
    <div class="node-toolbar-tools">
      <button type="button" data-drag-handle title="Перетащить">
        <v-icon name="hand" class="node-toolbar-tool"></v-icon>
      </button>
      <button @click="$emit('delete')" type="button" title="Удалить">
        <v-icon name="x" class="node-toolbar-tool"></v-icon>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.node-toolbar {
  display: flex;
}
.node-toolbar-tools {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: #f1f1f1;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  overflow: hidden;
}
.node-toolbar-tool {
  color: #aaa;
  width: 28px;
  height: 28px;
  padding: 4px;

  &:hover {
    background-color: #e1e1e1;
  }
}
</style>