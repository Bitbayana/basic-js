const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    // Если это не массив, возвращаем 0
    if (!Array.isArray(arr)) {
      return 0;
    }

    let maxDepth = 1;

    // Рекурсивно проверяем каждый элемент массива
    arr.forEach((item) => {
      // Если элемент является массивом, увеличиваем глубину на 1
      if (Array.isArray(item)) {
        const depth = this.calculateDepth(item) + 1;
        // Обновляем максимальную глубину, если нужно
        if (depth > maxDepth) {
          maxDepth = depth;
        }
      }
    });

    return maxDepth;
  }
}

module.exports = {
  DepthCalculator
};
