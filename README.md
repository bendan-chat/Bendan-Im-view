# Bendan-Im-view 🚀

### 介绍 📖

🚀🚀🚀 Bendan-Im-view，基于 Hooks Admin、 React18、React-Router v6、React-Hooks、Redux && Redux-Toolkit、TypeScript、Vite2、Ant-Design 开源的一套基于 AI 的在线聊天系统框架。

- ./CHANGELOG.md)

### 一、Git 仓库地址 (欢迎 Star⭐)

- GitHub：https://github.com/bendan-chat/Bendan-Im-view

### 二、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite2
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具……）
- 🚀 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🚀 使用 redux 做状态管理，集成 immer、react-redux、redux-persist 开发
- 🚀 集成了两套状态管理，master 分支使用的是 redux || redux-toolkit 分支使用的是 redux-toolkit
- 🚀 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、取消重复请求……）
- 🚀 支持 Antd 组件大小切换、暗黑 && 灰色 && 色弱模式、i18n 国际化（i18n 暂时没配置所有文件，根据项目自行配置）
- 🚀 使用 自定义高阶组件 进行路由权限拦截（403 页面）、页面按钮权限配置
- 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、面包屑导航
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）
- 🚀 使用 WebSocket 进行通讯

### 三、安装使用步骤 📑

- **Clone：**

```text
# GitHub
git clone https://github.com/bendan-chat/Bendan-Im-view.git
```

- **Install：**

```text
npm install
cnpm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
npm run dev
npm run serve
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint

# prettier 格式化代码
npm run lint:prettier

# stylelint 格式化样式
lint:stylelint
```

- **commit：**

```text
# 提交代码（会自动执行 lint:lint-staged 命令）
npm run commit
```

### 四、项目截图

#### 1、登录页：

![hooks-login-light](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220914150533.png)

![hooks-login-dark](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220914150544.png)

#### 2、注册页：

![image-20230227104701717](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104701717.png)

#### 3、找回密码页

![image-20230227104736649](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104736649.png)

![image-20230227104757875](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104757875.png)

4、聊天界面：

![image-20230227104829257](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104829257.png)

#### 5、好友详情

![image-20230227104904125](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104904125.png)

![image-20230227104915248](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104915248.png)

#### 6、语音消息详情

![image-20230227104943944](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104943944.png)

![image-20230227104951529](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227104951529.png)

#### 7、个人详情以及头像上传

![image-20230227105022963](https://cdn.jsdelivr.net/gh/obeast-dragon/cloud-bed/pictures/image-20230227105022963.png)

### 五、文件资源目录 📚

```text
Bendan-Im-View
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 常用 Hooks
│  ├─ language            # 语言国际化
│  ├─ layouts             # 框架布局
│  ├─ routers             # 路由管理
│  ├─ redux               # redux store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ webSocket               # webScoket支持
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```

### 六、浏览器支持

> 默认支持以下浏览器。更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)
>
> **💢 请不要使用 QQ 浏览器开发，QQ 浏览器 不识别 某些 ES6 以上语法**

| ![Edge](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Edge.png) | ![Firefox](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Firefox.png) | ![Chrome](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Chrome.png) | ![Safari](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Safari.png) |
| :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                              last 2 versions                              |                                 last 2 versions                                 |                                last 2 versions                                |                                last 2 versions                                |
