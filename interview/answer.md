### 1. babel原理

#### babel组成

核心包

- babel-core：Babel compiler core，提供babel编译api，如babel.transform；webpack的babel-loader使用
- babel-parser：词法解析器，生成AST
- babel-traverse：用于对AST的遍历，用于替换、删除、增加树节点
- babel-generator：将AST转换为代码

功能包

- babel-types：用于检验、构建和改变AST树的节点
- babel-template：辅助函数，用于从字符串形式的代码来构建AST树节点
- **babel-helpers-xxx**：一系列预制的babel-template函数，用于提供给一些plugins使用
- babel-code-frame：用于生成错误信息，打印出错误点源代码帧以及指出出错位置
- **babel-plugin-xxx**：babel转译过程中使用到的插件，其中babel-plugin-transform-xxx是transform步骤使用的
- **babel-preset-xxx**：transform阶段使用到的一系列的plugin
- **babel-polyfill**：JS标准新增的原生对象和API的shim，实现上仅仅是core-js和regenerator-runtime两个包的封装
- **babel-runtime**：功能类似babel-polyfill，一般用于library或plugin中，因为它不会污染全局作用域

工具包

- babel-cli：babel的命令行工具，通过命令行对js代码进行转译
- babel-register：通过绑定node.js的require来自动转译require引用的js代码文件

#### babel工作原理

编译分为3部分：**解析（parse）**，**转换（transform）**，**生成（generate）**

过程：

> ES6代码输入 => babylon进行解析 => 得到AST
> => plugin用babel-traverse对AST树进行遍历转译 => 得到新的AST树
> => 用babel-generator通过AST树生成ES5代码

注意：

- babel只是转译新标准引入的语法
- 不转**新标准引入的新的原生对象**
- 不转**部分原生对象新增的原型方法**
- 不转**新增的API**
- 不支持的需要引入poly-fill解决

babel-plugin-transform-runtime作用：

- 把代码中的使用到的ES6引入的新原生对象和静态方法用babel-runtime/core-js导出的对象和方法替代
- 当使用generators或async函数时，用babel-runtime/regenerator导出的函数取代（类似polyfill分成regenerator和core-js两个部分）
- 把Babel生成的辅助函数改为用babel-runtime/helpers导出的函数来替代（babel默认会在每个文件顶部放置所需要的辅助函数，如果文件多的话，这些辅助函数就在每个文件中都重复了，通过引用babel-runtime/helpers就可以统一起来，减少代码体积）

#### Babel的工作过程

