/**
 * 音頻管理模組
 */

class AudioManager {
  constructor() {
    this.correctSound = null;
    this.speechSynthesis = window.speechSynthesis;
    this.isSpeechSupported = 'speechSynthesis' in window;
    this.init();
  }

  /**
   * 初始化音頻管理器
   */
  init() {
    this.loadSounds();
  }

  /**
   * 載入音效文件
   */
  loadSounds() {
    try {
      this.correctSound = new Audio('assets/audio/success-fanfare-trumpets-6185.mp3');
      this.correctSound.preload = 'auto';
      
      // 處理音頻載入錯誤
      this.correctSound.onerror = () => {
        console.warn('無法載入音效文件，將使用備用方案');
        this.correctSound = null;
      };
    } catch (error) {
      console.warn('音頻初始化失敗:', error);
      this.correctSound = null;
    }
  }

  /**
   * 播放正確答案音效
   */
  playCorrectSound() {
    if (this.correctSound) {
      try {
        this.correctSound.currentTime = 0;
        this.correctSound.play().catch(error => {
          console.warn('音效播放失敗:', error);
        });
      } catch (error) {
        console.warn('音效播放錯誤:', error);
      }
    }
  }

  /**
   * 語音播放文字
   * @param {string} text - 要播放的文字
   * @param {Object} options - 語音選項
   */
  speak(text, options = {}) {
    if (!this.isSpeechSupported) {
      console.warn('瀏覽器不支援語音合成功能');
      return Promise.reject(new Error('語音合成不支援'));
    }

    return new Promise((resolve, reject) => {
      try {
        // 停止當前播放的語音
        this.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // 設定語音參數
        utterance.lang = options.lang || 'zh-HK';
        utterance.rate = options.rate || 0.8; // 較慢的語速適合兒童
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        // 事件處理
        utterance.onend = () => resolve();
        utterance.onerror = (event) => {
          console.warn('語音播放錯誤:', event.error);
          reject(new Error(`語音播放失敗: ${event.error}`));
        };

        this.speechSynthesis.speak(utterance);
      } catch (error) {
        console.warn('語音合成錯誤:', error);
        reject(error);
      }
    });
  }

  /**
   * 停止語音播放
   */
  stopSpeech() {
    if (this.isSpeechSupported) {
      this.speechSynthesis.cancel();
    }
  }

  /**
   * 檢查語音合成是否可用
   * @returns {boolean} 是否支援語音合成
   */
  isSpeechAvailable() {
    return this.isSpeechSupported;
  }
}

// 創建全域音頻管理器實例
const audioManager = new AudioManager();

