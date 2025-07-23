/**
 * 遊戲模式管理模組
 */

class GameManager {
  constructor() {
    this.wordBank = [];
    this.currentQuestion = 0;
    this.score = 0;
    this.shuffledWordList = [];
    this.totalQuestions = 10;
    this.isGameActive = false;
  }

  /**
   * 初始化遊戲
   * @param {Array} wordBank - 詞庫數據
   */
  init(wordBank) {
    this.wordBank = wordBank;
  }

  /**
   * 開始遊戲模式
   */
  startGame() {
    try {
      // 隱藏主選單，顯示遊戲界面
      toggleElement('menu', false);
      toggleElement('game', true);
      
      // 重置遊戲狀態
      this.currentQuestion = 0;
      this.score = 0;
      this.isGameActive = true;
      
      // 隨機選擇題目
      this.shuffledWordList = shuffle(this.wordBank).slice(0, this.totalQuestions);
      
      // 顯示第一題
      this.showQuestion();
      
      console.log('遊戲開始');
    } catch (error) {
      console.error('遊戲啟動失敗:', error);
      this.handleError('遊戲啟動失敗，請重試');
    }
  }

  /**
   * 顯示當前題目
   */
  showQuestion() {
    if (!this.isGameActive || this.currentQuestion >= this.shuffledWordList.length) {
      return;
    }

    try {
      const question = this.shuffledWordList[this.currentQuestion];
      const shuffledOptions = shuffle([...question.options]);
      
      // 更新分數顯示
      this.updateScoreDisplay();
      
      // 清空選項容器
      const optionsDiv = document.getElementById('options');
      clearElement('options');
      
      // 創建選項按鈕
      shuffledOptions.forEach(option => {
        const button = createButton(option, () => this.checkAnswer(option, button));
        button.setAttribute('aria-label', `選擇答案：${option}`);
        button.setAttribute('tabindex', '0');
        optionsDiv.appendChild(button);
      });
      
      // 清空反饋區域
      clearElement('feedback');
      
      // 隱藏下一題按鈕
      toggleElement('nextBtn', false);
      
      // 播放題目語音
      this.playQuestionAudio(question.word);
      
    } catch (error) {
      console.error('顯示題目失敗:', error);
      this.handleError('顯示題目失敗');
    }
  }

  /**
   * 播放題目語音
   * @param {string} word - 要播放的詞語
   */
  async playQuestionAudio(word) {
    try {
      await audioManager.speak(word);
    } catch (error) {
      console.warn('語音播放失敗:', error);
      // 語音播放失敗不影響遊戲繼續
    }
  }

  /**
   * 檢查答案
   * @param {string} selected - 選擇的答案
   * @param {HTMLElement} button - 點擊的按鈕元素
   */
  async checkAnswer(selected, button) {
    if (!this.isGameActive) return;

    try {
      const correct = this.shuffledWordList[this.currentQuestion].word;
      const feedback = document.getElementById('feedback');
      const buttons = document.querySelectorAll('#options button');
      
      // 禁用所有按鈕
      buttons.forEach(btn => {
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
        
        // 標記正確答案
        if (btn.textContent === correct) {
          btn.classList.add('correct');
          btn.setAttribute('aria-label', `正確答案：${btn.textContent}`);
        }
        
        // 標記錯誤選擇
        if (btn.textContent === selected && selected !== correct) {
          btn.classList.add('wrong');
          btn.setAttribute('aria-label', `錯誤選擇：${btn.textContent}`);
        }
      });

      // 處理答案結果
      if (selected === correct) {
        await this.handleCorrectAnswer(feedback);
      } else {
        await this.handleWrongAnswer(feedback, selected);
      }

      // 更新分數顯示
      this.updateScoreDisplay();
      
      // 顯示下一題按鈕
      toggleElement('nextBtn', true);
      
    } catch (error) {
      console.error('答案檢查失敗:', error);
      this.handleError('答案檢查失敗');
    }
  }

