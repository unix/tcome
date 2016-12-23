<h1>
Witt-Blog
</h1>

[文档](http://test.wittsay.cc/doc) &nbsp;  [测试地址](http://test.wittsay.cc/)

这是基于NodeJs,MongoDB的博客系统，它负责基础的API服务。如需要与之契合的前端项目请前往[前端项目](https://github.com/WittBulter/sails-blog-frontend)


## 开发者
需要编译环境，具体配置请参阅[node-gyp](https://github.com/nodejs/node-gyp)
```sh
* 安装依赖
$ npm install

* 安装全局sails
$ sudo npm install sails -g

* 安装全局grunt (sails)
$ sudo npm install grunt -g
```


**运行:**
```sh
* 挂起服务 默认监听1337端口
$ sails lift
```

**生成文档:**
```sh
$ npm install apidoc -g
$ npm run api
```

**创建sails:**
```sh

$ sails generate api <foo>

$ sails generate model <foo> [attribute1:type1, attribute2:type2 ... ]

$ sails generate controller <foo> [action1, action2, ...]
```


## 社区支持
- [StackOverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [What are the best video tutorials for Node.js or Sails.js?](https://www.quora.com/What-are-the-best-video-tutorials-for-Node-js-or-Sails-js) (Quora)
- [Up and Running in Node.js](http://www.lynda.com/Node.js-tutorials/Up-Running-Node.js/370605-2.html) (Sails basics are covered towards the end of this video course on Lynda)


## 团队
blog由WittBulter开发，如果你需要加入开发团队，请联系我:

[![Witt Bulter](http://obqqxnnm4.bkt.clouddn.com/11304944.gif?imageView2/1/w/100)](https://github.com/WittBulter) |  
:---:|
[Witt Bulter](https://github.com/WittBulter) |



