# lottery-server：自学镜像计划·抽奖转盘·Server端

## 项目简介

使用VUE和轻服务实现一个6个奖项，可以点击转动抽奖的抽奖转盘，转盘历经5秒转速逐渐降低直至停止，抽出奖品，包含Web端和Server端。此仓库为Server端。

[服务端地址](https://qc4dgz.web.cloudendpoint.cn/)



## 用户需求·Server

- 奖品通过Server端下发
- 搭建一个简单的运营后台，支持简单的增加奖品、删除奖品、设置中奖概率、设置库存等功能

### 项目结构

│  App.vue   // 主页面入口，调用HelloWorld.vue                                                              

│  main.js                                                                                                                                                                                                     

│                                                                                                                                                                                                              

├─api    //封装axios，与轻服务云函数交互                                                                                    

│      prize-api.js                                                                                                                                                                                            

│                                                                                                                                                                                                                                                                                                                                                                                                            

├─components         // Server端主页面，调用vuetify.js                                                                                                              

│      HelloWorld.vue                                                                                                                                                                                                                                                                                                                                          

│                                                                                                                                                                                                              

└─plugins    // 第三方样式库                                                                                                    

​        vuetify.js 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
