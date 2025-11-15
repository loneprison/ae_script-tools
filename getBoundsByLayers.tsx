import * as _ from 'soil-ts';

function mergeTwoBounds(current: RectBounds, newBounds: RectBounds): RectBounds {
    return {
        left: Math.min(current.left, newBounds.left),
        top: Math.min(current.top, newBounds.top),
        width: Math.max(current.left + current.width, newBounds.left + newBounds.width) - Math.min(current.left, newBounds.left),
        height: Math.max(current.top + current.height, newBounds.top + newBounds.height) - Math.min(current.top, newBounds.top),
    };
}

function getBoundsByLayer(layer: Layer): RectBounds {
    if (!_.isAVLayer(layer)) return { left: 0, top: 0, width: 0, height: 0 };

    const { width, height } = layer;
    const vertices: TwoDPoint[] = [[0, 0], [width, 0], [width, height], [0, height]];

    const initialBounds: RectBounds = { left: Infinity, top: Infinity, width: -Infinity, height: -Infinity };
    return _.reduce(
        _.map(vertices, v => {
            const [x, y] = layer.sourcePointToComp(v);
            return { left: x, top: y, width: 0, height: 0 };
        }),
        (currentBounds, pointBounds) => mergeTwoBounds(currentBounds, pointBounds),
        initialBounds
    );
}

function mergeBounds(boundsList: RectBounds[]): RectBounds {
    if (_.isEmpty(boundsList)) {
        throw new Error("boundsList 不能为空");
    }

    return _.reduce(
        boundsList,
        (currentBounds, newBounds) => mergeTwoBounds(currentBounds, newBounds),
        { left: Infinity, top: Infinity, width: -Infinity, height: -Infinity }
    );
}

/**
 * 计算一组图层的合并矩形边界。
 *
 * 该函数接收一个包含多个 `Layer` 对象的数组，并返回它们的合并边界。
 * 请注意！！！对于非 `AVLayer` 对象，该函数会返回一个空矩形边界。
 * 因此请推荐在使用函数前进行检查/过滤。
 *
 * @param {Layer[]} layers 一个包含多个 `Layer` 对象的数组，需要计算其边界。
 * @returns {RectBounds} 一个 `RectBounds` 对象，表示所有提供图层的合并边界。
 * @since 0.1.0
 * @category utils
 * @example
 *
 * ```ts
 * const layers = _.getSelectedLayers();
 * const bounds = getBoundsByLayers(layers);
 * // 结果：返回合并后的矩形边界。
 * ```
 */
function getBoundsByLayers(layers: Layer[]): RectBounds {
    return mergeBounds(_.map(layers, getBoundsByLayer));
}

export default getBoundsByLayers;
