# 🗳️ React + Express 選舉系統

本專案為一個前後端分離的選舉系統，前端使用 **React**，後端採用 **Express**，並搭配檔案系統儲存選民與候選人資料。


## 檔案說明
- client資料夾 - 前端頁面
- server資料夾 - 後端伺服器

## 使用教學
1. 進入server/data，複製 admin-template.json，並重新命名為admin.json，並依照以下設定 
```json
    {
        "id":"",        #可先不填
        "name":"",      #管理員名稱
        "account":"",   #管理員帳號
        "password":""   #管理員密碼
    }
```
2. 在server 資料夾使用以下指令，啟動後端伺服器
```cmd
npm start
```
3. 在client 資料夾使用以下指令，啟動前端伺服器
```cmd
npm run dev
```
4. 網頁介面展示
- 主頁面
![主頁面](https://cdn.discordapp.com/attachments/1378012005906256014/1378012026139316405/image.png?ex=683b0d35&is=6839bbb5&hm=b7358cf4c67c060febde0371726c0ee66d0934611e69d190d23c3cea62731544&) 


- 登入頁面
![登入頁面](https://cdn.discordapp.com/attachments/1378012005906256014/1378012698855477370/image.png?ex=683b0dd5&is=6839bc55&hm=b3cbf61b6114236f9118dd93d7dadcf6159debb212b21889c1aa81662a1e65b5&)


- 後台頁面-選民帳號
![後台頁面](https://cdn.discordapp.com/attachments/1378012005906256014/1378012856783736942/image.png?ex=683b0dfb&is=6839bc7b&hm=4b058113f7ea11bd482ee92aca71c887d3d12514a7104704040af1133a6b3677&s)


- 後台頁面-新增候選人
![後台頁面](https://cdn.discordapp.com/attachments/1378012005906256014/1378012902568759397/image.png?ex=683b0e06&is=6839bc86&hm=3e69a73a1605fb8d702e63e960e2515b6857478bada606905b48d284a6b144f8&)

- 後台頁面-候選人
![後台頁面](https://cdn.discordapp.com/attachments/1378012005906256014/1378012931949592576/image.png?ex=683b0e0d&is=6839bc8d&hm=638ed9a7dacdf72a7e056f8ad073c8162a42f93f7fcff061e5a7466ca347d34f&)

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
