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

        // nfcScanstepper
        nfcScan:1,
        
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

        currentItemNameBack: '',
        currentPackNameBack: '',

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
        writeFalse: false,

        startPacking: false,
      
        email:window.localStorage.getItem("email"),

        // for filter
        filterPackColor: "all",
        filterItemColor: "all",

        nextNfcId: 0,

        currentAmountOfItems: 0,

        newItemScanned:false,

        allPacked: false,

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
    filters: {
      filterColor: function (array, color) {
        var id = someId;
        var item = array.filter(function(color){ return item.color == color;} ).pop();
       
      }
    },
    computed: {
      filterItems: function (array) {
        return this.array.filter(function (color) {
          console.log(color);
          return color == array.color;
        })
      }
     
      
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
            this.startPacking = false;
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
            this.sectionTitle = this.currentPackEdit.name;
            break;
          case "sectionItems":
            this.sectionItems = true;
            this.numberItems = this.userItems.length;
            if(this.addingItemToPack){
              this.sectionTitle = 'Add item to pack';
            } else {
              this.sectionTitle = 'All items (' + this.numberItems + ')';
            }
            
            break;
          case "sectionEditItems":
            this.getNextNfcId();
            this.sectionEditItems = true;
            this.sectionTitle =  this.currentItemEdit.name;
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
            this.sectionTitle = this.currentPackEdit.name;
            break;
        }
        //stop reading nfc tag
        if (url != "sectionPackingPack")
        {
          document.getElementById("nfcStopReading").click();
        }
      },
      nfcCheck() {
        console.log("checking nfc");
        var nfcReadTag = document.getElementById('nfcReadTag').value;

        nfcReadTag = nfcReadTag.replace('en','');
        nfcReadTag = nfcReadTag.replace(' ','');
        var nfcTags = nfcReadTag.split(",");
        for (var i = 0; i < nfcTags.length; i++)
        {
          try {
            nfcTags[i] = parseInt(nfcTags[i]);
          }
          catch (err) {
            console.log(err);
          }
        }
        //alert(nfcTags);
        Materialize.toast('Scanned item', 3500,'toast-style');
        for (var i = 0; i < nfcTags.length; i++)
        {
          if (nfcTags[i] && nfcTags[i] != NaN)
          {
            for (var o = 0; o < this.currentPackItems.length; o++)
            {
              //Materialize.toast(typeof(this.currentPackItems[o].nfcId) + ": " + this.currentPackItems[o].nfcId + " " + typeof(nfcTags[i]) + ": " + nfcTags[i], 3500,'toast-style');
              if (this.currentPackItems[o].nfcId.toString() == nfcTags[i])
              {
                //Materialize.toast('!!got in!!', 3500,'toast-style');
                //console.log(this.currentPackItems[o].id);
                this.itemsInPack[this.currentPackItems[o].id] = true;
              }
            }
          }
        }
        this.navigate('sectionPackingPack');
        this.checkIfWeHaveEverything();
      },
      getNextNfcId() {
        apiUrl = 'https://packwatch.dietervercammen.be/api/get-next-nfc-id';
        axios.get(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          this.nextNfcId = response.data;
          console.log(this.nextNfcId);
        }).catch(error => {
          //future todo: show error in toast
        })
        /* this.nextNfcId = (new Date).getTime(); */
      },
      interactWithPack(amountOfItems) {
        this.currentAmountOfItems = amountOfItems;
        if (this.startPacking) {
          this.prepareForPacking();
        } else {
          this.navigate('sectionEditPack');
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
        console.log("preparing for packing");
        if (!this.currentAmountOfItems) {
          Materialize.toast('This pack is empty', 1500,'toast-style');
        } else {
          document.getElementById("nfcStartReading").click();
          this.startPacking = false;
          this.navigate('sectionPackingPack');
        }
      },
      toggleItemInPack(id) {
        console.log(this.currentPackItems.length);
        this.itemsInPack[id] ? this.itemsInPack[id] = false:this.itemsInPack[id] = true;
        //console.log(this.itemsInPack[id]);
        this.checkIfWeHaveEverything();
      },
      checkIfWeHaveEverything() {
        console.log("checking");
        var amountOfItemsInItemsInPack = Object.keys(this.itemsInPack).length;
        var everything = true;
        console.log("wtf:", amountOfItemsInItemsInPack);
        for (var property in this.itemsInPack) {
          if (this.itemsInPack.hasOwnProperty(property) && !this.itemsInPack[property])
          {
            everything = false;
          }
        }

        if (everything && amountOfItemsInItemsInPack == this.currentPackItems.length)
        {
          this.allPacked = true;
        }
      },
      refreshUserItems() {
        apiUrl = 'https://packwatch.dietervercammen.be/api/getuseritems';
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
        apiUrl = 'https://packwatch.dietervercammen.be/api/getuserpacks';
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
        console.log("logging: " + id);
        if (this.addingItemToPack) {
          for (var i = 0; i < this.currentPackItems.length; i++) {
            if (id == this.currentPackItems[i].id) {
              //todo: toast "item is already in pack"
              Materialize.toast('Item is already in pack', 1500,'toast-style');
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
              'nfcId': response.data.nfcId,
            });
            Materialize.toast('Item added to pack', 1500,'toast-style');
            this.currentPackEdit.amountOfItems++;
            this.currentAmountOfItems++;
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
        apiUrl = 'https://packwatch.dietervercammen.be/api/link/0';
        axios.post(apiUrl, {
          _method: 'delete',
          item_id: id,
          pack_id: this.currentPackEdit.id,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.currentPackEdit.amountOfItems--;
          this.currentAmountOfItems--;
          this.getPackItems(this.currentPackEdit.id);
        }).catch(error => {
          console.log(error);
        });
      },
      getPackItems(id) {
        this.currentPackItems = [];
        console.log("getting pack items");
        apiUrl = 'https://packwatch.dietervercammen.be/api/getpackitems?id=' + id;
        axios.get(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.currentPackItems = response.data;
          this.itemsInPack = {};
          for (var i = 0; i < this.currentPackItems.length; i++)
          {
            var key = this.currentPackItems[i].id;
            this.itemsInPack[key] = false;
          }
        }).catch(error => {
          console.log(error);
        })
      },
      createPack() {
        apiUrl = 'https://packwatch.dietervercammen.be/api/pack';
        axios.post(apiUrl, {
          name: this.packName,
          color: this.currentPackEdit.color,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          this.userPacks.push({
            name: this.packName,
            color:this.currentPackEdit.color,
            id: response.data.id,
            amountOfItems: 0,
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
          color: this.currentItemEdit.color
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          Materialize.toast('Item updated', 1500,'toast-style');
          this.navigate("sectionItems");
        }).catch(error => {
          Materialize.toast('Error updating item', 1500,'toast-style');
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
        //console.log(this.writeSuccess);
        var nfcId = null;
        this.writeSuccess ? nfcId = this.nextNfcId.toString() : nfcId = null;
        console.log(nfcId);
        apiUrl = 'https://packwatch.dietervercammen.be/api/item';
        axios.post(apiUrl, {
          name: this.itemName,
          color: this.currentItemEdit.color,
          nfcId: nfcId,
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + window.localStorage.getItem("accestoken")}
        }).then(response => {
          console.log(response);
          this.userItems.push({
            name: this.itemName,
            color:this.currentItemEdit.color,
            id: response.data.id,
            nfcId: nfcId,
          });
          this.itemName = "";
          this.selectColor = "";
          this.currentItemEdit.color = "",
          this.errorMsg = '';
          this.nextNfcId = null;
          this.newItemScanned = false;

          if (this.addingItemToPack) {
             this.interactWithItem(response.data.id);
          } else {
             numberItems = this.userItems.length;
             Materialize.toast('Item created', 1500,'toast-style');
             this.navigate("sectionItems");
           }
        }).catch(error => {
          alert(JSON.stringify(error));
          //todo: catch & show bad password, email taken errors ...: this.errorMsgs[] = error.response.data
          console.log(error);
          this.errorMsg = 'No user or no location!';
          this.data = [];
          Materialize.toast(this.error.response.data, 1500,'toast-style');
          this.navigate("sectionCreateItem");
        })
      },
      register () {
        apiUrl = 'https://packwatch.dietervercammen.be/api/register';
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
        apiUrl = 'https://packwatch.dietervercammen.be/oauth/token';
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
          window.localStorage.setItem("email", this.$refs.loginemail.value);
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
        
        api = 'https://api.github.com/users/1';
        axios.get(api).then(response => {
        this.data = response.data
        console.log(response.data);
      }).catch(error => {
        this.errorMsg = 'No user or no location!';
        this.data = []
      })

      }

    }
  });

