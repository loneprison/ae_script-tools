

/**
 * 读取用户选择的文本文件内容。
 * @param prompt 可选的文件对话框提示信息。
 * @param filter 可选的文件过滤模式（例如："*.txt"）。
 * @returns 文件内容字符串，如果取消或失败则返回 null。
 * @since 0.1.0
 * @category utils
 * 
 * @example
 * function readLrc(): string {
 *    const content = readTextFile("Select a LRC file", "LRC Files:*.lrc");
 *    return content || "";
 * }
 *
 */
function readTextFile(prompt?: string, filter?: string): string | null {
    const file = File.openDialog(prompt || "Select a file", filter || "*.*") as File | null;
    if (!file) return null;

    if (!file.open("r")) return null;

    const content = file.read();
    file.close();

    return content;
}

export default readTextFile;