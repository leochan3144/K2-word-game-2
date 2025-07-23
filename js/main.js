/**
 * K2 認詞語遊戲 - 主入口文件
 */

class K2WordGame {
  constructor() {
    this.wordData = null;
    this.isInitialized = false;
  }

  /**
   * 初始化應用程式
   */
  async init() {
    try {
      console.log('正在初始化 K2 認詞語遊戲...');
      
      // 載入詞語數據
      await this.loadWordData();
      
      // 初始化各個管理器
      this.initializeManagers();
      
      // 設置事件監聽器
      this.setupEventListeners();
      
      // 設置鍵盤導航
      this.setupKeyboardNavigation();
      
      this.isInitialized = true;
      console.log('K2 認詞語遊戲初始化完成');
      
    } catch (error) {
      console.error('應用程式初始化失敗:', error);
      this.showError('應用程式載入失敗，請重新整理頁面');
    }
  }

  /**
   * 載入詞語數據
   */
  async loadWordData() {
    try {
      const response = await fetch('data/wordBank.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.wordData = await response.json();
      console.log('詞語數據載入成功');
      
    } catch (error) {
      console.error('詞語數據載入失敗:', error);
      
      // 使用備用數據
      this.wordData = this.getFallbackData();
      console.warn('使用備用詞語數據');
    }
  }

  /**
   * 獲取備用數據（當JSON載入失敗時使用）
   */
  getFallbackData() {
    return {
      wordBank: [
        { word: "椅子", options: ["椅子", "桌子", "香蕉", "帽子"] },
        { word: "蘋果", options: ["蘋果", "橙子", "氣球", "玩具"] },
        { word: "鞋子", options: ["帽子", "褲子", "鞋子", "書包"] },
        { word: "老師", options: ["學生", "老師", "家長", "朋友"] },
        { word: "圖書", options: ["玩具", "圖書", "餐具", "積木"] }
      ],
      allWords: ["椅子", "桌子", "香蕉", "帽子", "蘋果", "橙子", "氣球", "玩具"]
    };
  }

  /**
   * 初始化各個管理器
   */
  initializeManagers() {
    // 初始化遊戲管理器
    gameManager.init(this.wordData.wordBank);
    
    // 初始化練習管理器
    practiceManager.init(this.wordData.allWords);
    
    console.log('管理器初始化完成');
  }

  /**
   * 設置事件監聽器
   */
  setupEventListeners() {
    // 主選單按鈕
    const gameButton = document.querySelector('#menu button[onclick="startGameMode()"]');
    const practiceButton = document.querySelector('#menu button[onclick="startPracticeMode()"]');
    
    if (gameButton) {
      gameButton.onclick = () => this.startGameMode();
    }
    
    if (practiceButton) {
      practiceButton.onclick = () => this.startPracticeMode();
    }

    // 遊戲模式按鈕
    const nextButton = document.getElementById('nextBtn');
    const gameReturnButton = document.querySelector('#game button[onclick="returnToMenu()"]');
    
    if (nextButton) {
      nextButton.onclick = () => this.nextQuestion();
    }
    
    if (gameReturnButton) {
      gameReturnButton.onclick = () => this.returnToMenuFromGame();
    }

    // 練習模式按鈕
    const practiceReturnButton = document.querySelector('#practice button[onclick="returnToMenu()"]');
    
    if (practiceReturnButton) {
      practiceReturnButton.onclick = () => this.returnToMenuFromPractice();
    }

    // 錯誤處理
    window.addEventListener('error', (event) => {
      console.error('全域錯誤:', event.error);
    });

    // 頁面可見性變化處理
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        audioManager.stopSpeech();
      }
    });
  }

  /**
   * 設置鍵盤導航
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // ESC 鍵返回主選單
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }
      
      // R 鍵重播語音（在遊戲模式中）
      if (event.key === 'r' || event.key === 'R') {
        this.handleRepeatAudio();
      }
    });
  }

  /**
   * 處理 ESC 鍵
   */
  handleEscapeKey() {
    const gameDiv = document.getElementById('game');
    const practiceDiv = document.getElementById('practice');
    
    if (gameDiv && gameDiv.style.display !== 'none') {
      this.returnToMenuFromGame();
    } else if (practiceDiv && practiceDiv.style.display !== 'none') {
      this.returnToMenuFromPractice();
    }
  }

  /**
   * 處理重播音頻
   */
  async handleRepeatAudio() {
    if (gameManager.isGameActive && gameManager.shuffledWordList.length > 0) {
      const currentWord = gameManager.shuffledWordList[gameManager.currentQuestion];
      if (currentWord) {
        try {
          await audioManager.speak(currentWord.word);
        } catch (error) {
          console.warn('重播語音失敗:', error);
        }
      }
    }
  }

  /**
   * 開始遊戲模式
   */
  startGameMode() {
    if (!this.isInitialized) {
      console.warn('應用程式尚未初始化完成');
      return;
    }
    
    gameManager.startGame();
  }

  /**
   * 開始練習模式
   */
  startPracticeMode() {
    if (!this.isInitialized) {
      console.warn('應用程式尚未初始化完成');
      return;
    }
    
    practiceManager.startPractice();
  }

  /**
   * 下一題
   */
  nextQuestion() {
    gameManager.nextQuestion();
  }

  /**
   * 從遊戲模式返回主選單
   */
  returnToMenuFromGame() {
    gameManager.returnToMenu();
  }

  /**
   * 從練習模式返回主選單
   */
  returnToMenuFromPractice() {
    practiceManager.returnToMenu();
  }

  /**
   * 顯示錯誤訊息
   * @param {string} message - 錯誤訊息
   */
  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #f44336;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 1000;
      font-weight: bold;
    `;
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    document.body.appendChild(errorDiv);
    
    // 5秒後自動移除錯誤訊息
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }
}

// 創建應用程式實例
const k2WordGame = new K2WordGame();

// 頁面載入完成後初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
  k2WordGame.init();
});

// 為了向後兼容，保留原有的全域函數
function startGameMode() {
  k2WordGame.startGameMode();
}

function startPracticeMode() {
  k2WordGame.startPracticeMode();
}

function nextQuestion() {
  k2WordGame.nextQuestion();
}

function returnToMenu() {
  const gameDiv = document.getElementById('game');
  const practiceDiv = document.getElementById('practice');
  
  if (gameDiv && gameDiv.style.display !== 'none') {
    k2WordGame.returnToMenuFromGame();
  } else if (practiceDiv && practiceDiv.style.display !== 'none') {
    k2WordGame.returnToMenuFromPractice();
  }
}

