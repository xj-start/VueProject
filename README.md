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