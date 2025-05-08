---

title: "Markdown语法"

date: 2025-05-05

tags:

- 服务器

- Markdown

categories:

- 博客

---


```
---

title: "Markdown语法"

date: 2025-05-05

tags:

- 服务器

- Markdown

categories:

- 博客

---
```


`几个#就是几级标题`

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

正文
`**加粗**`
**加粗**

`*斜体*`
*一个※斜体*
`***粗体加斜体***`
***粗体加斜体***
`~~删除线~~`
~~删除线~~
`<u><U>下划线<U></u>`
<u><U>下划线<U></u>

- ➖+空格 无序列表
- 无序列表 2
- 无序列表 3

- 层级无序列表 1
- 无序列表 2
  - 空格+➖+空格   层级无序列表 2.1
  - 无序列表 2.2

`1. 有序表`
1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

`> 引用 读一本好书，就是在和高尚的人谈话。 ——歌德`
> 引用 读一本好书，就是在和高尚的人谈话。 ——歌德

可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：
```

---
分隔线,需要在分隔线的上面空一行
```

---

```
可以使用冒号来定义表格的对齐方式，如下：
| 姓名    | 年龄  | 工作     |
|:----- |:---:| ------:|
| 小可爱   | 18  | 吃可爱多   |
| 小小勇敢  | 20  | 爬棵勇敢树  |
| 小小小机智 | 22  | 看一本机智书 |
```
| 姓名    | 年龄  | 工作     |
|:----- |:---:| ------:|
| 小可爱   | 18  | 吃可爱多   |
| 小小勇敢  | 20  | 爬棵勇敢树  |
| 小小小机智 | 22  | 看一本机智书 |

```
链接：[文字](链接)
脚注：[文字](脚注解释 "脚注名字")
图片：![图片描述](img/taikongren.jpg)
```
[文字](链接)
[文字](脚注解释 "脚注名字")
![图片描述](/img/readme/taikongren.jpg)

```bash
单行代码，如下：
`单行代码`

多行代码，第一行反引号后面表示代码块所使用的语言
支持
bash
clojure，cpp，cs，css
dart，dockerfile, diff
erlang
go，gradle，groovy
haskell
java，javascript，json，julia
kotlin
lisp，lua
makefile，markdown，matlab
objectivec
perl，php，python
r，ruby，rust
scala，shell，sql，swift
tex，typescript
verl
xml
yaml
printf("hello word")
```
