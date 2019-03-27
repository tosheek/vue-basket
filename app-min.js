Vue.component("item", {
  template: "#item-box",
  props: ["item_data", "basket_items"],
  methods: {
    addItem: function(item_data) {
      var i = this.findIndex(this.$parent.basket_items, "id", item_data.id);
      if (i < 0) {
          this.pushData();        
      }else{
          this.$parent.basket_items[i].qty += 1;
          this.$parent.basket_items[i].total =this.$parent.basket_items[i].qty*this.$parent.basket_items[i].price;
      }
    },
    pushData: function() {
      this.$parent.basket_items.push({
        img: this.item_data.img,
        title: this.item_data.title,
        price: this.item_data.price,
        qty: 1,
        total: this.item_data.price,
        id: this.item_data.id
      });
    },
    findIndex: function(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
  }
});

Vue.component("basket_item", {
  template: "#buy-box",
  props: ["buy_data", "basket_items"],
  methods: {
    removeItem: function(buy_data) {
      var index = this.$parent.basket_items.indexOf(buy_data);
      this.$parent.basket_items.splice(index, 1);
    },
    plusQty: function(buy_data){
      buy_data.qty += 1;
      buy_data.total = buy_data.qty*buy_data.price;

    },
    minusQty: function(buy_data){
      buy_data.qty -= 1;
      if (buy_data.qty < 0){
        buy_data.qty = 0;
      }
      buy_data.total = buy_data.qty*buy_data.price;

      if (buy_data.qty == 0) 
        this.removeItem(buy_data);
    }
    
  }
});

var app = new Vue({
  el: "#app",
  data: {
    total:0;
    
    items: [
      {
        img: "https://chenyiya.com/codepen/product-1.jpg",title: "Beer Bottle",price: "25",id: "beer"
      },
      {
        img: "https://chenyiya.com/codepen/product-2.jpg",title: "Eco Bag",price: "73",id: "eco-bag"
      },
      {
        img: "https://chenyiya.com/codepen/product-3.jpg",title: "Paper Bag",price: "35",id: "paper-bag"
      }
    ],
    basket_items: []
  },
  mounted() {
    if (localStorage.getItem('basket_items')) {
      try {
        this.basket_items = JSON.parse(localStorage.getItem('basket_items'));
      } catch(e) {
        localStorage.removeItem('basket_items');
      }
    }
  },
  watch:{
    basket_items: function (val) {
      this.save();
    }
  }, 
  methods: {
    save() {
      const parsed = JSON.stringify(this.basket_items);
      localStorage.setItem('basket_items', parsed);
    },

    totalQty: function(){
      var qty = 0;
      this.basket_items.forEach(function(basket_item){
          qty += parseInt(basket_item.qty);
      });
      return qty;      
    },
    total: function(){
      var sum = 0;
      this.basket_items.forEach(function(basket_item){
          sum += parseInt(basket_item.total);
      });
      return sum;
    }
  }
});


