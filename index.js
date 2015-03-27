
'use strict';

var fis = module.exports = require('zoo-kernel');

fis.cli = {};
fis.cli.name = 'fis-zoo';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
//colors
fis.cli.colors = require('colors');
//commander object
fis.cli.commander = null;
//output help info
fis.cli.help = function(){
    var content = [
        '',
        '  Usage: ' + fis.cli.name + ' <command>',
        '',
        '  Commands:',
        ''
    ];

    fis.cli.help.commands.forEach(function(name){
        var cmd = fis.require('command', name);
        name = cmd.name || name;
        name = fis.util.pad(name, 12);
        content.push('    ' + name + (cmd.desc || ''));
    });

    content = content.concat([
        '',
        '  Options:',
        '',
        '    -h, --help     output usage information',
        '    -v, --version  output the version number',
        '    --no-color     disable colored output',
        ''
    ]);
    console.log(content.join('\n'));
};

fis.cli.help.commands = [ 'release', 'install', 'server' ];

//output version info
fis.cli.version = function(){
    var content = [
        '',
        'v' + fis.cli.info.version.bold.green,
        ''
        // ' __' + '/\\\\\\\\\\\\\\\\\\\\\\\\'.bold.red + '_____' + '/\\\\\\\\\\\\\\\\\\\\\\'.bold.yellow + '_______' + '/\\\\\\\\\\\\\\\\\\\\\\'.bold.green + '___',
        // '  _' + '\\///////////\\\\\\'.bold.red + '__' + '/\\\\\\////////\\\\\\'.bold.yellow + '____' + '/\\\\\\////////\\\\\\'.bold.green + '__' + '       ',
        // '   _________' + '/\\\\\\//'.bold.red + '__' + '\\/\\\\\\'.bold.yellow +'______' + '\\/\\\\\\'.bold.yellow+'___' + '\\/\\\\\\'.bold.green +'______' + '\\/\\\\\\'.bold.green + '__',
        // '    ______' + '/\\\\\\//'.bold.red + '_____' + '\\/\\\\\\'.bold.yellow + '______' + '\\/\\\\\\'.bold.yellow + '___' + '\\/\\\\\\'.bold.green + '______' + '\\/\\\\\\'.bold.green + '__',
        // '     ___' + '/\\\\\\//'.bold.red + '________' + '\\/\\\\\\'.bold.yellow + '______' + '\\/\\\\\\'.bold.yellow + '___' + '\\/\\\\\\'.bold.green + '______' + '\\/\\\\\\'.bold.green + '__',
        // '      ' + '/\\\\\\//'.bold.red + '___________' + '\\/\\\\\\'.bold.yellow + '______' + '\\/\\\\\\'.bold.yellow + '___' + '\\/\\\\\\'.bold.green + '______' + '\\/\\\\\\'.bold.green + '__',
        // '      ' + '\\//\\\\\\\\\\\\\\\\\\\\\\\\'.bold.red + '___' + '\\//\\\\\\\\\\\\\\\\\\\\\\/'.bold.yellow + '____' + '\\//\\\\\\\\\\\\\\\\\\\\\\/'.bold.green + '___',
        // '       _' + '\\////////////'.bold.red + '_____' + '\\///////////'.bold.yellow + '_______' + '\\///////////'.bold.green + '_____',
        // ''
    ].join('\n');
    console.log(content);
};

function hasArgv(argv, search){
    var pos = argv.indexOf(search);
    var ret = false;
    while(pos > -1){
        argv.splice(pos, 1);
        pos = argv.indexOf(search);
        ret = true;
    }
    return ret;
}

//run cli tools
fis.cli.run = function(argv){

    if(hasArgv(argv, '--no-color')){
        fis.cli.colors.mode = 'none';
    }

    var first = argv[2];
    if(argv.length < 3 || first === '-h' ||  first === '--help'){
        fis.cli.help();
    } else if(first === '-v' || first === '--version'){
        fis.cli.version();
    } else if(first[0] === '-'){
        fis.cli.help();
    } else {
        //register command
        var commander = fis.cli.commander = require('commander');
        var cmd = fis.require('command', argv[2]);
        cmd.register(
            commander
                .command(cmd.name || first)
                .usage(cmd.usage)
                .description(cmd.desc)
        );
        commander.parse(argv);
    }
};

//default config
fis.config.merge({
    modules: {
        parser: {
            less: 'less',
            tpl: 'utc'
        },
        preprocessor: {
            js: 'components',
            css: 'components',
            html: 'components'
        },
        postprocessor: {
            js: ['jswrapper', 'require-async'],
            html: 'require-async'
        },
        postpackager : ['autoload', 'simple'],
        optimizer: {
            js: 'uglify-js',
            css: 'clean-css',
            png: 'png-compressor',
            html: 'html-minifier'
        },
        spriter: 'csssprites',
        packager: 'map',
        deploy: 'default',
        prepackager: 'derived'
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager: {
            autoload: {
                useInlineMap: true,
                include: /^\/modules\/([^\/]+)\/(?:.+).js$/i,
                optDeps: false
            }
        },
        spriter: {
            csssprites: {
                margin: 20,
                scale: 0.5
            }
        },
        lint: {
            jshint: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                node: true
            }
        }
    },
    roadmap: {
        ext: {
            less: 'css',
            tpl: 'js'
        }
    }
});
