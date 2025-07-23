/**
 * 工具函數模組
 */

/**
 * Fisher-Yates 洗牌算法
 * @param {Array} array - 要洗牌的數組
 * @returns {Array} 洗牌後的新數組
 */
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 顯示或隱藏元素
 * @param {string} elementId - 元素ID
 * @param {boolean} show - 是否顯示
 */
function toggleElement(elementId, show) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = show ? 'block' : 'none';
  }
}

/**
 * 清空元素內容
 * @param {string} elementId - 元素ID
 */
function clearElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '';
  }
}

/**
 * 創建按鈕元素
 * @param {string} text - 按鈕文字
 * @param {Function} onClick - 點擊事件處理函數
 * @param {string} className - CSS類名
 * @returns {HTMLButtonElement} 按鈕元素
 */
function createButton(text, onClick, className = '') {
  const button = document.createElement('button');
  button.textContent = text;
  button.onclick = onClick;
  if (className) {
    button.className = className;
  }
  return button;
}

/**
 * 去除數組中的重複元素
 * @param {Array} array - 原數組
 * @returns {Array} 去重後的數組
 */
function removeDuplicates(array) {
  return [...new Set(array)];
}

/**
 * 延遲執行函數
 * @param {number} ms - 延遲毫秒數
 * @returns {Promise} Promise對象
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

