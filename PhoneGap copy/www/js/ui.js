Vue.component('modal', {
  
  props: ['header'],
  template: `

  <div id="modal1" class="modal">
    <div class="modal-content">
    <img class="img-align" src="img/danger.png" />
      <h4 class="center-align"><slot name="header"></slot></h4>
      <p><slot></slot></p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat right" @click="deleteModal">Agree</a>
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
    </div>
  </div>
            `,
  methods: {
    cancelModal: function() {
      this.$emit('cancel');
    }, 
    deleteModal: function() {
      this.$emit('delete');
    }
  }
});

Vue.component('modal2', {
  
  props: ['header'],
  template: `

  <div id="modal2" class="modal">
    <div class="modal-content">
    <img class="img-align" src="img/danger.png" />
      <h4 class="center-align"><slot name="header"></slot></h4>
      <p><slot></slot></p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat right" @click="deleteModal">Agree</a>
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
    </div>
  </div>
            `,
  methods: {
    cancelModal: function() {
      this.$emit('cancel');
    }, 
    deleteModal: function() {
      this.$emit('delete');
    }
  }
});

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
        sectionPacks: false,
        sectionCreateItem: false,
        sectionCreatePack: false,
        sectionEditPack: false,
        sectionEditItems: false,
        sectionPackingItem: false,
        sectionDashboard: false,
        sectionPackingPack: false,
        sectionPackItems: false,

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
        showNFCStepperEdit:false,
        NFCTimestamp: 0,

        currentItemEdit:null,
        currentPackEdit:null,

        userPacks: [],
        userItems: [],

        currentItemId: null,

        currentPackName: '',
        currentPackId: null,
        currentPackItems: [],

        addingItemToPack: false,
        showToast:false,
        loggedIn:null,
        modalOpen:false,
        modalPackOpen: false,
        sectionTitle: 'Dashboard',
        numberItems:0,
        numberPacks: 0,

        errorMsg: null,
        validationBoolean: false,
        errorArray: [],

        stepperNumber: 0,

        deleteId: 0, 
        currentItemEdit: [ 'name' ],
        currentPackEdit: [ 'name' ],

        itemsInPack: {},

        writeSuccess: false,
        writeFalse: false
        

    },
    mounted() {
      
      // start at dashboard when app is mounted
      this.navigate('sectionDashboard');
      //if we are on homepage (lol pls don't judge us)
      if (window.location.href.indexOf('index.html') != -1) {
        //todo: show loading screen/icon/whatever & disable everything else until last "then"
        this.refreshUserItems();
        this.refreshUserPacks();

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
        this.sectionPackingItem = false;
        this.sectionDashboard = false;
        this.sectionPackingPack = false;
        this.sectionPackItems = false;
        switch(url){
          case "sectionPacks":
            this.sectionPacks = true;
            this.numberPacks = this.userPacks.length;
            this.sectionTitle = 'All packs (' + this.userPacks.length + ')';
            break;
          case "sectionCreateItem":
            this.sectionCreateItem = true;
            this.sectionTitle = 'Create item';
            break;
          case "sectionCreatePack":
            this.sectionCreatePack = true;
            this.sectionTitle = 'Create pack';
            break;
          case "sectionEditPack":
            this.sectionEditPack = true;
            this.sectionTitle = 'Edit pack';
            break;
          case "sectionItems":
            this.sectionItems = true;
            this.numberItems = this.userItems.length;
            this.sectionTitle = 'All items (' + this.numberItems + ')';
            break;
          case "sectionEditItems":
            this.sectionEditItems = true;
            this.sectionTitle = 'Edit items';
            break;
          case "sectionPackingItem":
            this.sectionPackingItem = true;
            this.sectionTitle = 'Pack item';
            break;
          case "sectionDashboard":
            this.sectionDashboard = true;
            this.sectionTitle = 'Dashboard';
            break;
          case "sectionPackingPack":
            this.sectionPackingPack = true;
            this.sectionTitle = 'Pack pack';
            break;
          case "sectionPackItems":
            this.sectionPackItems = true;
            this.sectionTitle = 'Pack Content';
            break;
        }
      },
      checkBoxChecked(id) {

        $("'#" + id +"'").attr( "checked" );
        // future: API checked om te weten welke je al wel/niet ingescant hebt?

      },
      openModalItem(){
        $('#modal1').modal('open');
      },
      openModalPack(){
        
        $('#modal2').modal('open');
      },
      prepareForPacking() {
        for (var i = 0; i < this.currentPackItems.length; i++)
        {
          var key = this.currentPackItems[i].id;
          this.itemsInPack[key] = false;
        }
      },
      toggleItemInPack(id) {
        this.itemsInPack[id] ? this.itemsInPack[id] = false:this.itemsInPack[id] = true;
        console.log(this.itemsInPack[id]);
      },
      itemsScanned(ndefString) {
        //afzonderlijke id's maken van string
        //per id API call maken naar back-end om item id op te vragen (moet nog geschreven worden in back end)
        //antwoorden van API call (item_id) in itemsInPack[] op true zetten
      },
      refreshUserItems() {
        apiUrl = 'https://packwatch.dietervercammen.be/api/getuseritems'
        axios.get(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          this.userItems = response.data;
          numberItems = this.userItems.length;
        }).catch(error => {
          // logout if unauthorised
          window.location.replace('landing.html');
        })
      },
      refreshUserPacks() {
        //getting packs
        apiUrl = 'https://packwatch.dietervercammen.be/api/getuserpacks'
          axios.get(apiUrl, {
            headers: {
              'Accept': 'application/json',
              'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
          }).then(response => {
            this.userPacks = response.data;
            numberPacks = this.userPacks.length;
          }).catch(error => {
          })
      },
      interactWithItem(id) {
        if (this.addingItemToPack) {
          for (var i = 0; i < this.currentPackItems.length; i++) {
            if (id == this.currentPackItems[i].id) {
              //todo: toast "item is already in pack"
              Materialize.toast('Item is already in pack', 2500,'toast-style');
              return;
            }
          }
          this.addingItemToPack = false;
          //adding item to pack
          apiUrl = 'https://packwatch.dietervercammen.be/api/link'
          axios.post(apiUrl, {
            item_id: id,
            pack_id: this.currentPackEdit.id,
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
            Materialize.toast('Item added to pack', 2500,'toast-style');
            this.navigate("sectionPackItems");
          }).catch(error => {
            console.log(error);
          });
        } else {
          //edit the item (navigate to item detail page)
          this.navigate('sectionEditItems');
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
          this.packName = "";
          this.selectColor = "";
          // this.showToast = true;
          Materialize.toast('Created pack', 1500, 'toast-style');
          this.navigate('sectionPacks');
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error.response.data);
          this.errorMsg = 'No user or no location!'
          this.data = [];
          Materialize.toast('Error creating pack', 1500,'toast-style');
        })
      },
      deleteItem(id) {
        apiUrl = 'https://packwatch.dietervercammen.be/api/item/' + id;
        axios.delete(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.refreshUserItems();
          Materialize.toast('Item deleted', 1500,'toast-style');
          this.navigate('sectionItems');
        }).catch(error => {
          Materialize.toast('Error item deleted', 1500,'toast-style');
          console.log(error);
        });
      },
      deletePack(id) {
        apiUrl = 'https://packwatch.dietervercammen.be/api/pack/' + id;
        axios.delete(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.refreshUserPacks();
          Materialize.toast('Pack deleted', 1500,'toast-style');
          this.navigate('sectionPacks');
        }).catch(error => {
          console.log(error);
          Materialize.toast('Error deleting pack', 1500,'toast-style');
        });
      },
      updateItem(id) {

        apiUrl = 'https://packwatch.dietervercammen.be/api/item/' + this.currentItemEdit.id;
        axios.post(apiUrl, {
          _method: 'patch',
          name: this.currentItemEdit.name,
          color: this.selectColor
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          Materialize.toast('Item updated', 1500,'toast-style');
          this.navigate("sectionItems");
        }).catch(error => {
          Materialize.toast('Error item updating', 1500,'toast-style');
          console.log(error);
        });
      },
      updatePack(id) {

        apiUrl = 'https://packwatch.dietervercammen.be/api/pack/' + this.currentPackEdit.id;
        axios.post(apiUrl, {
          _method: 'patch',
          name: this.currentPackEdit.name,
          color: this.selectColor
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          Materialize.toast('Pack updated', 1500,'toast-style');
          this.navigate("sectionPacks");
        }).catch(error => {
          console.log(error);
          Materialize.toast('Error updating pack', 1500,'toast-style');
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
          this.errorMsg = '';

          if (this.addingItemToPack) {
             this.interactWithItem(response.data.id);
          } else {
             numberItems = this.userItems.length;
             Materialize.toast('Item created', 1500,'toast-style');
             this.navigate("sectionItems");
           }
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error);
          this.errorMsg = 'No user or no location!';
          this.data = [];
          Materialize.toast(this.error.response.data, 1500,'toast-style');
          this.navigate("sectionCreateItem");
        })
      },
      register () {
        apiUrl = 'https://packwatch.dietervercammen.be/api/register'
        axios.post(apiUrl, {
          name: this.$refs.registername.value,
          email: this.$refs.registeremail.value,
          password: this.$refs.registerpassword.value
        }).then(response => {
          Materialize.toast('Register successful', 1500,'toast-style');
          this.validationBoolean = false;
          this.errorMsg = '';
          window.localStorage.setItem("accestoken", response.data.access_token);
          window.location.href ='index.html';
        }).catch(error => {
          //todo: catch bad password, catch email taken,
          this.validationBoolean = true;
          this.errorMsg = error.response.data.message; 
          
          this.errorArray = error.response.data; 
          console.log(error.response.data);
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
          this.validationBoolean = false;
          this.errorMsg = '';
          window.localStorage.setItem("accestoken", response.data.access_token);
          window.location.href ='index.html';
        }).catch(error => {
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error.response.data);
          this.validationBoolean = true;
          this.errorMsg = error.response.data.message;
          this.data = []
        })
      },
      logout() {
        
        window.localStorage.removeItem("accestoken");
        window.location.href ='landing.html';
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
      validate(message) {
        this.errorMessage = this.message;
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

