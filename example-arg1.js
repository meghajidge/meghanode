1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
var argv = require('yargs')
    .command('adduser', 'Greets the user', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your first name goes here',
                type: 'string'
            },
            lastname: {
                demand: true,
                alias: 'l',
                description: 'Your last name goes here',
                type: 'string'
            }
        }).help('help');
    })
     
    .help('help')
    .argv;
var command = argv._[0];
 
console.log(argv);
 
if (command === 'adduser' && typeof argv.name !== 'undefind' && typeof argv.lastname !== 'undefined') {
    console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');  
} else if (command === 'adduser' && typeof argv.name !== 'undefined') {
    console.log('Hello ' + argv.name + '!');
} else if (command === 'adduser') {
    console.log('Hello world!');
} 