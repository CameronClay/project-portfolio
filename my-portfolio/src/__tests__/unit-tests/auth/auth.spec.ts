// import { get_jwt_token, verify_jwt } from '@src/lib/auth';

// describe('authorization utilities', () => {
//     it('verify_jwt verifies get_jwt_token without errors', async () => {
//         const token = await get_jwt_token('admin', 'admin', false);
//         const payload = await verify_jwt(token);
//         expect(payload.username == 'admin' && payload.is_admin == false).toBe(true);
//     });
// });