  /**
   * 處理正確答案
   * @param {HTMLElement} feedback - 反饋元素
   */
  async handleCorrectAnswer(feedback) {
    this.score++;
    
    // 播放正確音效
    audioManager.playCorrectSound();
    
    // 顯示正確反饋
    feedback.innerHTML = `
      <div role="status" aria-live="polite">
        🎉 <b>答對了！做得非常好！</b><br>
        <img src="assets/images/d867d869df8a48849e6b3aeca1fb74a0.gif" alt="慶祝動畫">
      </div>
    `;
    
    // 播放鼓勵語音
    try {
      await audioManager.speak('答對了！做得非常好！');
    } catch (error) {
      console.warn('鼓勵語音播放失敗:', error);
    }
  }

  /**
   * 處理錯誤答案
   * @param {HTMLElement} feedback - 反饋元素
   * @param {string} selected - 選擇的答案
   */
  async handleWrongAnswer(feedback, selected) {
    // 顯示錯誤反饋
    feedback.innerHTML = `
      <div role="status" aria-live="polite">
        ❌ <b>答錯了！不要灰心，繼續努力！</b><br>
        <img src="assets/images/ad4d53a006f048ce8889e0f3a14efbe1.gif" alt="鼓勵動畫">
      </div>
    `;
    
    // 播放鼓勵語音
    try {
      await audioManager.speak(`這個選項是「${selected}」，不要灰心，繼續努力`);
    } catch (error) {
      console.warn('鼓勵語音播放失敗:', error);
    }
  }

  /**
   * 下一題
   */
  nextQuestion() {
    if (!this.isGameActive) return;

    this.currentQuestion++;
    
    if (this.currentQuestion < this.totalQuestions) {
      this.showQuestion();
    } else {
      this.endGame();
    }
  }

  /**
   * 結束遊戲
   */
  async endGame() {
    this.isGameActive = false;
    
    try {
      const feedback = document.getElementById('feedback');
      clearElement('options');
      toggleElement('nextBtn', false);

      // 顯示最終結果
      if (this.score === this.totalQuestions) {
        feedback.innerHTML = `
          <div role="status" aria-live="polite">
            🌟 <b>完美！你十題全對！太勁啦！</b><br>
            <img src="assets/images/d867d869df8a48849e6b3aeca1fb74a0.gif" alt="完美慶祝動畫">
          </div>
        `;
        
        try {
          await audioManager.speak('完美！你十題全對！太勁啦！');
        } catch (error) {
          console.warn('結束語音播放失敗:', error);
        }
      } else {
        feedback.innerHTML = `
          <div role="status" aria-live="polite">
            👏 你總共答對了 ${this.score} 題！繼續加油！<br>
            <img src="assets/images/d867d869df8a48849e6b3aeca1fb74a0.gif" alt="鼓勵動畫">
          </div>
        `;
        
        try {
          await audioManager.speak(`你總共答對了 ${this.score} 題，繼續加油！`);
        } catch (error) {
          console.warn('結束語音播放失敗:', error);
        }
      }
      
      console.log(`遊戲結束，最終得分：${this.score}/${this.totalQuestions}`);
    } catch (error) {
      console.error('遊戲結束處理失敗:', error);
      this.handleError('遊戲結束處理失敗');
    }
  }

  /**
   * 更新分數顯示
   */
  updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.textContent = `得分：${this.score} / ${this.totalQuestions}`;
      scoreElement.setAttribute('aria-label', `當前得分：${this.score} 分，總共 ${this.totalQuestions} 題`);
    }
  }

  /**
   * 返回主選單
   */
  returnToMenu() {
    this.isGameActive = false;
    audioManager.stopSpeech();
    
    toggleElement('game', false);
    toggleElement('menu', true);
    
    // 清空遊戲狀態
    clearElement('feedback');
    clearElement('options');
    
    console.log('返回主選單');
  }

  /**
   * 錯誤處理
   * @param {string} message - 錯誤訊息
   */
  handleError(message) {
    console.error(message);
    const feedback = document.getElementById('feedback');
    if (feedback) {
      feedback.innerHTML = `<div role="alert">${message}</div>`;
    }
  }
}

// 創建全域遊戲管理器實例
const gameManager = new GameManager();

