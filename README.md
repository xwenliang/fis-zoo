#fis-zoo
基于FIS的前端模块化解决方案，根据自己团队的需求，优化改造了一些功能。
<br>
<br>
####使用方法：
安装：`npm install fis-zoo -g`
<br>
使用：`fis-zoo release` 或 `zoo release` 参数同FIS

####优化改造列表：
1. 支持release到相对目录，需要如下配置：
<br>
`fis.config.set('roadmap.relative', true);`

2. 默认引入了一些常用的依赖和模块配置
<br>
引入的依赖和模块配置可在入口文件index.js中看到

3. 之前老版本的fis没有对模块中的css做特殊的处理，采用的方案是如果这个模块被引用了，那么会给所有的页面默认注入这个模块的css文件（如果有的话）。
<br>
我们将之优化为只有引入这个模块的页面才注入该模块的css文件。（依然没有兼容异步模式，只要引入，不管同步异步，都会提前注入这个模块的css文件）

4.  修改前端模板预编译模块
<br>
之前依赖的fis-parser-utc模块，使用了underscore来解析前端模板，解析出来的模板函数使用了with，导致了无法使用严格模式。并且在模板中使用`<%- %>`的方式防xss输出时，会调用underscore的`_.escape`，而如果该项目中没有引入underscore的话，势必会`_ is not defined`。而单独为了使用这个方法而引入underscore，显然得不偿失