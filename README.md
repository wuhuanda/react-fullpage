# react-fullpage-hooks

使用`React Hooks`写的一个关于全屏轮播的小插件，适用作官网

## 依赖

- react
- react-scroll-wheel-handler

## 参数配置

| 参数             | 说明                                                                                                  | 类型           | 可选值                   | 默认值   |
| ---------------- | ----------------------------------------------------------------------------------------------------- | -------------- | ------------------------ | -------- |
| initPage         | 初始页码                                                                                              | number         |                          | 0        |
| direction        | 翻页模式                                                                                              | string         | `vertical`, `horizontal` | vertical |
| duration         | 翻页动画持续时间（单位：毫秒）                                                                        | number         |                          | 300      |
| pageTimeout      | 翻页时间间隔（单位：毫秒）                                                                            | number         |                          | 300      |
| pagination       | 轮播指示器                                                                                            | boolean        |                          | true     |
| paginationType   | 轮播指示器类型                                                                                        | string         | `dot`, `number`          | dot      |
| navigation       | 分页按钮（仅 `direction=vertical` 时有效）                                                            | boolean        |                          | false    |
| renderPrevButton | 渲染上一页分页按钮                                                                                    | function       |                          |          |
| renderNextButton | 渲染下一页分页按钮                                                                                    | function       |                          |          |
| scrollBar        | 确定是否使用站点的滚动条，可自由滚动网站（仅 `direction=vertical` 时有效）                            | boolean        |                          | false    |
| responsiveHeight | 在小于等于该参数设置的高度时可自由滚动网站，与 `scrollBar` 效果一致（仅 `direction=vertical` 时有效） | number         |                          | 0        |
| anchor           | 锚点导航数组（当不使用该功能时默认为: `false`）                                                       | boolean, array |                          | false    |

## 调用方法

### slidePrev()

跳转到上一页

```
ref.slidePrev();
```

### slideNext()

跳转到下一页

```
ref.slideNext();
```

## TODO

- [x] 基础功能（滚轮翻页、键盘翻页）
- [x] 支持水平/垂直模式（左右/上下翻页）
- [x] 支持自定义初始页码
- [x] 支持自定义翻页动画持续时间
- [x] 点击翻页
- [x] 增加轮播指示器
- [ ] 支持自定义轮播点
- [x] 增加分页箭头
- [x] 支持自定义分页按钮
- [ ] 移除`react-scroll-wheel-handler`依赖并实现相同的功能
- [x] 支持触摸滑动分页
- [x] 支持设置普通网页浏览模式
- [x] 支持设置高度阈值且当达到阈值时切换成普通网页浏览模式
- [x] 支持锚点导航
- [ ] 增加过场动画种类
- [ ] 将组件抽离成独立插件并发布 npm
