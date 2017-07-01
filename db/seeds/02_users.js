
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
      {
        id: 1,
        email: 'test@test.com',
        nickname: 'ripley',
        encrypted_password: '70hmE5HRKEh2X0Yd/52mwAKKBy/1uOjMvZMXXYH5aciICnoGMz7w1+Na72HB8eOfC/pPnuZGSkS3WGUSo3czImOf22sehl1hKZcSqRUpUzMvMgUQZfP3DD+mR2cUo4240oWS5dDYT+FNDpZ4d4WrGLvofqE8Ilc3TlT77NCReqk=',
        salt: '93yvd6ZY6ZAPrOn6B6Yhbm8GLz5P4Oz/9p4YtquiZmq7bj2GvFMD6xxCqc/sOZsFSB9+j/067O8zekMSwkHOyg==',
        level_id: 1
      }
      ]);
    });
};
