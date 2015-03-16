var fis = module.exports = require('fis');

fis.cli.name = 'fis-zoo';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

//去掉测试数据必须以<!--datastart-->开头 以<!--dataend-->结束
var removeTestData = function(content){
    content = content.replace(/\n/ig, '');
    content = content.replace(/\>\s*\</ig, '><');
    return content.replace(/\<\!\-\-datastart\-\-\>[\s\S]*<\!\-\-dataend\-\-\>/ig, '');
};

fis.config.merge({
    statics: '/static',
    modules: {
        parser: {
            less: 'less',
            tpl: 'utc'
        },
        postprocessor: {
            js: ['jswrapper', 'require-async'],
            html: 'require-async',
            phtml: removeTestData
        },
        postpackager: ['autoload', 'simple'],
        optimizer: {
            html: 'html-minifier'
        }
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
    pack: {
        'pkg/common.js': [
            'modules/mod/**.js',
            'modules/**.js'
            // 'modules/Zepto/**.js',
            // 'modules/tabs/**.js',
            // 'modules/swipeScroll/**.js',
            // 'modules/dialog/**.js',
            // 'modules/errorTips/**.js'
        ],
        'pkg/common.less': [
            'css/common.less',
            'modules/**.less'
        ]
    },
    roadmap: {
        ext: {
            less: 'css',
            tpl: 'js'
        },
        path: [
            {
                //非模块化的组件，如模块解析器
                reg: /^\/modules\/mod\/mod\.js/i,
                isMod: false,
                release: '${statics}/temp/$&'
            },
            {
                //公共组件
                reg: /^\/modules\/([^\/]+)\/(?:.+).js$/i,
                //是组件化的，会被jswrapper包装
                isMod: true,
                //id为文件夹名
                id: '$1',
                release: '${statics}/temp/$&'
            },
            {
                //业务逻辑模块
                reg: /^\/(pages)\/([^\/]+)\/(?:.+).js$/i,
                isMod: true,
                id: '$1/$2',
                release: '${statics}/$&'
            },
            {
                //css文件
                reg: /^(.*)\.(css|less)$/i,
                //启用sprite自动合并，书写需要合并的图片地址的时候，需要在文件地址后面加?__sprite，如: background: url(images/abc.png?__sprite);
                useSprite: true,
                release: '${statics}/$&'
            },
            {
                //图片等媒体文件
                reg: /^(.*)\.(jpg|gif|png|mp3|mp4)$/i,
                release: '${statics}/$&'
            },
            {
                //后端模板
                reg: /^(.*)\.(html|phtml)$/i,
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识，参与编译
                isHtmlLike: true,
                useCache: false,
                release : '${statics}/$&'
            },
            {
                //前端模版
                reg: '**.tpl',
                release: false,
                useOptimizer: false,
                useCache: false
            },
            {
                //打包后的资源
                reg: 'pkg/**.js',
                release: '${statics}/$&'
            },
            {
                //依赖关系表
                reg: 'map.json',
                release: '${statics}/$&'
            },
            {
                //less的mixin文件无需发布
                reg: /^(.*)mixin\.less$/i,
                release : false
            },
            {
                reg: "**.md",
                release: false
            },
            {
                //其他上文未匹配到的
                reg : "**",
                release : false
            }
        ]
    }
});