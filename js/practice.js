/**
 * 練習模式管理模組
 */

class PracticeManager {
  constructor() {
    this.allWords = [];
    this.isPracticeActive = false;
  }

  /**
   * 初始化練習模式
   * @param {Array} allWords - 所有詞語數據
   */
  init(allWords) {
    this.allWords = allWords;
  }

  /**
   * 開始練習模式
   */
  startPractice() {
    try {
      // 隱藏主選單，顯示練習界面
      toggleElement('menu', false);
      toggleElement('practice', true);
      
      this.isPracticeActive = true;
      
      // 創建詞語列表
      this.createWordList();
      
      // 清空圖片顯示區域
      clearElement('practiceImage');
      
      console.log('練習模式開始');
    } catch (error) {
      console.error('練習模式啟動失敗:', error);
      this.handleError('練習模式啟動失敗，請重試');
    }
  }

  /**
   * 創建詞語列表
   */
  createWordList() {
    try {
      const listDiv = document.getElementById('wordList');
      clearElement('wordList');
      
      // 去除重複詞語並洗牌
      const uniqueWords = removeDuplicates(this.allWords);
      const shuffledWords = shuffle(uniqueWords);
      
      // 創建詞語按鈕
      shuffledWords.forEach((word, index) => {
        const button = createButton(
          word, 
          () => this.handleWordClick(word),
          'word-button'
        );
        
        // 添加無障礙屬性
        button.setAttribute('aria-label', `練習詞語：${word}`);
        button.setAttribute('tabindex', '0');
        button.setAttribute('data-word', word);
        
        // 添加鍵盤支援
        button.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleWordClick(word);
          }
        });
        
        listDiv.appendChild(button);
      });
      
      console.log(`創建了 ${shuffledWords.length} 個詞語按鈕`);
    } catch (error) {
      console.error('創建詞語列表失敗:', error);
      this.handleError('創建詞語列表失敗');
    }
  }

  /**
   * 處理詞語點擊事件
   * @param {string} word - 點擊的詞語
   */
  async handleWordClick(word) {
    if (!this.isPracticeActive) return;

    try {
      // 播放詞語語音
      await this.playWordAudio(word);
      
      // 顯示詞語和圖片
      this.displayWordImage(word);
      
      // 添加視覺反饋
      this.highlightWordButton(word);
      
      console.log(`練習詞語：${word}`);
    } catch (error) {
      console.error('詞語點擊處理失敗:', error);
      // 不顯示錯誤給用戶，因為這不會影響基本功能
    }
  }

  /**
   * 播放詞語語音
   * @param {string} word - 要播放的詞語
   */
  async playWordAudio(word) {
    try {
      await audioManager.speak(word);
    } catch (error) {
      console.warn('詞語語音播放失敗:', error);
      // 語音播放失敗不影響練習繼續
    }
  }

  /**
   * 顯示詞語圖片
   * @param {string} word - 要顯示的詞語
   */
  displayWordImage(word) {
    try {
      const imageDiv = document.getElementById('practiceImage');
      
      // 創建詞語顯示和圖片
      imageDiv.innerHTML = `
        <div role="region" aria-label="詞語展示區域">
          <p><b>${word}</b></p>
          <img src="https://via.placeholder.com/200x150?text=${encodeURIComponent(word)}" 
               alt="${word}的圖片" 
               loading="lazy"
               onerror="this.alt='圖片載入失敗'">
        </div>
      `;
    } catch (error) {
      console.error('顯示詞語圖片失敗:', error);
    }
  }

  /**
   * 高亮顯示點擊的詞語按鈕
   * @param {string} word - 點擊的詞語
   */
  highlightWordButton(word) {
    try {
      // 移除所有按鈕的高亮
      const allButtons = document.querySelectorAll('#wordList button');
      allButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // 高亮當前點擊的按鈕
      const currentButton = document.querySelector(`#wordList button[data-word="${word}"]`);
      if (currentButton) {
        currentButton.classList.add('active');
        
        // 短暫延遲後移除高亮
        setTimeout(() => {
          currentButton.classList.remove('active');
        }, 1000);
      }
    } catch (error) {
      console.error('按鈕高亮失敗:', error);
    }
  }

  /**
   * 返回主選單
   */
  returnToMenu() {
    this.isPracticeActive = false;
    audioManager.stopSpeech();
    
    toggleElement('practice', false);
    toggleElement('menu', true);
    
    // 清空練習狀態
    clearElement('practiceImage');
    
    console.log('從練習模式返回主選單');
  }

  /**
   * 錯誤處理
   * @param {string} message - 錯誤訊息
   */
  handleError(message) {
    console.error(message);
    const practiceImage = document.getElementById('practiceImage');
    if (practiceImage) {
      practiceImage.innerHTML = `<div role="alert">${message}</div>`;
    }
  }

  /**
   * 重新整理詞語列表
   */
  refreshWordList() {
    if (this.isPracticeActive) {
      this.createWordList();
      clearElement('practiceImage');
    }
  }
}

// 創建全域練習管理器實例
const practiceManager = new PracticeManager();

