const figlet = require('figlet');

 
module.exports = function(){
    
    figlet('Jwt Authentication', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
}