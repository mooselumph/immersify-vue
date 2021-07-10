<template>

  <component :is="element" class="holder" v-bind:class="{ highlighted: highlighted }" v-on:click="clicked">
      {{ word }}
      <rt v-if="!isKana">{{furigana}}</rt>
      <div class="status-bar" :style="'right:'+bar_length+'%'"></div>
  </component>

</template>

<script>
import TokenBase from "@/components/TokenBase.vue";

export default {
  extends: TokenBase,
  props: ['searchTerm'],
  computed: {
    highlighted: function(){
      return this.lexeme === this.searchTerm
    }
  },
};

</script>

<style>
  .holder{
    /* cursor: pointer; */
  }
</style>