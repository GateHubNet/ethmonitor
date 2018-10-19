const Web3 = require('web3');
const Koa = require('koa');

const url = process.env.ETH_NODE_URL || "http://localhost:8545";
const app = new Koa();
const web3 = new Web3(new Web3.providers.HttpProvider(url, 10000)); // 10s timeout

app.use(async function check(ctx) {
    try {
        const isSyncing = await web3.eth.isSyncing();

        ctx.status = !isSyncing ? 200 : 412;
        ctx.body = { isSyncing: isSyncing };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            error: err.toString(),
        };
    }
});

app.listen(3000);
