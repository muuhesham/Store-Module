exports.seed = function(knex) {
    return knex('product').del().then(function () {
            const products = [];
            for (let i = 1; i <= 100; i++) {
                products.push({
                    title: `Product ${i}`,
                    price: (Math.random() * 100).toFixed(2),
                    description: `Description for Product ${i}`,
                    category_id: Math.ceil(Math.random() * 10),
                    image: `http://example.com/product${i}.jpg`
                });
            }
            return knex('product').insert(products);
        });
};
