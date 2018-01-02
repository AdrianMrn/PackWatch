
Vue.component('pack-alert', {
    

    
  template: ` 
  <div>
          <v-card>
          <v-card-title class="headline text-lg-center">Info</v-card-title>
          <v-card-text>Please hold the NFC tag near the phoooone!</v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="$emit('close-alert')">The fuck?</v-btn>
              <v-btn color="green darken-1" flat >OK</v-btn>
          </v-card-actions>
          </v-card>
  </div>
  `,

}),

new Vue({
    el: '#app',
    data: {
      
        e2: 0,
        startNFC: true,
        stopNFC: false,
        e1: 'recent',
        dialog:false,
        stepper1: 0,
        section1: true, 
        section2: false,
        settings_items: [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' }
        ],
        packs: [
          { id: 0, favorite: true, title: 'Fitness Pack', icon: 'fitness_center' },
          { id: 1, favorite: true, title: 'Bike Pack', icon: 'directions_bike' },
          { id: 2, favorite: true, title: 'Beach Pack', icon: 'beach_access' },
          { id: 3, favorite: false, title: 'Fitness Pack', icon: 'fitness_center' },
          { id: 4, favorite: false, title: 'Golf Pack', icon: 'golf_course' },
          { id: 5, favorite: false, title: 'Bike Pack', icon: 'directions_bike' },
          { id: 6, favorite: false, title: 'Beach Pack', icon: 'beach_access' },
          
        //  paginate api from laravel 
        ],
        page: 1,

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
      },
    },
    methods: {
    
      alert: function (message) {
        alert(message);
      },
      goto: function (id) {
        
        window.location.href = 'packs/' + id;
        
      },
      favorite: function (boolean, id) {
        
        pack = this.packs[id];

        pack.favorite = !boolean;
        // alert(pack.favorite);
        
        // alert("Favorite = " + boolean);
         api = 'https://api.github.com/users/1'
        axios.get(api).then(response => {
        this.data = response.data
        console.log(response.data);
      }).catch(error => {
        this.errorMsg = 'No user or no location!'
        this.data = []
      })

      }

    }
  });

