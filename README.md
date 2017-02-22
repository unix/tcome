### T-COME, [中文](https://github.com/WittBulter/tcome/blob/master/README_CN.md)
#### next blog, present for you.  

I'm not perfect, i'm sorry.

[PREVIEW](http://wittsay.cc/) &nbsp; [API](http://wittsay.cc/doc)  &nbsp; 

This is a blog, based on nodejs and mongodb.  
If you need a frontend, goto [tcome-frontend](https://github.com/WittBulter/tcome-frontend)

## FEATURES
* Support login/register/manage
* Any users can publish articles
* Support comments
* Canonical interface(RESTfulAPI)，highly scalable
* Search and more configuration
* Elegant code
* More features are under development... 

## DEVELOP
tips: require node-gyp，see [node-gyp](https://github.com/nodejs/node-gyp)
```sh
* install package
$ npm install

* install sails.js
$ sudo npm install sails -g

* install grunt (optional, if you need)
$ sudo npm install grunt -g
```


**run:**
```sh
* if node version < 7.6.0 (npm start = node --harmony-async-await app.js)
$ npm start
* if node version >= 7.6.0
$ sails lift
```

**make api doc:**
```sh
$ npm install apidoc -g
$ npm run api
```

**create file:**
```sh

$ sails generate api <foo>

$ sails generate model <foo> [attribute1:type1, attribute2:type2 ... ]

$ sails generate controller <foo> [action1, action2, ...]
```

## DEMO
![demo1](http://static.wittsay.cc/tcome-demo-1.png)
![demo2](http://static.wittsay.cc/tcome-demo-2.png)


## TEAM
TCOME developed by WittBulter，any question，please contact me:

[![Witt Bulter](http://obqqxnnm4.bkt.clouddn.com/11304944.gif?imageView2/1/w/100)](https://github.com/WittBulter) |  
:---:|
[Witt Bulter](https://github.com/WittBulter) |



