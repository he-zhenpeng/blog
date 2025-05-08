---
title: "alpine系统搭建hy2节点"

date: 2025-05-08 23:13:00

tags:

- 服务器

- 节点

categories:

- 服务器

- 节点搭建
---





- **更新系统**

```
apk update && apk upgrade
```

- **查看ip**

```
curl ifconfig.me
```

- **alpine中安装hysteria2**

```
wget -O hy2.sh https://raw.githubusercontent.com/zrlhk/alpine-hysteria2/main/hy2.sh  && sh hy2.sh
```

打开V2rayN，选择服务器，选择添加hy2服务器

```
别名：随便
地址：2a01:4f9:6b:47e9::345       ipv6
端口：40443                       去配置文件：/etc/hysteria/config.yaml 查看
密码：5PK35VON4/KM64bxw8cEXtkt    去配置文件：/etc/hysteria/config.yaml 查看
混淆密码：空
跳跃端口范围   空

传输层安全  tls
SNI    bing.com
跳过证书验证   true      其他默认
```

- **卸载Hysteria2**
1. **停止运行中的hy2服务**

```
sudo rc-service hysteria stop
```

2. **禁用开机自启动**

```
sudo rc-update del hysteria
```

3. **删除hy2服务文件**

```
sudo rm /etc/init.d/hysteria
```

4. **删除hy2配置文件**

```
sudo rm -rf /etc/hysteria/
```

5. **确认卸载完成**

```
ps aux | grep hysteria
```

如果**仅显示 `grep hysteria`**，则表明系统中已无 Hysteria2 进程，卸载成功。


