<script>

export default {
  name: "Token",
  props: ['token','wordStats'],
  data () {
    return {
    }
  },
  methods:{
    clicked: function(){
      this.$root.$emit('token-clicked-global', this.lexeme)
      this.$emit('token-clicked', this.lexeme)
    }
  },
  computed: {
    parts: function() {
      return this.token.split(',')
    },
    word: function () {
      return this.parts[0]
    },
    lexeme: function() {
      return this.parts[1]
    },
    furigana: function(){
      return this.parts[2]
    },
    isKana: function(){
      return this.parts[5] === '1'
    },
    rating: function() {
      return this.wordStats[this.lexeme]
    },
    bar_length: function(){
      return 100*Math.exp(-this.rating/20)
    },
    element: function(){
      return this.furigana ? 'ruby' : 'span'
    },
  },
};

</script>
