# 向泽霖 · 个人主页 (GitHub Pages)

这是一个**自包含、零依赖**的个人主页 `index.html`，可直接作为 GitHub Pages 部署。

> 设计风格：明亮渐变 + 毛玻璃卡片 + 滚动动画，含 Hero / 关于 / 技术栈 / 项目 / GitHub 数据 / 研究方向 / 考研进度 / 联系 八个区块，支持深色模式与移动端菜单。

---

## 一、部署步骤（5 分钟搞定）

> 你的 GitHub 用户名是 `hahahaxzl`，因此**个人主页仓库**必须命名为 `hahahaxzl.github.io`。

### 0. 处理你已有的 `zelin-xiang.github.io`
- 如果你想**保留**里面的 Vue 项目（地址还是 `zelin-xiang.github.io`）→ 直接跳过这步，原仓库不动。
- 如果你想**合并到新主页** → 进入 `zelin-xiang.github.io` 仓库 → Settings → 最底部 Danger Zone → **Delete this repository**（删除前先把 Vue 代码备份到本地）。

### 1. 注册 GitHub（还没有账号的话）
打开 https://github.com → 点 Sign up → 用户名必须填 **`hahahaxzl`**（其他名字也可以，但仓库名要和用户名一致，否则不是用户主页）。

### 2. 创建专用仓库
- 右上角 `+` → **New repository**
- **Repository name** 必须填：`hahahaxzl.github.io`（严格大小写）
- 选 **Public**（Pages 免费需要 public）
- 勾选 **Add a README file**（可选）
- 点 **Create repository**

### 3. 上传 index.html
- 进入刚创建的仓库 → 点 **Add file** → **Upload files**
- 把本目录下的 `index.html` 拖进去
- 底部填提交说明（如 `add personal homepage`），点 **Commit changes**

### 4. 开启 Pages（通常自动开启）
- 进仓库 **Settings** → 左侧 **Pages**
- Source 选 **Deploy from a branch** → Branch 选 **main** → **Save**
- 等 1 分钟左右，访问 `https://hahahaxzl.github.io` 即可看到主页 ✅

---

## 二、部署前必须替换的占位内容

页面里所有 `hahahaxzl` 和示例链接都是占位，**请全局替换成你的真实信息**：

| 占位 | 含义 | 出现位置 |
|---|---|---|
| `hahahaxzl` | 你的 GitHub 用户名 | 导航、Hero 按钮、各项目"查看仓库"链接、联系区 |
| `mailto:you@example.com` | 你的邮箱 | 联系区 |
| `https://www.zhihu.com/people/` | 你的知乎主页 | 联系区 |
| `https://space.bilibili.com/` | 你的 B 站主页 | 联系区 |
| 项目"查看仓库 →"链接 | 各项目真实仓库地址 | 项目卡片 |

> 替换方法：用编辑器（VS Code / 记事本）打开 `index.html`，搜索 `hahahaxzl` 全部替换即可。所有需要改的地方我都加了 `⚠️` 注释标记，方便定位。

---

## 三、想更新内容？

- **改文字/项目**：直接编辑 `index.html` 里对应的中文文案，保存后重新上传（或连 Git 推上去）。
- **加项目**：复制一个 `<div class="card proj reveal"> ... </div>` 块，改 emoji、标题、描述、技术标签和链接。
- **换配色**：改 `<style>` 顶部 `:root` 里的 CSS 变量（`--indigo`、`--cyan`、`--coral` 等）。
- **把项目链接指向具体仓库**：当前所有 `https://github.com/hahahaxzl` 都是占位，访问会跳到你用户主页。建议改成对应仓库地址，例如 `https://github.com/hahahaxzl/breakfast-shop`、`https://github.com/hahahaxzl/spacex-site` 等。等你创建/上传了真实仓库后，把 index.html 里 `href="https://github.com/hahahaxzl"` 替换为具体仓库 URL 即可。

---

## 四、已内置的功能

| 功能 | 说明 |
|---|---|
| 🌗 深色模式 | 导航右上角按钮切换；首次访问跟随系统偏好，之后记住你的选择 |
| 📊 GitHub 数据卡片 | 自动拉取「总览 / 连续打卡 / 语言占比」，配色随深浅主题自动切换 |
| 🖼️ 头像光环 | 渐变旋转光环 + 浮动动画（对应 `.avatar` / `.avatar-in` 样式） |
| 📱 移动端菜单 | 窄屏出现 ☰ 汉堡按钮，点击展开导航，点链接自动收起 |
| ✨ 滚动动画 | 卡片进入视口渐显；考研进度条滚动到才加载 |

## 五、还需要你补充的（私人信息，我无法代填）

请在 `index.html` 里搜索替换以下三项：

| 当前占位 | 改成 |
|---|---|
| `mailto:you@example.com` | 你的真实邮箱 |
| `https://www.zhihu.com/people/` | 你的知乎主页 |
| `https://space.bilibili.com/` | 你的 B 站主页 |

**换真实头像**：把照片命名为 `avatar.jpg` 放进仓库，然后把

```html
<div class="avatar-in">泽</div>
```

改成

```html
<div class="avatar-in" style="background-image:url('avatar.jpg');background-size:cover;background-position:center;"></div>
```

## 六、可选进阶

- 绑定自己的域名（Settings → Pages → Custom domain）
- 加 [visitor-badge](https://visitor-badge.laobi.icu/) 访客计数器
- 把统计卡片的 `username=hahahaxzl` 换成任意账号，观察他人数据（调试用）
