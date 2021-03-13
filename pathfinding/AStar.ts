/**
 * A星寻路
 */
export default class AStar {
    /** 地图大小 */
    private mapSize: IAStarSize = { width: 0, height: 0 };
    /** 地图 */
    private map: Array<IAStarPoint>[] = []

    /** 搜索路径 */
    private pathStart: IAStarPoint = null;
    private pathEnd: IAStarPoint = null;

    /** 得到的路径 */
    private path: { x: number, y: number }[] = [];

    /** 初始化地图 */
    public initMap(width: number, height: number): AStar {
        this.mapSize = { width, height };

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (!this.map[y]) this.map[y] = [];
                // 设置地图点
                let point: IAStarPoint = {
                    isWall: false,
                    parent: null,
                    x: x,
                    y: y,
                    F: 0,
                    G: 0,
                    H: 0,
                }
                this.map[y][x] = point;
            }
        }
        return this;
    }

    /**
     * 设置搜索位置
     * @param start 
     * @param end 
     */
    public setFindPath(start: { x: number, y: number }, end: { x: number, y: number }): AStar {
        this.pathStart = this.map[start.y][start.x]
        this.pathEnd = this.map[end.y][end.x]
        return this;
    }

    /**
     * 获取路径
     */
    public getPath(): Array<{ x: number, y: number }> {
        while (this.pathStart !== this.pathEnd || this.pathEnd.parent) {
            this.path.unshift({ x: this.pathEnd.x, y: this.pathEnd.y })
            this.pathEnd = this.pathEnd.parent;
        }
        return this.path;
    }

    /**
     * 设置墙
     * @param points 需要设为墙的点
     */
    public setWalls(points: { x: number, y: number }[]): AStar {
        points.forEach(point => {
            this.map[point.y][point.x].isWall = true;
        })
        return this;
    }

    /**
     * 搜索路径
     * @param start 
     * @param end 
     */
    findPath() {
        let start = this.pathStart;
        let end = this.pathEnd;
        //open列表 - 知道但还未走的路（可使用二叉堆优化）
        let openList: Array<IAStarPoint> = [];
        //close列表 - 已经走过的路
        let closeList: Array<IAStarPoint> = [];
        //加入开始位置
        openList.push(start);
        //搜索
        while (openList.length > 0) {
            //抛出最底部点            
            // let point = openList.shift()

            //获取F值最小的点
            let point = this.findPointMinF(openList);
            let index = openList.findIndex(openPoint => point === openPoint)
            openList.splice(index, 1)

            // log(point.F)

            //加入close表
            closeList.push(point)
            //周围存在的点
            let surroundPoints = this.getSurroundPoints(point)
            //过滤
            this.filterPoints(surroundPoints, closeList);
            //
            for (const surroundPoint of surroundPoints) {
                //已知路径存在当前点的周围点
                if (openList.findIndex(openPoint => openPoint === surroundPoint) >= 0) {
                    //当前点point走到周围点surroundPoint的G值
                    let nowSurroundG = this.calcG(surroundPoint, point);
                    //小于已知的周围点本身的G值
                    if (nowSurroundG < surroundPoint.G) {
                        // 替换周围点的父级为当前点point
                        surroundPoint.parent = point;
                        // 更新G F值
                        surroundPoint.G = nowSurroundG;
                        surroundPoint.F = nowSurroundG + surroundPoint.H;
                    }
                } else {
                    //设置父级为当前点
                    surroundPoint.parent = point
                    this.setFGH(surroundPoint, end)
                    //加入未知路径到openlist
                    openList.push(surroundPoint)
                }
            }
            //找到终点
            if (openList.findIndex(openPoint => openPoint === end) >= 0) {
                break;
            }
        }
        return this;
    }



    /**查找最小F值的点 */
    private findPointMinF(openList: IAStarPoint[]): IAStarPoint {
        let tempPoint: IAStarPoint = null;
        for (const point of openList) {
            if (!tempPoint) {
                tempPoint = point
            } else if (point.F < tempPoint.F) {
                tempPoint = point
            }
        }
        return tempPoint
    }
    /**
     * 获取周围的点 - 四个方向
     * @param point 
     */
    private getSurroundPoints(point: IAStarPoint): IAStarPoint[] {
        //记录周围点
        let list: IAStarPoint[] = [];
        let up: IAStarPoint, down: IAStarPoint, left: IAStarPoint, right: IAStarPoint;

        //[可简化-不需要知道具体的上下左右，只要是周围的4个方向即可]
        if (point.x < this.mapSize.width - 1) {
            right = this.map[point.y][point.x + 1]
        }
        if (point.x > 0) {
            left = this.map[point.y][point.x - 1]
        }
        if (point.y < this.mapSize.height - 1) {
            up = this.map[point.y + 1][point.x]
        }
        if (point.y > 0) {
            down = this.map[point.y - 1][point.x]
        }
        //加入
        if (down != null && !down.isWall) {
            list.push(down)
        }
        if (up != null && !up.isWall) {
            list.push(up)
        }
        if (left != null && !left.isWall) {
            list.push(left)
        }
        if (right != null && !right.isWall) {
            list.push(right)
        }

        return list;
    }

    /**
     * 过滤周围点
     * @param surroundPoints 
     * @param closeList 
     */
     private filterPoints(surroundPoints: IAStarPoint[], closeList: IAStarPoint[]) {
        for (const p of closeList) {
            let sIndex = surroundPoints.findIndex(sur => sur === p)
            if (sIndex >= 0) {
                surroundPoints.splice(sIndex, 1)
            }
        }
    }

    /**
     * 设置F G H值
     * @param now 当前点
     * @param end 终点
     */
     private setFGH(now: IAStarPoint, end: IAStarPoint): void {
        now.G = this.calcG(now, now.parent);
        now.H = this.calcH(now, end)
        now.F = now.G + now.H
    }

    ///【FGH】/////////////////////////
    /**
     * 计算F值
     * F值：走到终点消耗的代价值
     * F = G + H
     * @param now 当前点
     * @param end 终点
     */
    private calcF(now: IAStarPoint, end: IAStarPoint): number {
        let g = this.calcG(now, now.parent)
        let h = this.calcH(now, end)
        let f = g + h;
        return f;
    }
    /**
     * 计算G值
     * G值：从起点到该点所消耗的代价，（父点走到当前点的消耗）
     * @param now 当前点
     * @param parent 当前点的父级
     */
    private calcG(now: IAStarPoint, parent: IAStarPoint): number {
        //父级不存在，代价为0
        if (!now.parent) return 0
        //当前点距父点距离+父级G值 = 当前点G值
        let distance = Math.abs(now.x - parent.x) + Math.abs(now.y - parent.y)
        return distance + parent.G
    }
    /**
     * 计算H值
     * H值：从当前点到终点的预估值
     * @param now 当前点
     * @param end 终点
     */
    private calcH(now: IAStarPoint, end: IAStarPoint): number {
        return Math.abs(now.x - end.x) + Math.abs(now.y - end.y)
    }
}

/** 地图大小 */
interface IAStarSize {
    width: number;
    height: number;
}

/** 地图点 */
interface IAStarPoint {
    /** 是否为墙 */
    isWall: boolean;
    /** 父级 */
    parent: IAStarPoint;
    /** 位置 */
    x: number,
    y: number,

    /** 走到终点消耗的代价值  F = G + H */
    F: number,
    /** 从起点到该点所消耗的代价，（父点走到当前点的消耗） */
    G: number,
    /** 从当前点到终点的预估值 */
    H: number,
}
