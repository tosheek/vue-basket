Vue.component("item", {
  template: "#item-box",
  props: ["product_data", "basket_items"],
  methods: {
    addItem: function(product_data) {
      var i = this.findIndex(this.$parent.basket_items, "id", product_data.id);
      if (i < 0) {
          this.pushData();        
      }else{
          this.$parent.basket_items[i].qty += 1;
          this.$parent.basket_items[i].total =this.$parent.basket_items[i].qty*this.$parent.basket_items[i].price;
      }
      this.$parent.save();
    },
    pushData: function() {
      this.$parent.basket_items.push({
        img: this.product_data.img,
        title: this.product_data.title,
        price: this.product_data.price,
        qty: 1,
        total: this.product_data.price,
        id: this.product_data.id
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
      
      this.$parent.save();
    },
    plusQty: function(buy_data){
      buy_data.qty += 1;
      buy_data.total = buy_data.qty*buy_data.price;
     
      this.$parent.save();
    },
    minusQty: function(buy_data){
      buy_data.qty -= 1;
      if (buy_data.qty < 0){
        buy_data.qty = 0;
      }
      buy_data.total = buy_data.qty*buy_data.price;

      if (buy_data.qty == 0) 
        this.removeItem(buy_data);

      this.$parent.save();
    }
    
  }
});

var app = new Vue({
  el: "#app",
  data: {
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
  // watch:{
  //   basket_items: function (val) {
  //     this.save();
  //   }
  // }, 
  methods: {
    save() {
      const parsed = JSON.stringify(this.basket_items);
      localStorage.setItem('basket_items', parsed);
    },
    counter: function() {
      let counter = 0;
      this.basket_items.forEach(function(basket_item){
             counter += parseInt(basket_item.qty);
      });
      return counter;      
    },
    getTotal: function(){
      var sum = 0;
      this.basket_items.forEach(function(basket_item){
          sum += parseInt(basket_item.total);
      });
      return sum;
    }
  }
});
