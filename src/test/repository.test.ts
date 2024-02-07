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

    it('Should get name only.', async function () {
      const user = await userRepo.getOne(
        { age: 25 },
        {
          select: ['name'],
        },
      );
      assert.deepEqual(user, {
        name: 'Ahmed',
      });
    });

    it('Should get one user with where null.', async function () {
      const user = await userRepo.getOne(
        {},
        {
          whereNull: ['email'],
        },
      );
      assert.equal(30, user?.age);
      assert.equal('Ali', user?.name);
    });

    it('Should get All user with where not null.', async function () {
      const users = await userRepo.getAll(
        {},
        {
          whereNotNull: ['email'],
        },
      );
      assert.equal(2, users?.length);
      assert.equal('Adel', users[1]?.name);
    });

    it('Should not get one user.', async function () {
      const user = await userRepo.getOne({ age: 41 });
      assert.equal(undefined, user);
    });

    it('Should get all users.', async function () {
      const users = await userRepo.getAll({});
      assert.equal(3, users.length);
    });

    it('Should get all users with condition.', async function () {
      const users = await userRepo.getAll({ name: 'Ali' });
      assert.equal(1, users.length);
      assert.equal('Ali', users[0].name);
    });

    it('Should get all users with where in condition.', async function () {
      const users = await userRepo.getAll({}, { whereIn: [{ field: 'name', values: ['Ahmed', 'Ali'] }] });
      assert.equal(2, users.length);
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

    it('Should update user.', async function () {
      const userBeforeUpdate = {
        name: 'Ahmed',
        age: 25,
      };
      const userToBeUpdated = {
        name: 'Yamaç',
        age: 29,
      };
      await userRepo.update(userBeforeUpdate, userToBeUpdated);
      const updatedUser = await userRepo.getOne(userToBeUpdated);
      const oldUser = await userRepo.getOne(userBeforeUpdate);
      assert.equal(oldUser, undefined);
      assert.equal(userToBeUpdated.name, updatedUser?.name);
    });

    it('Should delete user.', async function () {
      const userToBeDeleted = {
        name: 'Ahmed',
        age: 25,
      };
      await userRepo.delete(userToBeDeleted);
      const oldUser = await userRepo.getOne(userToBeDeleted);
      assert.equal(oldUser, undefined);
    });
  });
});
