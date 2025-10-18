/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-18 21:20:55
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-18 21:21:09
 */

export function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

