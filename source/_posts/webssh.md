---
title: "WebSSH搭建教程"

date: 2025-05-08

tags:

- 服务器

- webssh

categories:

- 服务器

---

# 一、准备工作

-  **Python环境安装**

```PLAINTEXT
apt update && apt upgrade -y
```

| 系统              | 安装Python 2          | 安装Python 3                                      | 安装pip(Python 2)         | 安装pip3(Python 3)        |
|:---------------:|:-------------------:| ----------------------------------------------- | ----------------------- |:-----------------------:|
| Debian/Ubuntu   | apt install python  | apt install python3                             | apt install python-pip  | apt install python3-pip |
| CentOS 7        | yum install python  | 自带 Python 2.7，可选升级 Python 3：yum install python3 | yum install python2-pip | yum install python3-pip |
| CentOS 8/Stream | dnf install python2 | dnf install python3                             | dnf install python2-pip | dnf install python3-pip |

# 二、安装工作

[webssh仓库地址](https://github.com/he-zhenpeng/webssh)

1. 下载webssh安装包命令：

```plaintext
git clone https://github.com/amclubs/webssh
```

2. **绑定Cloudflare域名生成证书**，并上传到服务器指定目录。

```
cd websssh
```

3. 安装webssh命令：

**Python2** 安装webssh命令：

```
pip install webssh
```

**Python3** 安装webssh命令：

```
pip3 install webssh
```

4. 运行webssh命令 **(certfile/keyfile证书目录换成你服务器存储的目录和文件名称)**：

**Python2** 运行webssh命令：

```
nohup python run.py --certfile='/root/cert/809098.pem' --keyfile='/root/cert/809098.key' --sslport=8443 > /dev/null 2>&1 &
```

**Python3** 运行webssh命令：

```
nohup python3 run.py --certfile='/root/cert/809098.pem' --keyfile='/root/cert/809098.key' --sslport=8443 > /dev/null 2>&1 &
```

5. 访问webssh：

```
https://域名:端口
```

# 三、设置开机自动启动webssh

**WorkingDirectory/certfile/keyfile证书目录换成你服务器存储的目录和文件名称**

1. 写一个 service 文件 webssh.service

```
vi /etc/systemd/system/webssh.service
```

```
[Unit]
Description=WebSSH Service
After=network.target

[Service]
Type=simple
WorkingDirectory=/root/webssh
ExecStart=/usr/bin/python3 run.py --certfile='/root/cert/809098.pem' --keyfile='/root/cert/809098.key' --sslport=8443
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

2. 让服务生效

```
systemctl daemon-reload
systemctl enable webssh
systemctl start webssh
```

3. 管理服务

查看状态

```
systemctl status webssh    
```

重启

```
systemctl restart webssh
```

停止

```
systemctl stop webssh
```