![img](http://www.alloyteam.com/wp-content/uploads/2017/04/1490858489_75_w920_h326.png)

#### Node objects

```typescript
interface Node {
  type: string;
  loc: SourceLocation | null;
}
```

```typescript
interface SourceLocation {
  source: string | null;
  start: Position;
  end: Position;
}
```

```typescript
interface Position {
  line: number; // >= 1
  column: number; // >= 0
}
```

这里不得不提下babel的插件体系是怎么样的，babel的插件分为两部分

- babel-preset-xxx
- babel-plugin-xxx

preset: 预设, preset和plugin其实是一个东西，preset定义了一堆plugin list

这里值得一提的是，**preset的顺序是倒着的**，**plugin的顺序是正的**，也就是说

preset：['es2015', 'react'], 其实是先使用react插件再用es2015

plugin：['transform-react', 'transfrom-async-function'] 的顺序是正的遍历节点的时候先用transform-react再用transfrom-async-function

**同时设置了presets和plugins，那么plugins的先运行**；每个preset和plugin都可以再配置自己的option

### 2. React

#### Virtual DOM

- render返回的是虚拟DOM对象
- innerHTML: render html string + 重新创建所有 DOM 元素
- Virtual DOM: render Virtual DOM + diff + 必要的 DOM 更新
- batching把所有的DOM操作搜集起来，一次性提交给真实的DOM。diff算法时间复杂度也从[标准的的Diff算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)的O(n^3)降到了O(n)

**虚拟DOM是使用js对象来表示DOM元素以及元素的嵌套关系**，作用用来比较结构差异，进行局部更新，提高性能
#### 生命周期
- 创建：componentWillMount -> render -> componentDidMount
- 运行：
	- props: componentReciveProps -> shouldComponentUpdate -> componentWillUpdate - > render -> componentDidiUpdate
	- state: shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
- 卸载：componentWillUnmount
#### Diff算法
- tree diff: 逐层对比
- component diff：进行tree diff时，每一层中，组件进行对比
  - 组件类型相同，则**暂时**认为次组件不需要更新
  - 组件类型不同，则移除旧组件，创建新组件，并追加到新页面中
- element diff：进行component diff时，如果两个组件类型相同，则进行元素对比
#### [双向数据绑定](https://www.bilibili.com/video/av25428535/)

**原理：**

#### 创建组件的方式
- 无状态组件：使用**构造函数**创建的组件，没有私有数据以及生命周期函数
- 有状态组件：使用**class**关键字创建的组件，有state以及生命周期函数

### [3. React-router](https://www.bilibili.com/video/av23945063?from=search&seid=4866816382621308390)
- HashRouter：利用hash实现路由切换，配合hashchange事件和`window.location.hash`
- BrowserRouter：利用h5 Api实现路由切换，配合pushState和popstate
- Route
- Link
- Switch
- Redirect：重定向
- React.createContext()可以用来用于组件间数据传递，Provider/Consumer
**原理：**HashRouter中通过`this.props.children`获取Route子节点，监听hashchange事件更新state，依赖Provider的value属性把state传给Route组件。Route中依赖Consumer中的函数可以获取父级state属性，之后取出state中的`location.pathname`与`this.props.path`中的属性进行比较，借助`path-to-regexp`包完成，成功则`return Component`

### 4. CSS

#### 优先级

- 对于选择器中给定的各个**ID属性值**，加 0，1，0，0
- 对于选择器中给定的各个**类属性值、属性选择器或伪类**，加 0，0，1，0 
- 对于选择器中给定的**各个元素和伪元素**，加 0，0，0，1 。伪元素是否具有特殊性？在这方面CSS2有些自相矛盾，不过CSS2.1很清楚的指出，伪元素具有特殊性，而且特殊性为 0，0，0，1，同元素特殊性相同
- **结合符(+ > [] ^= $=等等特殊符号)和通配符(*)**对特殊性没有任何贡献，此外通配符的特殊性为 0，0，0，0。全是0有什么意义呢？当然有意义！子元素继承祖先元素的样式根本没有特殊性，因此当出现这种情况后，通配符选择器定义的样式声明也要优先于子元素继承来的样式声明。因为就算特殊性是0，也比没有特殊性可言要强
- 内联样式为1, 0, 0, 0
- !important声明没有特殊值，重要声明组与非重要声明，重要声明组胜出
- 特殊性相同，后面的声明覆盖前面声明

#### 伪类与伪元素
- 伪类：用于向某些选择器添加特殊的效果，**优先级同类选择器，可叠加使用**，使用":"表示
- 伪元素：用于将特殊的效果添加到某些选择器，**优先级同元素选择器，只能使用一个且必须出现在末尾**，使用"::"表示

伪类与伪元素的本质区别在于**是否创造了新元素**

#### 长度单位
- em：是相对于使用em单位的元素的字体大小
- rem：取决于页根元素的字体大小
#### 移动端适配
- 百分比 + 固定高度布局方案
  - 固定屏幕为理想视口宽度
  - 少许的媒体查询设置字体
  - 水平百分比布局
  - 水平方向部分也可以使用弹性布局
- Rem解决方案
  - Rem的大小取值：根据页面的dpr动态改变
  - Rem的取值：1rem = 100px 或者 1rem = 1/10 * 理想视口宽度
  - chrome浏览器的字体小于12px（会被重置为12px）
- 固定设计稿的宽度开发 + 根据设备动态适配缩放
  - 开发直接按照设计稿编写固定尺寸元素
  - 页面加载完成后用js动态根据dpr改变页面的缩放值
  - 推荐使用：**flexible**

#### [Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
设置flex布局后，子元素的`float`、`clear`、`vertical-align`将失效
- **Flex 容器**：采用 Flex 布局的元素
  - 两根轴
    - **main axis**
    - **cross axis**
  - 属性
    - **flex-direction**  属性决定主轴的方向（即项目的排列方向）
      - `flex-direction: row | row-reverse | column | column-reverse;`
    - **flex-wrap**  如果一条轴线排不下，如何换行
      - `flex-wrap: nowrap | wrap | wrap-reverse;`
    - **flex-flow**  是`flex-direction`属性和`flex-wrap`属性的简写形式
      - 默认值：`row nowrap`
    - **justify-content**  定义了项目在主轴上的对齐方式
      - `justify-content: flex-start | flex-end | center | space-between | space-around;`
    - **align-items**  定义项目在交叉轴上如何对齐
      - `align-items: flex-start | flex-end | center | baseline | stretch;`
    - **align-content**  定义了多根轴线的对齐方式
      - `  align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

- **Flex 项目**：所有子元素
  - 属性

    - **order**  定义项目的排列顺序。数值越小，排列越靠前，默认为0
      - `order: <integer>;`
    - **flex-grow**  定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
      - `flex-grow: <number>;`
    - **flex-shrink**  定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
      - `flex-shrink: <number>;`
    - **flex-basis**  定义了在分配多余空间之前，项目占据的主轴空间（main size）
      - `flex-basis: <length> | auto;`
    - **flex**  是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写。默认值为`0 1 auto`
      - `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
      - 该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)
    - **align-self**  属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为auto，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`
      - `align-self: auto | flex-start | flex-end | center | baseline | stretch;`

### 5. Web安全

#### 跨域
	跨域指：端口不同，域名（包括子域，层级）不同，协议不同
常见的方案
  - jsonp只适用get请求，https下不能加载http 的js
  - 设置document.domian为自身或更高一级的父域，且主域必须相同
  - iframe和hash，a.html与b.html通信通过c.html，利用hash传递信息，监听`onhashchange`事件
  - iframe和window.name
  - postMessage
  - CORS 跨域资源共享（Cross-origin resource sharing）
    - 普通跨域请求设置`Access-Control-Allow-Origin`，前端无需修改
    - 带`cookie`请求，前端设置`xhr.withCredentials`，后端设置`Access-Control-Allow-Credentials`为`true`
  - Nginx代理
  - Node 中间件代理
  - WebSocket是HTML5一种新的协议，允许全双工通信，跨域通讯，支持`server push`
  - navigation，iframe之间共享window.navigation，类似window.name
  - Flash URLLoader
### 6. ES6/ES7/ES8
#### Promise
- reject与catch的区别
  - catch可以处理then中的错误，但reject不会，catch兜底
  - 当then中异步throw时，catch无法捕获
  - 当then中异步reject时，catch可以捕获
  - throw会像returny一样，终止控制流程，而reject不会

### 7. JavaScript基础

#### 面向对象

#### 严格模式
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

### 8. 模块化

#### [ES6 Module与CommonJS对比](https://zhuanlan.zhihu.com/p/33843378)
**不同点**
- ES6模块输出的值时值的引用，输出接口动态绑定，而CommonJS输出的是值的拷贝
- ES6模块编译时执行，而CommonJS模块总是在运行时执行

**相同点**
- 模块不会重复执行，模块只会执行一次

**CommonJS模块输出**是值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值（只针对简单类型，对于引用类型是可以获取到最新值的）
- CommonJS重复引入模块并不会重复执行，再次获取模块直接获得暴露的module.exports对象
- 如果要获取CommonJS模块最新的值，则需要更新module.exports对象上的值
- 如果module.exports暴露的是对象，则会获得最新的值

**ES6输出值的引用**不再是生成输出对象的拷贝，而是动态关联模块中的值
**ES6 静态编译，CommonJS 运行时加载**

- import命令会被JavaScript引擎静态分析，优先于模块内的其他内容执行，提到模块执行的最前面，优于模块中的其他部分执行。因此import命令在模块中的位置并不影响程序的输出
- export命令会有变量声明提前的效果

**CommonJS 模块循环依赖**，当遇到require语句时，会执行require模块中的代码，并缓存执行的结果。当下次再次加载时不会重复执行，而是直接取缓存的结果。
**避免循环以来出现混乱的方式是，先声明exports语句，再写require语句**

**ES6 模块循环依赖**，ES6不会再次执行重复加载的模块，又由于ES6动态输出的特性，能保证ES6在任何时候都能获取到其他模块当前的最新值

**动态import()**，由于ES6 模块在编译时会进行静态分析，所以导致无法在条件语句中加载模块，以及也无法加载拼接字符串的模块名称的模块。所有需要等到运行时才能确定的模块在ES6 模块不被允许。
import()允许运行时动态引入ES6 模块，与`require.ensure`的区别
- require.ensure是wepack的产物，主要是在浏览器中使用异步加载模块，从而减小加载文件的体积
- 而import()是为了解决ES6 模块无法在运行时引入模块
  - 动态的import()提供一个基于Promise的API
  - 动态的import()可以在脚本的任务地方使用
  - import接受字符串文字







