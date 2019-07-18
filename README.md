# 这是一个学习 黑马的 VUE 制作的 app

# 用心去感受 每一行代码中的 诗情雅意

# 我们是有灵魂的程序员 我们的代码一改就GG

# [开源协议之间有何差异？](https://www.zhihu.com/question/19568896)

## 用(传统方式)命令行把修改过后的代码上传到github
1. git add . 
2. git commit -m "提交信息"
3. git push origin master

## 制作首页 App 组件
1. 完成 Header区域 使用的是 Mint-UI 中的 Header组件
2. 制作底部的 Tabbar 区域 使用的是 MUI 的 Tabbar.html
   * 扩展图标的 css 样式 拷贝到 项目中 扩展字体库 ttf 文件 到项目中
3. 中间区域复制一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link | 设置路由高亮 | 点击 tabbar 中的路由链接, 展示对应的路由组件

## 制作轮播图布局 加载首页轮播图数据
 1. 获取数据 使用 Vue-resource 的 this.$http.get 
 2. 获取到的数据 保存到data 身上 使用v-for 循环渲染 每个item 项 :key="item.id"

 ## 九宫格 改造新闻资讯 路由链接

 ## 新闻资讯 页面制作
 1. 绘制界面 MUI 中的 media-list.html
 2. 使用 vue-resource 获取数据 渲染真实数据

 ## 实现新闻资讯列表 点击跳转到新闻详情 
 1. 列表列表 为 router-link 跳转的时候 提供唯一的Id标识符
 2. 创建新闻详情的组件页面 NewsInfo.vue
 3. 路由模块中,将新闻详情的 路由地址 和 组件页面对应起来

 ## 实现新闻详情 教学视频接口无效了(以后自己在加上) 

 ## 单独封装一个 comment.vue 评论子组件
 1. 先创建一个 单独的 comment.vue 组件模板
 2. 在需要使用 comment 组件的页面中 先手动 导入comment 组件
 import comment from './comment.vue'
 3. 在父组件中 使用 'componets'属性 将刚才导入 comment 组件 注册为自己的子组件
 4. 将注册子组件的时候 注册名称 以标签形式 在页面中 引用即可

 ## 获取所有的评论数据 显示到页面中  
 1. getComments

 ## 实现加载更多评论的功能
 1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
 2. 点击记载更多 让 pageIndex++ 然后重新调用 this.getComments() 方法重新获取最新一页的数据
 3. 为了防止 新数据 覆盖老数据的情况 我们在 点击加载更多的时候 每当获取到新数据 应该让 老数据 调用 数组的concat 方法,拼接上新数组

 ## 发表评论
 1. 文本框做双向数据绑定
 2. 发表按钮绑定一个事件
 3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
 4. 通过 vue-resource发送一个请求 把评论内容提交给 服务器
 5. 当发表评论OK后，重新刷新列表，以查看最新的评论
  + 如果重新调用 getComments 方法刷新评论列表的话 ，可能只能得到 最后一页的评论，前几页的评论获取不到
  + 换一种思路 当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用 数组的 unshift 方法，把最新的评论，追加到data中comments的开头，这样，就能实现刷新评论列表的需求

## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2.  制作 底部的图片列表

## 制作顶部滑动条的坑们 
 1. 需要借助MUI中的 tab-top-webview-main.html
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动 通过检查官方文档 发现这是JS组件 需要被初始化以下
  + 导入 mui.js
  + 调用官方提供的 方式去初始化

  ```
  mui(".mui-scroll-wrapper").scroll({
    deceleration:0.005 //flick 减速系数，系数越大，滑动速度越慢，滑动距离做小，默认为0.005
  })
  ```
 4. 初始化 滑动条的时候，导入的mui.js 但是 控制台报错 
  + 可能是 mui.js 中用到了 'caller','callee','argument'东西，但是，webpack打包好的bundle.js 中 ，默认是启用严格模式的，所以这两者冲突了；
  + 解决方案 ： 1.把mui.js 中的非严格模式的代码改掉，但是不太现实 ； 2. 把webpack 打包时的严格模式禁用掉
  + 最终，我们选择了 plan B 移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
  5. 刚进入 图片页面分享的时候，滑动条无法正常工作，经过我们认真的分析，发现，如果初始化滑动条，必须要等DOM元素加载完毕，所以，我们把 初始化 滑动条的代码，搬到了mounted生命周期函数。
  6. 当滑动条 调试OK之后，发现 tabber无法正常工作了，这时候，我们需要把每个 tabber 按钮的样式中 ’mui-tab-item‘ 重新改一下名字。
  7. 获取所有分类，并渲染 分类列表
  
 ## 制作图片列表区域
  1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件'lazy-load' 
  2. 根据 lazy-load 的使用文档，尝试使用
  3. 渲染图片列表数据

 ## 实现 图片列表的 懒加载改造 样式美化 点击图片 跳转到 图片详情
 1. 在改造 li 成 router-link 的时候 需要使用 tap 属性指定要渲染为 那种元素

 ## 实现 详情页面的布局和美化，同时获取数据渲染页面

 ## 实现 图片详情中 缩略图的功能
 1. 使用插件 vue-preview 这个缩略图插件
 2. import VuePreview from 'vue-preview'; Vue.use(VuePreview)
 3. <vue-preview :slides="slide1" @close="handleClose" class="thumbImg"></vue-preview>
 4. [ 具体使用说明请参考网址 ](https://github.com/LS1231/vue-preview#readme)

 ## 商品列表 页面的基本结构并美化

 ## 尝试在手机上 进行项目的预览和测试 
 1. 保证手机和电脑 在开发项目中 处于同一个WIFI(局域网)环境中 
 2. 打开package.json文件中，在dev脚本中，添加一个--host指令，把当前电脑的ID地址，设置为--host的指令值 