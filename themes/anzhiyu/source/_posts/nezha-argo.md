---
title: "部署哪吒 v1-Argo 版"
date: 2025-05-03
tags:
  - 哪吒面板
  - 部署
categories:
  - 哪吒面板
---

## 1. 项目介绍
**项目作者**：老王  
**GitHub 仓库**：[argo-nezha-v1](https://github.com/eooce/node-ws)

本项目是基于 **Node.js** 的 **ws** 库，集成了 **哪吒面板**，并通过 **Cloudflare Tunnel** 提供安全访问。它适用于 **Node 环境的玩具和容器**，支持自动备份到 GitHub 仓库，并且提供一键部署功能。

---

## 2. 部署前置准备

### 必须事项：
1. **CloudFlare 设置：**
   - 开启 **GRPC 流量代理**。
   - 设置 **Tunnel Public Hostname**：
     - 类型：**HTTPS**
     - URL：`localhost:443`
     - **TLS 设置**：
       - 不验证 TLS：开启
       - HTTP2 连接：开启
   - 记录 **argo 域名** 和 **Token**，备用。

2. **GitHub Apps 设置（可选）：**
   - 访问 GitHub 开发者设置 [GitHub Apps](https://github.com/settings/developers)。
   - 新建 OAuth 应用：
     - **Application name**：nezha_v1
     - **Homepage URL**：用于哪吒面板的 **argo** 域名
     - **Authorization callback URL**：`https://用于哪吒面板的argo域名/api/v1/oauth2/callback`
   - 记录 **Client ID** 和 **Client secrets**，备用。

### 可选事项：
- 如果希望备份数据到 GitHub 私有仓库，需要设置 **GitHub Token** 和 **GitHub 仓库信息**。

---

## 3. 快速部署

### VPS 平台一键部署
1. 执行以下一键脚本：
    ```
    bash <(curl -sSL https://raw.githubusercontent.com/yutian81/argo-nezha-v1/github/nezhav1.sh)
    ```
2. 按提示输入以下变量：
    - **GITHUB_TOKEN**：GitHub 的访问令牌。
    - **GITHUB_REPO_OWNER**：GitHub 用户名。
    - **GITHUB_REPO_NAME**：用于备份的 GitHub 仓库名。
    - **BACKUP_BRANCH**：用于备份的 GitHub 仓库分支。
    - **ARGO_AUTH**：Cloudflare Argo Tunnel 令牌（JSON 格式的密钥必须用英文单引号包裹）。
    - **ARGO_DOMAIN**：在 Argo 中设置的哪吒面板域名。

3. 访问面板：
    - 网址：`https://你在argo隧道中设置的面板域名`
    - 初始用户名/密码：`admin/admin`

---

## 4. 手动部署

1. 克隆仓库并进入目录：
    ```
    git clone -b github --depth 1 https://ghproxy.net/https://github.com/yutian81/argo-nezha-v1.git
    cd argo-nezha-v1
    ```

2. 拉取镜像并启动：
    ```
    docker compose pull
    docker compose up -d
    ```

3. 配置文件：
    - 在 `/root/argo-nezha-v1/.env` 文件中填入变量值。
    - 如果需要手动更新，执行：
      ```
      cd argo-nezha-v1
      docker compose pull && docker compose up -d
      ```

---

## 5. PaaS 平台部署

1. 拉取 Docker 镜像：
    ```
    docker pull yutian81/argo-nezha-v1:latest
    ```

2. 设置必要变量，与 VPS 部署相同。

3. 配置平台，暴露 443 端口。

---

## 6. 自动更新

1. 手动更新：
    ```
    cd argo-nezha-v1 && docker compose pull && docker compose up -d
    ```

2. 自动更新：加入系统 **cron** 任务：
    ```
    (crontab -l 2>/dev/null | grep -v "argo-nezha-v1"; echo "0 3 * * * cd /root/argo-nezha-v1 && /usr/bin/docker compose pull && /usr/bin/docker compose up -d >> /var/log/nezha_update.log 2>&1") | crontab -
    ```

---

## 7. 备份与恢复

- **自动备份**：项目支持自动备份到 GitHub 私有仓库。
- **备份脚本**：`/backup.sh` 每天凌晨 2 点执行备份。

**手动备份：**
```
cd argo-nezha-v1 && chmod +x backup.sh && ./backup.sh backup
或
docker exec -it argo-nezha-v1 /backup.sh backup
```
**手动恢复：**
```
# 在vps终端执行
cd argo-nezha-v1 && chmod +x backup.sh && ./backup.sh restore
# 在docker内执行
docker exec -it argo-nezha-v1 /backup.sh restore
```
## 8. 基础设置

### 8.1 Agent 设置

- **Agent 对接地址**：面板域名:443
- **Agent 使用 TLS 连接**：打勾
- **前端真实 IP 请求头**：`nz-realip`（不要填写 `CF-Connecting-lP`）

### 8.2 绑定 GitHub 登录

1. 修改 `/root/argo-nezha-v1/dashboard/config.yaml` 文件，加入 GitHub OAuth 配置：

```
oauth2:
  GitHub:
    client_id: 你的 GitHub Client ID
    client_secret: 你的 GitHub Client Secret
    endpoint:
      auth_url: https://github.com/login/oauth/authorize
      token_url: https://github.com/login/oauth/access_token
    user_id_path: id
    user_info_url: https://api.github.com/user
```
### 8.3 禁止密码登录

1. 登录哪吒管理后台，进入个人设置，开启 **OAuth2 绑定**。

### 8.4 设置前端界面背景图

1. 进入 **系统设置** → **自定义代码**，输入以下代码：

```
<script>
    window.CustomBackgroundImage = "背景图直链";
    window.CustomDesc = "VPS 探针";
</script>
```
### 8.5 设置 Telegram 通知
- 进入 **系统设置** → **通知**，点击 **+**创建通知。配置 **URL** 为以下格式：
```
https://api.telegram.org/bot<tg token>/sendMessage?chat_id=<tg id>&text=#NEZHA#
```
- 请替换 `<tg token>` 和 `<tg id>` 为你自己的 Telegram Bot Token 和 Chat ID。

**设置警报规则**
- 在 **警报规则** 中，点击 **+**创建规则。
- 选择 **离线警报**，并根据需要配置规则，指定警报触发条件。
```
[{"type":"offline","duration":180,"cover":0}]
```
这样就完成了 Telegram 通知和警报规则的设置。
- 其他警报规则请看官方文档






