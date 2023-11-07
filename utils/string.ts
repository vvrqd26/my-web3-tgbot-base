/**
 * 缩略显示长字符串
 * @param str 输入字符
 * @param head 开头保留字符数
 * @param tail 结尾保留字符数
 * @returns 
 */
export const shortAddress = (str: string, head = 5, tail = 5) => {
  if (!str) {
    return ''
  }
  return `${str.substring(0, head)}...${str.substring(
    str.length - tail,
    str.length,
  )}`;
};
/**
 * 给数字添加千分符
 * @param num 
 * @returns 
 */
export function addComma(num: number|string|bigint): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
interface TableOptions {
  widths?: (number | "auto")[];
}
/**
 * 渲染文本表格
 * @param data 
 * @param options 
 * @returns 
 */
export function renderTextTable(data: string[][], options?: TableOptions): string {
  const maxLengths: number[] = [];

  // 计算每列的最大宽度
  for (let row of data) {
    for (let i = 0; i < row.length; i++) {
      const cell = String(row[i]);
      maxLengths[i] = Math.max(maxLengths[i] || 0, cell.length);
    }
  }

  // 根据 options 更新每列的宽度
  if (options?.widths) {
    for (let i = 0; i < options.widths.length; i++) {
      const width = options.widths[i];
      if (width !== "auto") {
        maxLengths[i] = width;
      }
    }
  }
  let table = "";
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
      const cell = String(row[j]);
      const paddingLength = maxLengths[j] - cell.length;
      const padding = " ".repeat(paddingLength || 1);
      table += cell + padding + " ";
    }
    table += "\n";

    // 添加分隔线
    if (i === 0) {
      table += "-".repeat(table.length - 1) + "\n";
    }
  }

  return `${table}`;
}