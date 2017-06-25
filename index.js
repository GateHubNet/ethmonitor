const Web3 = require('web3');
const Koa = require('koa');

const url = process.env.ETH_NODE_URL || "http://localhost:8545";
const app = new Koa();
const web3 = new Web3(new Web3.providers.HttpProvider(url));

app.use(async function check(ctx) {
    try {
        const block = await web3.eth.getBlock(web3.eth.blockNumber);
        const time = new Date(block.timestamp * 1000);

        const checkTime = new Date(new Date().setHours(new Date().getHours() - 1));

        console.log(`time ${time} > ${checkTime} = ${time>checkTime}`);

        ctx.status = time > checkTime ? 200 : 412;
        ctx.body = {block: web3.eth.blockNumber};
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            error: err.toString()
        };
    }
});

app.listen(3000);
