#fis-zoo
基于FIS的前端模块化解决方案，根据自己团队的需求，优化改造了一些功能。  

![version](https://img.shields.io/npm/v/fis-zoo.svg?style=flat-square)
![dep](https://david-dm.org/beefe/fis-zoo.svg?style=flat-square)

####使用方法：
安装：`npm install fis-zoo -g`  
使用：`fis-zoo release` 或 `zoo release` 参数同FIS

####优化改造列表：
1. 支持release到相对目录，需要如下配置：  
`fis.config.set('roadmap.relative', true);`

2. 默认引入了一些常用的依赖和模块配置  
引入的依赖和模块配置可在入口文件index.js中看到

3. 之前老版本的fis没有对模块中的css做特殊的处理，采用的方案是如果这个模块被引用了，那么会给所有的页面默认注入这个模块的css文件（如果有的话）。  
我们将之优化为只有引入这个模块的页面才注入该模块的css文件。（依然没有兼容异步模式，只要引入，不管同步异步，都会提前注入这个模块的css文件）

4. 做了node4.0版本的兼容

5. 修复了动态模块编译时候的warn  
如：`[NOTIC] can't find async resource ['ace/mode/'+opt.language]`

####文档说明

- 支持其他拓展名的模板直接渲染，如 `.phtml`  
首先执行`zoo server start`  
然后执行`zoo server open`
打开目录后，找到`www/node_modules/express/node_modules/send/node_modules/mime/types/mime.types`文件，
搜索`text/html`，找到`text/html					html htm`在htm之后添加`phtml`即可(后期会融合到zoo install中)

####todo

1.  __inline引入html模板的时候，不支持传入自定义数据。
2.  修改zoo-command-install模块，支持从设定好的组件库获取组件，并初始化目录