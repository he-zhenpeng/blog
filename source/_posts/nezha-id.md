---
title: 解决哪吒面板删除服务器后 ID 不连续
date: 2025-05-03 00:00:00
tags:
  - 哪吒面板
  - 服务器
categories:
  - 技术
---

## 1、问题描述

本来以为哪吒面板删除服务器后会自动对其进行重新排序，结果确实会1，代码如下：

```
if err == nil {
    // 删除服务器
    singleton.ServerLock.Lock()
    onServerDelete(id)
    singleton.ServerLock.Unlock()
    singleton.ReSortServer()
}
```
然而删除之后 ID 还是不连续的，这让我强迫症犯了非常的难受，而且后台显示不连续就算了，访客查看居然也是不连续的（使用 Neko-Mdui 主题，其他主题不显示服务器 ID，可能没有这个困扰）。

2、代码分析
问题出在哪里呢？我们来看看 ReSortServer 方法，根据说明实现了一个排序功能：

ReSortServer 根据服务器 ID 对服务器列表进行排序（ID 越大越靠前）。

代码如下：

```
func ReSortServer() {
    ServerLock.RLock()
    defer ServerLock.RUnlock()
    SortedServerLock.Lock()
    defer SortedServerLock.Unlock()

    SortedServerList = []*model.Server{}
    SortedServerListForGuest = []*model.Server{}
    for _, s := range ServerList {
        SortedServerList = append(SortedServerList, s)
        if !s.HideForGuest {
            SortedServerListForGuest = append(SortedServerListForGuest, s)
        }
    }

    // 按照服务器 ID 排序的具体实现（ID 越大越靠前）
    sort.SliceStable(SortedServerList, func(i, j int) bool {
        if SortedServerList[i].DisplayIndex == SortedServerList[j].DisplayIndex {
            return SortedServerList[i].ID < SortedServerList[j].ID
        }
        return SortedServerList[i].DisplayIndex > SortedServerList[j].DisplayIndex
    })

    sort.SliceStable(SortedServerListForGuest, func(i, j int) bool {
        if SortedServerListForGuest[i].DisplayIndex == SortedServerListForGuest[j].DisplayIndex {
            return SortedServerListForGuest[i].ID < SortedServerListForGuest[j].ID
        }
        return SortedServerListForGuest[i].DisplayIndex > SortedServerListForGuest[j].DisplayIndex
    })
}
```
嗯，没学过 Golang 看不懂，但是大致可以根据命名看出这个方法仅对列表进行排序，并不重新设置 ID。

3、解决方法
直接编辑 /opt/nezha/dashboard/data/sqlite.db，执行：

```
UPDATE servers
SET id = (
    SELECT COUNT(*) 
    FROM servers AS s 
    WHERE s.rowid <= servers.rowid
);
```
即可解决。
