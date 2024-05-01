//runs before server starts

// export async function register() {
//     console.log('[On server start] runtime=' + process.env.NEXT_RUNTIME);

//     //register called in all environments and mongodb doesnt support edge runtime
//     if (process.env.NEXT_RUNTIME === 'nodejs') {
//         //this doesn't work for some reason
//         // console.log('[On server start] setting up mongodb...');
//         // const { Database, setup_db } = await import('@src/lib/database/mongodb');
//         // await setup_db(Database.PORTFOLIO);
//     }
// }