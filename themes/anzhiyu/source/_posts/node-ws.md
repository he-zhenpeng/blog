---
title: 老王Node-ws部署教程，点亮你的越南鸡~适用于所有Node环境的玩具和容器
date: 2025-05-03 14:00:00
tags:
  - Node.js
  - 哪吒面板
  - 服务器
categories:
  - 技术
---

## 项目介绍

**项目作者**：老王  
**GitHub仓库项目地址**：[node-ws](https://github.com/eooce/node-ws)  
本项目适用于 Node 环境的玩具和容器，基于 Node 第三方的 `ws` 库，集成了哪吒探针服务，并支持自行添加环境变量。

### PaaS 平台设置的环境变量

| 变量名         | 是否必须 | 默认值                         | 备注                                     |
| -------------- | -------- | ------------------------------ | ---------------------------------------- |
| UUID           | 否       | de04add9-5c68-6bab-950c-08cd5320df33 | 开启了哪吒 v1, 请修改 UUID              |
| PORT           | 否       | 3000                           | 监听端口                                 |
| NEZHA_SERVER   | 否       |                                | 哪吒 v1 填写形式：nz.abc.com:8008，哪吒 v0 填写形式：nz.abc.com |
| NEZHA_PORT     | 否       |                                | 哪吒 v1 没有此变量，v0 的 agent 端口    |
| NEZHA_KEY      | 否       |                                | 哪吒 v1 的 NZ_CLIENT_SECRET 或 v0 的 agent 端口 |
| NAME           | 否       |                                | 节点名称前缀，例如：Glitch              |
| DOMAIN         | 是       |                                | 项目分配的域名或已反代的域名，不包括 https:// 前缀 |
| SUB_PATH       | 否       | sub                            | 订阅路径                                 |
| AUTO_ACCESS    | 否       | false                          | 是否开启自动访问保活, false 为关闭, true 为开启, 需同时填写 DOMAIN 变量 |

**域名/sub** 查看节点信息，也是订阅地址，包含 https:// 或 http:// 前缀，非标端口，域名:端口/sub。

**温馨提示**：README.md 为说明文件，请不要上传。

**JS 混淆地址**：[obfuscator.io](https://obfuscator.io)

## 部署教程

以大家口中的“越南鸡”（DataOnline）为例，下面是详细的部署步骤：

### 1. 打开老王 Node-ws 项目地址，下载 `index.js` 和 `package.json` 到本地

### 2. 注册 DataOnline 账号

（因大家基本上都注册过了，这里一笔带过）

1. 进入 DataOnline 官网
2. 邮箱获取验证码认证后，点击产品选购，选择右下角廉价主机，点击 **Select**
3. 选择免费的服务，添加域名，点击 **订购**
4. **Dashboard ➡ 选择你的服务 ➡ Access Control Panel ➡ Click here to access Control Panel**

### 3. 在 CloudFlare 托管的域名中添加一个 A 记录

1. 将 IPV4 地址填写为 `103.137.185.66`，并开启小黄云
2. 然后回到 DataOnline，进入管理页面，账号管理 ➡ 域名设置 ➡ 新增，填入刚才解析的域名（下面所有填写的域名都是这个域名）

### 4. 上传文件到服务器

1. **系统信息和文件 ➡ 文件管理器**
2. 进入 `domains/你的域名/public_html` 目录，将文件上传到当前目录

### 5. 配置并运行 Node.js 应用

1. 在 DataOnline 管理后台，点击 **附加功能 ➡ Setup Node.js App ➡ CREATE APPLICATION**
2. 创建新的程序，选择 **Run NPM Install ➡ Run JS script**
3. **Node.js version** 选择 `22.14.0`
4. **Application root** 填写 `domains/你的域名/public_html`
5. **Application startup file** 填写 `index.js`

### 6. 在浏览器打开并查看节点信息

1. 访问 `https://你的域名/sub` 查看节点信息

### 7. 删除程序

1. 进入系统信息和文件 ➡ 终端，输入 `kill -9 -1` 终止所有进程
2. 进入 **附加功能 ➡ Setup Node.js App**，点击删除按钮
3. 进入账号管理 ➡ 域名设置，勾选域名，点击右上角删除（勾选删除 Web 数据）
4. 最好等待 2-3 分钟再重建，删除后需要等待一段时间释放端口，否则会提示端口被占用

## 注意事项

1. 可在网页终端输入 `ps aux` 检查 node.js 进程是否正常运行
2. 运行 `index.js` 文件耗时可能较长，请耐心等待
3. 若长时间无响应，可先打开 `https://你的域名/sub` 检查节点信息是否生成
4. 若节点信息已生成，哪吒面板已上线，则无需理会响应
5. 若节点信息未生成，或哪吒面板未上线，请删除程序重新部署

