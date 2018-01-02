
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
          { icon: 'star', title: 'Bike Pack', avatar: 'directions_bike' },
          { icon: 'star', title: 'Beach Pack', avatar: 'beach_access' },
          { icon: 'star_border', title: 'Fitness Pack', avatar: 'fitness_center' },
          { icon: 'star_border', title: 'Golf Pack', avatar: 'golf_course' },
          { icon: 'star_border', title: 'Bike Pack', avatar: 'directions_bike' },
          { icon: 'star_border', title: 'Beach Pack', avatar: 'beach_access' },
          { icon: 'star_border', title: 'Fitness Pack', avatar: 'fitness_center' },
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
      }

    }
  });

