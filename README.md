#fis-zoo
基于FIS的前端模块化解决方案（适用于后端模板）

###目录规范：
	|--css                  	公共样式目录
	|   |--base.css
	|   |--common.css
	|--images               	公共图片目录
	|	|--base.png
	|	|--icon.png
	|--modules              	公共模块目录
	|	|--Zepto
	|	|	|--Zepto.js
	|	|--countdown			countdown组件
	|	|	|--css				countdown的私用样式
	|   |   |--images			countdown的私用图片
	|   |   |--js				countdown的其他js
	|   |   |--tpl    			countdown的模板(通过__inline引入，会被解析成模板函数)
	|   |   |--countdown.js     countdown的js
	|   |   |--countdown.less   countdown的css(需要同名，会被自动引入)
	|
	|
	|--pages                	各页面业务逻辑目录
	|   |--index				index目录
	|   |   |--css				index的私用样式
	|   |   |--images			index的私用图片
	|   |   |--js				index的其他js
	|   |   |--tpl    			index的模板(通过__inline引入，会被解析成模板函数)
	|   |   |--index.js     	index的js
	|   |   |--index.less   	index的css(需要同名，会被自动引入)
	|	|
	|   |--list					list目录
	|       |--css
	|       |--images
	|       |--js
	|       |--tpl
	|       |--list.js
	|       |--list.less
	|
	|
	|--views                后端模板
		|--includes         公共模板目录
		|	|--header.phtml
		|	|--footer.phtml
		|--index.phtml
	 	|--list.phtml
