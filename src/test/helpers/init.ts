import { Database } from './database';

before(function (done) {
  Database.init()
    .then(() => {
      done();
    })
    .catch((err: any) => {
      console.log('before', err);
      done(err);
    });
});

after(function (done) {
  Database.teardown()
    .then(() => {
      done();
    })
    .catch((err: any) => {
      console.log('aaaa', err);
      done(err);
    });
});
