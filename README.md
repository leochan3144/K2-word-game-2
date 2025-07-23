# K2 認詞語遊戲

這是一個專為幼稚園K2學生設計的互動式中文詞語學習遊戲。它包含遊戲模式和練習模式，旨在通過有趣的方式幫助孩子們學習和認識中文詞語。

## 🎯 功能特色

- **🎮 遊戲模式：** 隨機選擇詞語進行測試，提供即時反饋和分數追蹤
- **📚 練習模式：** 允許學生自由探索詞語，並提供語音播放和相關圖片
- **📱 響應式設計：** 在不同設備上提供良好的用戶體驗
- **🔊 語音支援：** 幫助學生學習詞語的正確發音
- **♿ 無障礙設計：** 支援鍵盤導航和螢幕閱讀器
- **🎨 友好界面：** 專為兒童設計的直觀用戶界面

## 🚀 如何運行

### 方法一：直接打開
1. 克隆此倉庫到您的本地機器：
   ```bash
   git clone https://github.com/YOUR_USERNAME/k2_word_game.git
   ```
2. 導航到項目目錄：
   ```bash
   cd k2_word_game
   ```
3. 在您喜歡的瀏覽器中打開 `index.html` 文件。

### 方法二：使用本地服務器（推薦）
1. 在項目目錄中啟動本地服務器：
   ```bash
   # 使用 Python 3
   python3 -m http.server 8000
   
   # 或使用 Node.js
   npx serve .
   ```
2. 在瀏覽器中訪問 `http://localhost:8000`

## 📁 文件結構

```
k2_word_game/
├── index.html              # 主HTML文件
├── README.md               # 項目說明文件
├── .gitignore             # Git忽略文件
├── css/
│   └── style.css          # 樣式表
├── js/
│   ├── main.js            # 主入口文件
│   ├── game.js            # 遊戲邏輯
│   ├── practice.js        # 練習模式邏輯
│   ├── audio.js           # 音頻管理
│   └── utils.js           # 工具函數
├── data/
│   └── wordBank.json      # 詞語數據
└── assets/
    ├── images/
    │   ├── d867d869df8a48849e6b3aeca1fb74a0.gif  # 正確答案動畫
    │   └── ad4d53a006f048ce8889e0f3a14efbe1.gif  # 錯誤答案動畫
    └── audio/
        └── success-fanfare-trumpets-6185.mp3     # 成功音效
```

## 🎮 使用說明

### 遊戲模式
1. 點擊「遊戲模式」按鈕開始
2. 聽取語音播放的詞語
3. 從四個選項中選擇正確答案
4. 查看即時反饋和分數
5. 完成10題後查看最終結果

### 練習模式
1. 點擊「練習模式」按鈕進入
2. 瀏覽所有可用的詞語
3. 點擊任何詞語按鈕聽取發音
4. 查看相關圖片（佔位符）

### 鍵盤快捷鍵
- **ESC鍵：** 返回主選單
- **R鍵：** 重播當前題目語音（遊戲模式中）
- **Tab鍵：** 在互動元素間導航
- **Enter/Space鍵：** 激活按鈕

## 🛠️ 技術特點

### 代碼優化
- **模組化架構：** JavaScript代碼分離為多個專門模組
- **錯誤處理：** 全面的錯誤處理和備用方案
- **性能優化：** 優化的DOM操作和資源載入
- **代碼分離：** HTML、CSS和JavaScript完全分離

### 無障礙設計
- **ARIA標籤：** 完整的無障礙標籤支援
- **鍵盤導航：** 全面的鍵盤操作支援
- **螢幕閱讀器：** 優化的螢幕閱讀器體驗
- **語義化HTML：** 使用語義化的HTML結構

### 響應式設計
- **移動優先：** 針對移動設備優化
- **彈性佈局：** 適應不同螢幕尺寸
- **觸控友好：** 支援觸控操作

## 🔧 自定義和擴展

### 添加新詞語
編輯 `data/wordBank.json` 文件：
```json
{
  "wordBank": [
    {
      "word": "新詞語",
      "options": ["新詞語", "選項2", "選項3", "選項4"]
    }
  ],
  "allWords": ["新詞語", "其他詞語", ...]
}
```

### 修改樣式
編輯 `css/style.css` 文件來自定義外觀。

### 添加新功能
在相應的JavaScript模組中添加新功能：
- `js/game.js` - 遊戲相關功能
- `js/practice.js` - 練習相關功能
- `js/audio.js` - 音頻相關功能

## 🌐 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📝 許可證

本項目採用 MIT 許可證。詳見 [LICENSE](LICENSE) 文件。

## 👨‍💻 開發者

- **Manus AI** - 初始開發和設計

## 🤝 貢獻

歡迎提交問題報告和功能請求！如果您想貢獻代碼，請：

1. Fork 此倉庫
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打開一個 Pull Request

## 📞 支援

如果您遇到任何問題或需要幫助，請：
- 查看 [常見問題](FAQ.md)
- 提交 [Issue](https://github.com/YOUR_USERNAME/k2_word_game/issues)
- 聯繫開發者

## 🔄 更新日誌

### v2.0.0 (2025-07-23)
- 完全重構代碼架構
- 添加模組化JavaScript結構
- 改進無障礙設計
- 優化性能和錯誤處理
- 添加鍵盤導航支援

### v1.0.0 (原始版本)
- 基本遊戲和練習功能
- 語音合成支援
- 響應式設計


