import assert from 'assert';
import { Database } from './helpers/database';
import { UserRepository } from './helpers/modules/users/user.repository';

describe('ObjectionJS Repository Testing', function () {
  let userRepo: UserRepository;

  before(async function () {
    userRepo = new UserRepository(await Database.getInstance());
  });

  beforeEach(async function () {
    await Database.seed();
  });
  describe('Read functions testing', function () {
    it('Should get one user.', async function () {
      const user = await userRepo.getOne({ age: 25 });
      assert.equal(25, user?.age);
      assert.equal('Ahmed', user?.name);
    });

    it('Should not get one user.', async function () {
      const user = await userRepo.getOne({ age: 40 });
      assert.equal(undefined, user);
    });

    it('Should get all users.', async function () {
      const users = await userRepo.getAll({});
      assert.equal(2, users.length);
    });

    it('Should get all users with condition.', async function () {
      const users = await userRepo.getAll({ name: 'Ali' });
      assert.equal(1, users.length);
      assert.equal('Ali', users[0].name);
    });
  });

  describe('Write functions testing', function () {
    it('Should create user.', async function () {
      const userToBeInserted = {
        name: 'Akin',
        age: 28,
      };
      await userRepo.create(userToBeInserted);
      const user = await userRepo.getOne(userToBeInserted);
      assert.equal(userToBeInserted.age, user?.age);
      assert.equal(userToBeInserted.name, user?.name);
    });
  });
});
