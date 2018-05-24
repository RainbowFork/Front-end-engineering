# ESLint

> 静态代码检查


## Configuration
> 默认为 .eslintrc.js文件
### 1.安装依赖
```bash
$ npm install eslint --save-dev
$ npm install eslint-plugin-import eslint-config-airbnb-base --save-dev
```
### 2.指定规则
在配置文件是.eslintrc.js，放置在项目的根目录下面。新建这个文件，在里面指定使用 Airbnb 的规则。
```js
{
  "extends": "airbnb-base"
}
```
### 3.定义命令

打开项目的`package.json`，在`scripts`字段里面添加三个脚本。

```javascript
{
  // ...
  "scripts" : {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint **/*.js",
    "lint-html": "eslint **/*.js -f html -o ./reports/lint-results.html",
    "lint-fix": "eslint --fix **/*.js"
  },
  // ...
}
```
除了原有的`test`脚本，上面代码新定义了三个脚本，它们的作用如下。

- `lint`：检查所有`js`文件的代码
- `lint-html`：将检查结果写入一个网页文件`./reports/lint-results.html`
- `lint-fix`：自动修正某些不规范的代码

### 4.运行静态检查命令。
```bash
$ npm run lint
```
### 5.修正错误。

```bash
$ npm run lint-fix
```

