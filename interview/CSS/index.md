### CSS
- 常用单位
- 响应式设计
- [flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
  - flex container:
    - flex-direction row/column
    - justify-content center
    - align-items center
    - flex-wrap wrap/nowrap
    - flex-flow flex-direction|flex-wrap
    - align-content

  - flex item:
    - order 0
    - flex-grow 放大
    - flex-shrink 缩小
    - flex-basis 项目主轴空间
    - flex flex-grow|flex-shrink|flex-basis
    - align-self 
- 动画性能优化

- 布局
  - 水平垂直居中
  - 左边固定，右边自适应

- 高清
  - 移动端适配方案

- [bfc](https://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html)
  - 触发条件：```float/absolute/inline-block/table-cell/tabel-caption/overflow !== visible```

  - 特点：
    1. 盒子对齐，左边框或右边框
    2. 外边距折叠，同一个bfc中发生
    3. 防止折叠，不属于同一个bfc
    4. 包含浮动
    5. 防止文字环绕
    6. 多栏布局，自适应

- [positioning](https://www.w3.org/TR/CSS2/visuren.html#positioning-scheme)
  - 定位体系
    - 常规流： bfc ifc rp
    - float：
    - 绝对定位：remove

- line-height