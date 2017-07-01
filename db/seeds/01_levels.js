
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('levels').del()
    .then(function () {
      // Inserts seed entries
      return knex('levels').insert([
        {id: 1, name: 'initiate'},
        {id: 2, name: 'tenderfoot'},
        {id: 3, name: 'watcher'}
      ]);
    });
};
