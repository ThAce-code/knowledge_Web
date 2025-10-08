# Git、GitHub 和 Gitee 完整讲解：从基础到进阶功能

## 第一部分：Git 是什么？

### 🗂️比喻：Git 就像一本“时光机日记本”

- 每一段代码的改动，Git 都会帮你记录下来，像是在写日记。

如果出现问题或者想查看之前的版本，Git可以带你“穿越回过去”，找到任意时间点的代码状态。

### 🗂️Git 的主要特点:

1. 版本控制：每次提交都像写了一篇新日记，保存你的开发成果。  
2.分支管理：分支就像章节，可以并行开发而互不干扰。  
3.分布式：每个人都拥有完整的“时光机日记本”，即便没有网络也可以工作。

## 第二部分：GitHub 和 Gitee 是什么？

### 🗂️GitHub：全球化的代码社交云平台

🌐比喻：GitHub是“全球代码图书馆”。

你可以把代码（你的日记）上传到GitHub，随时随地访问，并与他人协作开发，甚至分享给全世界。

○ 优势：拥有庞大的开源社区，是学习和参与开源项目的最佳平台。

### 🗂️Gitee：中国本地化的代码托管平台CN

比喻：Gitee是GitHub的“中国版伙伴”。  
○ 优势：速度快、对国内开发者友好，能与本地工具（如钉钉、企业微信）无缝集成。  
常用于企业内部项目或对私有化部署有需求的团队。

## 第三部分：Git 常用命令及 SSH 配置

### 🗂️SSH：安全认证和便捷连接

🔒比喻：SSH就像“为你的钥匙加上指纹认证”，确保只有你能开门。  
- SSH 允许在本地和远程仓库之间安全通信，并省去每次推送或拉取代码时输入密码的麻烦。

### 🗂️Git常用命令速查表

<table><tr><td>功能</td><td>命令</td><td>比喻</td></tr><tr><td>配置用户名和邮箱</td><td>git config --globaluser.name "你的名字"git config --globaluser.email "你的邮箱"</td><td>设置“署名”，每次提交都会标明是谁的贡献。</td></tr><tr><td>初始化仓库</td><td>git init</td><td>新建一本“时光机日记本”，准备开始记录代码版本。</td></tr><tr><td>添加文件到暂存区</td><td>git add 文件名</td><td>把草稿整理好，放到提交的“草稿区”。</td></tr><tr><td>提交到本地仓库</td><td>git commit -m "提交说明"</td><td>把草稿正式写进日记本，并附上说明。</td></tr><tr><td>推送代码到远程仓库</td><td>git push origin 分支名</td><td>把本地代码同步上传到远程仓库。</td></tr><tr><td>克隆远程仓库</td><td>git clone 仓库地址</td><td>下载别人的代码到本地。</td></tr><tr><td>查看状态</td><td>git status</td><td>检查当前代码的变化情况。</td></tr><tr><td>查看提交历史</td><td>git log</td><td>查看代码的提交记录，回顾开发的“时间线”。</td></tr><tr><td>创建分支</td><td>git branch 分支名</td><td>为不同功能开发创建独立章节，不干扰主线内容。</td></tr><tr><td>切换分支</td><td>git checkout 分支名2/4</td><td>从一个章节切换到另一个章节。</td></tr><tr><td>功能</td><td>Git</td><td>GitHub 和 Git 费完整讲解：从基础到进阶功能-左岗</td></tr><tr><td>合并分支</td><td>git merge 分支名</td><td>把不同章节的内容合并到主线。</td></tr><tr><td>拉取代码</td><td>git pull origin 分支名</td><td>从远程仓库拉取最新代码。</td></tr></table>

### 🗂️SSH配置步骤

- 1.配置个人信息

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

- 2.生成 SSH 密钥

```bash
ssh-keygen -t rsa -C "你的邮箱"
```

- t rsa：使用 RSA 算法生成密钥。  
C：添加备注，通常是你的邮箱地址。

- 3. 添加公钥到远程仓库

GitHub:

进入 Settings > SSH and GPG keys > New SSH key，粘贴公钥并保存。

Gitee:

进入设置  $\rightharpoondown$  安全设置  $\rightharpoonup$  SSH公钥，粘贴公钥并保存。

- 4. 测试连接

测试GitHub:

```bash
ssh -T git@github.com
```
测试Gitee：

```bash
ssh -T git@gitee.com
```
- 5.配置多个SSH密钥（可选）

如果同时使用GitHub和Gitee，可以为它们配置不同的SSH密钥。

在  $\sim /.\mathrm{ssh} / \mathrm{config}$  文件中添加以下内容：

```json
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa

Host gitee.com
    HostName gitee.com          
    User git
    IdentityFile ~/.ssh/id_rsa_gitee
``` 
## 第四部分：GitHub和Gitee的核心功能详解

<table><tr><td>功能</td><td>GitHub</td><td>Gitee</td></tr><tr><td>Fork</td><td>复制项目到个人账户</td><td>同样支持复制项目</td></tr><tr><td>Star</td><td>收藏项目，便于以后查找</td><td>同样支持收藏项目</td></tr><tr><td>Watch</td><td>订阅项目动态</td><td>支持动态订阅</td></tr><tr><td>Issues</td><td>提交问题或建议，记录开发中的待办事项</td><td>问题追踪支持更加本地化</td></tr><tr><td>PullRequest</td><td>提交代码修改供原项目合并</td><td>类似功能</td></tr><tr><td>Actions</td><td>自动化CI/CD工作流</td><td>不支持Actions</td></tr><tr><td>Pages</td><td>托管静态网站（如博客或文档）</td><td>提供类似功能</td></tr><tr><td>Releases</td><td>发布稳定版本，提供下载</td><td>同样支持发布功能</td></tr><tr><td>Webhooks</td><td>自动消息通知</td><td>支持类似功能</td></tr></table>

## 第五部分：总结与对比

### 🗂️Git: 核心工具

Git 是代码版本管理工具，用于记录代码修改历史、创建分支、合并分支等。

### 🗂️GitHub 和 Gitee: 平台对比

- GitHub：全球化，适合参与开源项目和国际化协作，功能丰富。

- Gitee：本地化，适合国内团队和企业，速度快且生态友好。