//view instance
const app = Vue.createApp({
    //model
        data() {
            return {
            products: [],
            currentPage: 1,
            pageSize: 5
            }
            },
        computed: {
              paginatedProducts() {
                const startIndex = (this.currentPage - 1) * this.pageSize;
                return this.products.slice(startIndex, startIndex + this.pageSize);
              }
            },
        mounted() { 
            this.fetchProducts();
            },
        methods: {
            async fetchProducts() {
            try {
            const response = await axios.get('https://fakestoreapi.com/products');
            this.products = response.data;
            }catch (error) {
            console.error('Error fetching products:', error);
            }
          },
          nextPage() {
          if (this.currentPage < 4) {
            this.currentPage++;
            }
          },
          prevPage() {
          if (this.currentPage > 1) {
            this.currentPage--;
            }
          }
        }
    })
  app.mount('#app')