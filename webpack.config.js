
const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')


//配置文件 起始就是一个js文件 通过 Node 中的模块操作 向外暴露了 一个 配置对象
module.exports = {
    //配置文件中 需要手动指定 入口 和 出口
    entry:path.join(__dirname,'./src/main.js'),//入口 表示需要 webpack 打包那个文件
    output:{
        path:path.join(__dirname,'./dist'), //指定 打包好的文件 输出到那个目录中去
        filename:'bundle.js'//这是指定 输出的文件的名称
    },
    devServer: {//配置DevServer 命令参数的第二种方式
        // --open --port 3000 --contentBase src --hot
        open:true, //自动打开浏览器
        port:8018, //设置启动的运行端口
        contentBase:'src', //指定托管的根目录
        inline:true,//实时刷新
        //hot:true //启动热更新 第一步
    },
    plugins: [//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            //插件一个 在内存中 生成 HTMl 页面的插件
            template:path.join(__dirname,'./src/index.html'),//指定模板页面
            filename: 'index.html' //指定生成页面的名称
        }),
        new VueLoaderPlugin
    ],
    module: {//这个节点用来配置 所有的第三方模块 加载器
        rules:[//所有的三方模块 匹配规则
            {test: /\.css$/, use:['style-loader','css-loader']},//配置处理 .css文件
            {test: /\.less$/, use:['style-loader','css-loader','less-loader']},
            {test: /\.scss$/, use:['style-loader','css-loader','sass-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=71427&name=[hash:8]-[name].[ext]'},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use:'url-loader'},
            {test: /\.js$/, use:'babel-loader',exclude:/node_modules/},
            {test: /\.vue$/, use:'vue-loader'}]
    },
    resolve:{
        alias:{
            "vue$":"vue/dist/vue.esm.js"
        }
    }
}
//当我们在控制台直接 输入 webpack 命令执行的时候 webpack做了以下几步
/*
    1. 首先 webpack 发现 我们并没有通过命令的形式 给他指定入口和出口
    2. webpack 就会去 项目的 根目录中  查找一个 webpack.config.js 的配置文件
    3. 当找到配置文件 webpack 会执行 这个配置文件 当解析执 行配置文件之后 就得到了 配置文件中 导出的配置对象
    4. 当 webpack 拿到 配置对象后 就拿到了 配置对象 指定的入口和出口 然后进行打包构建
 */