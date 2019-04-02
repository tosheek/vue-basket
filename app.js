Vue.component("basket_item", {
  template: "#basket-item-template",
  props: ["buy_data", "basket_items"],
  methods: {
    removeItem(buy_data) {
      var index = this.$parent.basket_items.indexOf(buy_data);
      this.$parent.basket_items.splice(index, 1);
      
      this.$parent.save();
    },
    plusQty(buy_data){
      buy_data.qty += 1;
      buy_data.total = buy_data.qty*buy_data.price;
     
      this.$parent.save();
    },
    minusQty(buy_data){
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
  computed: {
    total(){
      let sum = 0;
      let count = 0;
      this.basket_items.forEach((basket_item) => {
          sum += parseInt(basket_item.total);
          count += parseInt(basket_item.qty);
      });
      return {sum,count};
    }

  },
  methods: {
   addItem(product_data) {
      var i = this.findIndex(this.basket_items, "id", product_data.id);
      if (i < 0) {
        this.basket_items.push({
          img: product_data.img,
          title: product_data.title,
          price: product_data.price,
          qty: 1,
          total: product_data.price,
          id: product_data.id
        });
      }else{
          this.basket_items[i].qty += 1;
          this.basket_items[i].total =this.basket_items[i].qty*this.basket_items[i].price;
      }
      this.save();
    },
    findIndex(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },    
    save() {
      const parsed = JSON.stringify(this.basket_items);
      localStorage.setItem('basket_items', parsed);
    }
  }
});
