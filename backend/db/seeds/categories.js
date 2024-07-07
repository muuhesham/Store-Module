exports.seed = function(knex) {
    return knex('categories').del().then(function () {
            const categories = [];
            for (let i = 1; i <= 10; i++) {
                categories.push({ name: `Category ${i}` });
            }
            return knex('categories').insert(categories);
        });
};