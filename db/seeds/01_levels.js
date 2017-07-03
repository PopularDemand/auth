
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('levels').del()
    .then(function () {
      // Inserts seed entries
      return knex('levels').insert([
        {name: 'initiate'},
        {name: 'tenderfoot'},
        {name: 'watcher'}
      ]);
    });
};
