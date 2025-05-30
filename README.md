# 🗳️ React + Express 選舉系統

本專案為一個前後端分離的選舉系統，前端使用 **React**，後端採用 **Express**，並搭配檔案系統儲存選民與候選人資料。


## 檔案說明
- client資料夾 - 前端頁面
- server資料夾 - 後端伺服器

## 📁 資料夾結構
```
/
├── client                     # 前端 React 應用程式
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public                # 公開資源
│   │   ├── default-photo.jpg
│   │   └── vite.svg
│   ├── src                   # 原始碼
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── class             # 類別定義
│   │   │   ├── Admin.js
│   │   │   ├── User.js
│   │   │   └── Voter.js
│   │   ├── components        # 共用元件
│   │   │   ├── CandidatesProfile.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── NoAccess.jsx
│   │   │   └── Profile.jsx
│   │   ├── data              # 可存放測試資料或暫存資料
│   │   ├── index.css
│   │   ├── js                # 公用函式
│   │   │   ├── generatePassword.js
│   │   │   └── generateString.js
│   │   ├── main.jsx
│   │   ├── pages             # 各頁面元件
│   │   │   ├── 404notfound.jsx
│   │   │   ├── admin.jsx
│   │   │   ├── login.jsx
│   │   │   ├── manage.jsx
│   │   │   ├── user.jsx
│   │   │   ├── vote.jsx
│   │   │   └── welcome.jsx
│   │   └── styles
│   │       └── welcome.css
│   └── vite.config.js        # Vite 設定檔
├── README.md
└── server                    # 後端 Express 伺服器
    ├── app.js               # 伺服器主程式
    ├── class                # 類別模組
    │   ├── Admin.js         # 管理員類別
    │   ├── Candidate.js     # 候選人類別
    │   ├── User.js          # 使用者類別
    │   └── Voter.js         # 選民類別
    ├── data                 # 資料存放區
    │   ├── admin-template.json
    │   ├── admin.json
    │   ├── candidates.json #自動生成-候選人資料
    │   ├── vote.json #自動生成-投票資料
    │   └── voters.json #自動生成-選民資料
    ├── module               # 公用模組
    │   ├── generatePassword.js  #生成亂數密碼
    │   └── generateString.js    #生成亂數帳號名稱
    ├── package-lock.json
    └── package.json
```
