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
         
          
        //  paginate api from laravel 
        ],
        page: 1,
        // nfcScanstepper
        nfcScan:1,
        //snackbar
        snackbar: false,
        //form
        valid: true,
        itemName: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          // (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        selectColor: null,
        colors: [
          'green',
          'red',
          'blue',
          'pink'
        ],
        showNFCStepper: false,
        NFCTimestamp: 0,
        
    },
    mounted() {
      

      

      //axios.defaults.headers.common['Accept'] = 'application/json'
     // axios.defaults.headers.common['Authorization'] = 'value' // for all requests

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
      
      addItem () {

        apiUrl = 'https://packwatch.dietervercammen.be/api/item'
        axios.post(apiUrl, {
          name: this.itemName,
          color: this.selectColor,

        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error.response.data);
          this.errorMsg = 'No user or no location!'
          this.data = []
        })

      },
      register () {
        
        apiUrl = 'https://packwatch.dietervercammen.be/api/register'
        axios.post(apiUrl, {
          name: this.$refs.registername.value,
          email: this.$refs.registeremail.value,
          password: this.$refs.registerpassword.value
        }).then(response => {
          window.localStorage.setItem("accestoken", response.data.access_token);
          window.location.href = 'index.html';
        }).catch(error => {
          //todo: catch bad password, catch email taken, 
          console.log(error.response.data);
          this.errorMsg = 'No user or no location!'
          this.data = []
        })
        //window.localStorage.setItem("accestoken", response);
      },
      login () {

        apiUrl = 'https://packwatch.dietervercammen.be/oauth/token'
        axios.post(apiUrl, {
          username: this.$refs.loginemail.value,
          password: this.$refs.loginpassword.value, 
          grant_type: 'password',
          client_id: '4',
          client_secret: 'I8pD2NrqTzoI0aUCeKTxuzR19yIFXTdFo0PP5sXJ', //todo: maybe set this in phonegap manifest or whatever?
          scope: '*',
          
        }).then(response => {
          window.localStorage.setItem("accestoken", response.data.access_token);
          window.location.href = 'index.html';
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error.response.data);
          this.errorMsg = 'No user or no location!'
          this.data = []
        })

      },
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

