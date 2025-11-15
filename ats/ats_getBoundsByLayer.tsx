import * as _ from "soil-ts"

function ats_getBoundsByLayer(layerOrArray: RasterLayer | RasterLayer[]): RectBounds {
    const errorRect: RectBounds = { left: 0, top: 0, width: 0, height: 0 };
    if (!layerOrArray) {
        return errorRect;
    }

    if (!_.isArray(layerOrArray)) {
        return Atarabi.layer.getBounds(layerOrArray);
    }

    const layers = layerOrArray;

    if (layers.length === 0) {
        return errorRect;
    }

    // 全部 bounding rect
    const rects: RectBounds[] = _.map(layers, function (l) {
        return Atarabi.layer.getBounds(l);
    });

    // reduce 初始值
    const init = {
        left: Infinity,
        top: Infinity,
        right: -Infinity,
        bottom: -Infinity
    };

    // 遍历合并 bounds
    const merged = _.reduce(rects, function (acc, r) {
        const rLeft = r.left;
        const rTop = r.top;
        const rRight = rLeft + r.width;
        const rBottom = rTop + r.height;

        if (rLeft < acc.left) acc.left = rLeft;
        if (rTop < acc.top) acc.top = rTop;
        if (rRight > acc.right) acc.right = rRight;
        if (rBottom > acc.bottom) acc.bottom = rBottom;

        return acc;
    }, init);

    return {
        left: merged.left,
        top: merged.top,
        width: merged.right - merged.left,
        height: merged.bottom - merged.top
    };
}


export default ats_getBoundsByLayer;