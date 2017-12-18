new Vue({
    el: '#app',
    data () {
      return {
        e2: 0,
        startNFC: true,
        stopNFC: false
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
          case 3:
            return 'lime darken-3'
          break
        }
      }
    }
  });