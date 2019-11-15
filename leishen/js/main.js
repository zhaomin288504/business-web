console.log('加载成功');
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'index':'index'
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})
//加载首页的代码
require(['index'],function(index){
   index.nav_download();
   index.topnav();
   index.sidenav();
   index.banner_download();
   index.index_body_download();
   index.body_goods();
})