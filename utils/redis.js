const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient({
    host: process.env.REDIS_HOST || "localhost",
    // port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || 'authocto'
});


// getAsync= promisify(client.hget).bind(client);

// getAsync()
// getAsync.then(console.log).catch(console.error);

client.on("error", err => {
    console.log(`Error Connecting to redis : ${err}`);
});
client.on("connect", () => {
    console.log(`Connection to redis successful`);
});

module.exports = {
    cacheData: data => {
        client.hset("user_profile", data.username, JSON.stringify(data), (err, res) => {
            if (err) throw err;
            console.log(`${data.username} profile cached`);
        });
    },
    getCachedData: async (username) => {
        client.hget = promisify(client.hget);
        // await client.hget("user_profile", username, (err,reply) => {
        //     if (err) console.log(err);
        //     passwd=reply
        // });

        const user_profile = await client.hget("user_profile", username)
        return JSON.parse(user_profile)
    }
};


// 'redis://:authocto@localhost:6379'