new Vue({
    el: '#app',
    data () {
      return {
        e2: 0
      }
    },
  
    computed: {
      computedColor () {
        switch (this.e2) {
          case 0:
            return 'blue-grey'
          break
          case 1:
            return 'teal'
          break
          case 2:
            return 'brown'
          break
          case 4:
            return 'brown lighten-1'
          break
        }
      }
    }
  });