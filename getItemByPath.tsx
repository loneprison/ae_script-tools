import * as _ from 'soil-ts';


/**
 * 通过路径数组从项目中查找嵌套的 Item（如 Folder 或 Footage）
 * 请注意，你依然需要手动判断获取到的对象是否是你想要的类型
 *
 * @param {string[]} pathArray 路径数组，例如 ["素材", "视频", "片头.mov"]
 * @returns {_ItemClasses | undefined} 返回匹配的项目项，如果未找到则返回 undefined
 * @since 0.1.0
 * @category utils
 * @see {@linkcode findItem}
 * @example
 *
 * ```ts
 * const item = getItemByPath(["素材", "视频", "片头.mov"]);
 * if (item) {
 *     $.writeln("找到了项目项：" + item.name);
 * } else {
 *     $.writeln("未找到对应的项目项。");
 * }
 * // 结果：如果路径存在，打印该项名称；否则打印未找到提示。
 * ```
 */
function getItemByPath(pathArray: string[]): _ItemClasses | undefined {
    const project = app.project;
    let currentItem: _ItemClasses | undefined = void 0;  // 初始为 project，接着会逐层查找

    // 遍历路径数组
    for (let i = 0; i < pathArray.length; i++) {
        const folderName = pathArray[i];
        if (i == 0) {
            currentItem = _.findItem(project, (item) => item.name === folderName);
        } else if (_.isFolderItem(currentItem)) {
            if (i == pathArray.length - 1) {
                return _.findItem(currentItem, (item) => item.name === folderName);
            }

            currentItem = _.findItem(currentItem, (item) => item.name === folderName && _.isFolderItem(item));
        }

    }

    // 如果找不到该文件夹，返回 null
    if (!_.isFolderItem(currentItem)) {
        return void 0;
    }
    return currentItem
}

export default getItemByPath;