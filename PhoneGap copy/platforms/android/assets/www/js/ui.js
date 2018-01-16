

new Vue({
    el: '#app',
    data: {
      
        e2: 1,
        startNFC: true,
        stopNFC: false,
        e1: '',
        dialog:false,
        stepper1: 0,

        sectionItems: false,
        sectionPacks: true,
        sectionCreateItem: false,
        sectionCreatePack: false,
        sectionEditPack: false,
        sectionEditItems: false,

        settings_items: [
          { title: 'Settings' },
          { title: 'Add Items' },
          { title: 'Add Pack' },
          { title: 'Scan Item' }
        ],
        // packs: [
        //   { id: 0, favorite: true, title: 'Fitness Pack', icon: 'fitness_center' },
        //   { id: 1, favorite: true, title: 'Bike Pack', icon: 'directions_bike' },
        //   { id: 2, favorite: true, title: 'Beach Pack', icon: 'beach_access' },
        //   { id: 3, favorite: false, title: 'Fitneess Pack', icon: 'fitness_center' },
        //   { id: 4, favorite: false, title: 'Golff Pack', icon: 'golf_course' },
        //   { id: 5, favorite: false, title: 'Bikee Pack', icon: 'directions_bike' },
         
          
        // //  paginate api from laravel 
        // ],
        page: 1,
        // nfcScanstepper
        nfcScan:1,
        //snackbar
        snackbar: false,
        //form
        valid: true,
        itemName: '',
        packName: '',
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

        userPacks: [],
        userItems: [],

        currentItemId: null,

        currentPackName: '',
        currentPackId: null,
        currentPackItems: [],

        addingItemToPack: false,
        showToast:false,

    },
    mounted() {
      // start at dashboard when app is mounted
      this.navigate('sectionCreateItem');
      //if we are on homepage (lol pls don't judge us)
      if (window.location.href.indexOf('index.html') != -1) {
        //todo: show loading screen/icon/whatever & disable everything else until last "then"
        apiUrl = 'https://packwatch.dietervercammen.be/api/getuseritems'
        axios.get(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          this.userItems = response.data;
          //getting packs
          apiUrl = 'https://packwatch.dietervercammen.be/api/getuserpacks'
          axios.get(apiUrl, {
            headers: {
              'Accept': 'application/json',
              'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
          }).then(response => {
            this.userPacks = response.data;
            //todo: disable loader & enable navigation, .....
          }).catch(error => {
          })
        }).catch(error => {
        })

      }
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
      navigate(url) {
        
        this.sectionPacks = false;
        this.sectionItems = false;
        this.sectionCreateItem = false;
        this.sectionCreatePack = false;
        this.sectionEditPack = false;
        this.sectionEditItems = false;
        switch(url){
          case "sectionPacks":
            this.sectionPacks = true;
            break;
          case "sectionCreateItem":
            this.sectionCreateItem = true;
            break;
          case "sectionCreatePack":
            this.sectionCreatePack = true;
            break;
          case "sectionEditPack":
            this.sectionEditPack = true;
            break;
          case "sectionItems":
            this.sectionItems = true;
            break;
          case "sectionEditItems":
            this.sectionEditItems = true;
            break;
        }
      },
      interactWithItem(id) {
        if (this.addingItemToPack) {
          this.addingItemToPack = false;
          for (var i = 0; i < this.currentPackItems.length; i++) {
            if (id == this.currentPackItems[i].id) {
              //todo: toast "item is already in pack"
              alert("Item is already in pack");
              return;
            }
          }
          //adding item to pack
          apiUrl = 'https://packwatch.dietervercammen.be/api/link'
          axios.post(apiUrl, {
            item_id: id,
            pack_id: this.currentPackId,
          }, {
            headers: {
              'Accept': 'application/json',
              'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
          }).then(response => {
            console.log(response);
            this.currentPackItems.push({
              'id': response.data.itemId,
              'name': response.data.itemName,
              'color': response.data.itemColor,
            });
            this.navigate("sectionEditPack");
          }).catch(error => {
            console.log(error);
          });
        } else {
          //edit the item (navigate to item detail page)

        }
      },
      unlinkItemFromPack(id) {
        apiUrl = 'https://packwatch.dietervercammen.be/api/link/0'
        axios.post(apiUrl, {
          _method: 'delete',
          item_id: id,
          pack_id: this.currentPackId,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.getPackItems(this.currentPackId);
        }).catch(error => {
          console.log(error);
        });
      },
      getPackItems(id) {
        apiUrl = 'https://packwatch.dietervercammen.be/api/getpackitems?id=' + id;
        axios.get(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.currentPackItems = response.data;
          this.navigate("sectionEditPack");
        }).catch(error => {
          console.log(error);
        })
      },
      createPack() {
        apiUrl = 'https://packwatch.dietervercammen.be/api/pack'
        axios.post(apiUrl, {
          name: this.packName,
          color: this.selectColor,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          this.userPacks.push({
            name: this.packName,
            color:this.selectColor,
            id: response.data.id
          });
          this.currentPackName = this.packName;
          this.packName = "";
          this.selectColor = "";
          this.getPackItems(response.data.id);
          this.showToast = true;
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error.response.data);
          this.errorMsg = 'No user or no location!'
          this.data = []
        })
      },
      deleteItem(id) {

        apiUrl = 'http://packwatch.test/api/item/' + id;
        axios.post(apiUrl, {
          _method: 'delete',
          item_id: id,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          //this.getPackItems(this.currentPackId);
        }).catch(error => {
          console.log(error);
        });
      },
      updateItem(id) {

        apiUrl = 'http://packwatch.test/api/item/' + id;
        axios.post(apiUrl, {
          _method: 'patch',
          item_id: id,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          //this.getPackItems(this.currentPackId);
        }).catch(error => {
          console.log(error);
        });
      },
      createItem() {
        apiUrl = 'https://packwatch.dietervercammen.be/api/item'
        axios.post(apiUrl, {
          name: this.itemName,
          color: this.selectColor,
          nfcId: this.NFCTimestamp.toString()
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.userItems.push({
            name: this.itemName,
            color:this.selectColor,
            id: response.data.id
          });
          this.itemName = "";
          this.selectColor = "";
          if (this.addingItemToPack) {
            this.interactWithItem(response.data.id);
          } else {
            this.navigate("sectionItems");
          }
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error);
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
          window.location.href ='index.html';
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
          window.location.href ='index.html';
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

