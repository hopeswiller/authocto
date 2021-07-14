const redis = require("redis");
const client = redis.createClient({
    // host: 'cache', 
    host: 'localhost', 
    port: 63790
});


client.on('error', err => {
    console.log(`Error Connecting to redis : ${err}`);
});
client.on('connect', () => {
    console.log(`Connection to redis successful`);
});

module.exports = {
 cacheData: (data)=>{
    //  cache data for 1 day 
    client.hset('user_profile',data.username,data.password, (err,res)=>{
        if(err) throw err;
        console.log('key set')
    })
},
    getCachedData: (username) => {
    client.hget('user_profile',username, (err,data) =>{
        if(err) console.log(err)
        console.log(`cached_passwd is ${data}`)

        return data
    })
    // console.log(`cached_passwd is ${passwd}`)
}
} 