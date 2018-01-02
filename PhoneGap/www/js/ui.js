Vue.component('toast', {
  template: 
  ` 
  <v-snackbar
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      top multi-line
      v-model="snackbar">
      <slot></slot>
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  `,
  data () {
    return {
      snackbar: true,
      color: '',
      mode: '',
      timeout: 6000,
    }
  },
}),
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
          { title: 'Settings' },
          { title: 'Add Items' },
          { title: 'Add Pack' },
          { title: 'Scan Item' }
        ],
        packs: [
          { id: 0, favorite: true, title: 'Fitness Pack', icon: 'fitness_center' },
          { id: 1, favorite: true, title: 'Bike Pack', icon: 'directions_bike' },
          { id: 2, favorite: true, title: 'Beach Pack', icon: 'beach_access' },
          { id: 3, favorite: false, title: 'Fitneess Pack', icon: 'fitness_center' },
          { id: 4, favorite: false, title: 'Golff Pack', icon: 'golf_course' },
          { id: 5, favorite: false, title: 'Bikee Pack', icon: 'directions_bike' },
          { id: 6, favorite: false, title: 'Beaach Pack', icon: 'beach_access' },
          
        //  paginate api from laravel 
        ],
        page: 1,
        //snackbar
        snackbar: false,
        //form
        valid: true,
        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        select: null,
        packSelect: [
          'Pack 1',
          'Pack 2',
          'Pack 3',
          'Pack 4'
        ],
        checkbox: false


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
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }, // end form methods
    
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

