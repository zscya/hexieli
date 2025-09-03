# 和谐里 · 微信小程序（云开发）

一个面向社区的微信小程序，提供「公告发布/展示」「社区互助」「社区互惠（商品）」「个人中心」等功能，基于微信小程序云开发（数据库/云函数/存储）。

## 功能特性
- **首页**：轮播图、最新公告、互助与互惠信息概览。
- **公告**：展示最近发布的社区公告（取自 `hexieli_gonggao`）。
- **互助**：查看求助/帮助信息列表与详情（取自 `hexieli_helplist`）。
- **互惠（商品）**：浏览社区商品清单与详情（取自 `hexieli_goodslist`）。
- **个人/登录**：个人信息中心与登录入口。
- **管理页（示例）**：订单/商品/统计等管理 Tab（示例数据）。

## 技术栈
- **微信小程序原生框架**（WXML/WXSS/JS）
- **微信云开发**（Cloud Base）：
  - 云函数（`cloudfunctions`）
  - 云数据库（JSON 文档型）
  - 云存储

## 项目结构
```text
hexieli/
├─ cloudfunctions/
│  ├─ getGonggaoData/        # 查询公告（limit 3，时间倒序）
│  ├─ getAllGonggaoData/     # 查询全部公告（时间倒序）
│  ├─ getData/               # 查询互助列表（type=0）
│  ├─ getlitHelpData/        # 查询最新互助（type=0，limit 1，时间倒序）
│  ├─ getShoppingData/       # 查询商品列表（limit 1）
│  └─ getDataShopping/       # 查询全部商品列表
├─ miniprogram/
│  ├─ app.js                 # 云开发初始化、全局数据
│  ├─ app.json               # 页面路由、窗口与 tabBar 配置
│  ├─ request/index.js       # 通用请求封装（loading 控制）
│  ├─ components/            # 公共组件（Tabs、IconTabs、图片上传等）
│  ├─ pages/
│  │  ├─ index/              # 首页：公告/互助/互惠聚合
│  │  ├─ help/               # 互助列表与详情入口
│  │  ├─ things-detail/      # 互助详情
│  │  ├─ shopping/           # 商品列表
│  │  ├─ shopping-detail/    # 商品详情
│  │  ├─ order/              # 订单（占位/示例）
│  │  ├─ manager/            # 管理页（示例 Tab）
│  │  ├─ user/               # 个人中心
│  │  ├─ login/              # 登录
│  │  ├─ usermessage/        # 个人信息详情
│  │  ├─ sentgoods/          # 发布商品
│  │  ├─ sentOrder/          # 发布订单
│  │  ├─ ourinfo/            # 关于我们
│  │  └─ helpeach/           # 互助相关页面
│  └─ static/                # 静态资源（图片、iconfont 等）
├─ project.config.json       # 小程序项目配置
├─ project.private.config.json
├─ uploadCloudFunction.bat   # 云函数一键上传脚本（Windows）
└─ README.md
```

## 主要页面与数据流
- **首页 `pages/index/index`**：
  - `getGonggao_list()` 调用云函数 `getGonggaoData`，展示最近 3 条公告。
  - `getHelp_list()` 调用云函数 `getlitHelpData`，展示最新互助信息。
  - `getGoods_list()` 调用云函数 `getShoppingData`，展示商品（示例 limit 1）。
- **互助 `pages/help/help`**：
  - 通过 `getData` 云函数读取 `hexieli_helplist`（`type: 0`）。
  - 跳转 `things-detail` 展示详情。
- **互惠（商品） `pages/shopping/shopping`**：
  - 通过 `getDataShopping` 云函数读取 `hexieli_goodslist` 全量。
  - 跳转 `shopping-detail` 展示详情。
- **管理页 `pages/manager/manager`**：
  - Tabs 示例（订单/商品/统计），含本地示例数据与 Tab 切换逻辑。

## 云数据库集合
请在云开发控制台创建以下集合（名称需与代码一致）：
- `hexieli_gonggao`：公告。字段示例：`title`, `content`, `time`（用于排序）。
- `hexieli_helplist`：互助信息。字段示例：`type`（示例用 `0`）、`title`, `desc`, `time`。
- `hexieli_goodslist`：商品列表。字段示例：`name`, `price`, `images`, `time`。

> 字段设计请根据业务需要扩展，确保与前端展示/云函数查询字段一致。

## 本地运行与部署
1. **准备工具**：安装并登录「微信开发者工具」。
2. **导入项目**：使用该目录作为小程序项目根目录导入。
3. **开通云开发**：
   - 在微信开发者工具中开启云开发，创建或选择环境，获取「环境 ID」。
   - 在 `miniprogram/app.js` 中设置：
     ```js
     wx.cloud.init({ env: '你的环境ID', traceUser: true })
     ```
4. **创建数据库集合**：在云开发控制台创建上述 3 个集合并导入初始数据（可选）。
5. **部署云函数**：
   - 方法 A（工具内）：右键 `cloudfunctions` 下各函数目录 → 上传并部署：云端安装依赖。
   - 方法 B（Windows 脚本）：使用根目录下 `uploadCloudFunction.bat`（需在脚本中按需调整）。
6. **运行预览**：
   - 在「微信开发者工具」点击预览或真机调试即可。

## 环境变量与配置
- `miniprogram/app.js`：`wx.cloud.init({ env, traceUser })` 中的 `env` 必须设置为你的云环境 ID。
- `miniprogram/envList.js`（如使用）：可统一管理环境列表。
- `miniprogram/request/index.js`：如有服务端 HTTP 接口，可在其中配置 `baseUrl`（当前为空，主要调用云函数）。

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 许可
本项目源于微信云开发模板并做定制功能扩展。若未指定，默认以 MIT 许可开源。可按需修改。

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

