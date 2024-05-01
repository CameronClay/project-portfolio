// import '@src/jest/jest-db-setup';

// import * as users_db from '@src/lib/database/c_users';

// //test users collection functions using separate testing database
// describe('Users collection', () => {
//     // const set_and_clear_users = async () => {
//     //     const cres = await users_db.clear_users();
//     //     expect(cres.acknowledged).toBe(true);
//     // };

//     // beforeEach(async () => {
//     //     console.log('[users collection beforeEach]');

//     //     await set_and_clear_users();
//     // }, 10000);

//     // afterAll(async () => {
//     //     console.log('[users collection afterAll]');

//     //     await set_and_clear_users();
//     // }, 10000);

//     it('store and retreive user', async () => {
//         console.log('[users collection store and retreive user]');

//         const cres = await users_db.create_user('user1', 'password');
//         expect(cres.acknowledged).toBe(true);
//         expect(cres.insertedId).not.toBeNull();
//         const user = await users_db.get_user(cres.insertedId.toString());
//         expect(user !== null && user.username == 'user1').toBe(true);
//     });

//     it('store and retreive user by username', async () => {
//         console.log('[users collection store and retreive user by username]');

//         const cres = await users_db.create_user('user1', 'password');
//         expect(cres.acknowledged).toBe(true);
//         expect(cres.insertedId).not.toBeNull();
//         const user = await users_db.get_user_by_username('user1');
//         expect(user !== null && user.username == 'user1').toBe(true);
//     });

//     it('store and delete user', async () => {
//         console.log('[users collection store and delete user]');

//         const cres = await users_db.create_user('user1', 'password');
//         expect(cres.acknowledged).toBe(true);
//         expect(cres.insertedId).not.toBeNull();
//         const dres = await users_db.delete_user(cres.insertedId.toString());
//         expect(dres.acknowledged).toBe(true);
//         const user = await users_db.get_user(cres.insertedId.toString());
//         expect(user === null).toBe(true);
//     });

//     it('store and delete user by username', async () => {
//         console.log('[users collection store and delete user by username]');

//         const cres = await users_db.create_user('user1', 'password');
//         expect(cres.acknowledged).toBe(true);
//         expect(cres.insertedId).not.toBeNull();
//         const dres = await users_db.delete_user_by_username('user1');
//         expect(dres.acknowledged).toBe(true);
//         const user = await users_db.get_user(cres.insertedId.toString());
//         expect(user === null).toBe(true);
//     });

//     it('store and clear users', async () => {
//         console.log('[users collection store and clear users]');

//         await users_db.create_user('user1', 'password');
//         await users_db.create_user('user2', 'password1');
//         const clrres = await users_db.clear_users();
//         expect(clrres.acknowledged).toBe(true);
//         const users = await users_db.get_users();
//         expect(users.length == 0).toBe(true);
//     });

//     it('get user by username', async () => {
//         console.log('[users collection get user by username]');

//         await users_db.create_user('user1', 'password');
//         const user = await users_db.get_user_by_username('user1');
//         expect(
//             user !== null &&
//             user.username == 'user1' &&
//             user.password == 'password'
//         ).toBe(true);
//     });
// });
