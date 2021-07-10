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
  data () {
    return {
      highlighted: false
    }
  },
  methods:{
    clicked: function(){
      this.$root.$emit('token-clicked-global', this.lexeme)
      this.$root.$emit('token-clicked-article', this.lexeme)
      this.$emit('token-clicked', this.lexeme)
    }
  },
  mounted() {
    this.$root.$on('token-clicked-article',(lexeme) => {
      this.highlighted = this.lexeme && lexeme === this.lexeme
    })
  }
};

</script>

<style>

.holder{
  position:relative;
}

.status-bar{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  background-color:#9999ff;
}

.highlighted{
  border-radius: 5px;
  background-color: #7957d5;
  padding: 0.7em 0.2em 0.1em 0.2em;
  margin: 0 2px 0 2px;
  color: white;
}

rt{
  user-select: none;
}

</style>