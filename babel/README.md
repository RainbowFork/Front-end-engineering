# babel

## 命令行转码 babel-cli
### 1.安装
```bash
# abel提供babel-cli工具，用于命令行转码
$ npm install --global babel-cli
# 安装在项目中
$ npm install --save-dev babel-cli
```
### 2.基本用法
```bash
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```
### 3.指定编译规则
```bash
{
  "presets": [
    "es2015"
  ],
  "plugins": []
}
```
### 4.配置输出方式
package.json
```bash
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel cli/src -d cli/lib"
  },
}
```
### 5.转码
```bash
$ npm run build
```
## babel-register 开发环境使用
babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
### 1.安装
```bash
$ npm install --save-dev babel-register
```
### 2.使用
使用时，必须首先加载babel-register。
```js
require("babel-register");
require("./index.js");
```
然后，就不需要手动对index.js转码了。

需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

## babel-polyfill 转换新的API
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码

举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

### 1.安装
```bash
$ npm install --save babel-polyfill
```
### 2.使用
然后，在脚本头部，加入如下一行代码。
```js
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```
Babel默认不转码的API非常多，详细清单可以查看babel-plugin-transform-runtime模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

## babel-core浏览器环境
Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取。

### 1.安装
```bash
$ npm install babel-core@old
```
### 2.使用
运行上面的命令以后，就可以在当前目录的node_modules/babel-core/子目录里面，找到babel的浏览器版本browser.js（未精简）和browser.min.js（已精简）。

然后，将下面的代码插入网页。
```js
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```
上面代码中，browser.js是Babel提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在script标签之中，但是要注明`type="text/babel"`。

另一种方法是使用babel-standalone模块提供的浏览器版本，将其插入网页。
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```
注意，网页中实时将ES6代码转为ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

下面是如何将代码打包成浏览器可以使用的脚本，以Babel配合Browserify为例。首先，安装babelify模块。
```bash
$ npm install --save-dev babelify babel-preset-es2015
```
然后，再用命令行转换ES6脚本。
```bash
$  browserify script.js -o bundle.js \
  -t [ babelify --presets [ es2015 react ] ]
```
上面代码将ES6脚本script.js，转为bundle.js，浏览器直接加载后者就可以了。
在package.json设置下面的代码，就不用每次命令行都输入参数了。
```js
{
  "browserify": {
    "transform": [["babelify", { "presets": ["es2015"] }]]
  }
}
```
## 配合eslint使用
### 1.安装
```bash
$ npm install --save-dev eslint babel-eslint
```
### 2.配置
然后，在项目根目录下，新建一个配置文件.eslint，在其中加入parser字段。
```js
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```

再在package.json之中，加入相应的scripts脚本。
```js
 {
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```

## 配合webpack使用
### 1.安装
以react项目为例子，package.json中的这些需要安装
```js
   "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.24.1",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-react": "^6.24.1",
    "webpack-dev-server": "^2.11.1",
    "webpack": "^3.10.0"
  }
```
### 2.配置
```js
 "scripts": {
    "dev": "webpack-dev-server --open",
    "build1": "webpack -p"
  }
```
### 3.使用
```bash
# 开环境生成内存中bundle.js文件
npm run dev
# 生产环境构建实际bundle.js文件
npm run build1
```


#### 参考

#### 参考
- [Babel 入门教程 by ruanyifeng](http://www.ruanyifeng.com/blog/2016/01/babel.html)

