var argv = require('yargs').argv;
var command = argv._[0];

console.log(argv);

if(command == 'hello' && typeof argv.name!=='undefined' && typeof argv.contry!=='undefined')
{
    console.log("Hello " + argv.name +" Your Contry is " + argv.contry);
}else if(command === 'hello')
{
    console.log("Hello world!");
};