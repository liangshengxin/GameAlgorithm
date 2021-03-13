/**
 * 生成迷宫-深度优先
 */
export default class MazeDFS {
    /** 迷宫地图 */
    private maze: MazePoint[][] = [];
    /** 地图大小 */
    private size: MazeSize = null;

    /** 入口位置 */
    private enter: MazeXY = null;
    /** 出口位置 */
    private exit: MazeXY = null;
    /** 当前位置 */
    private current: MazeXY = null;

    /**
     * 初始化生成所有单元格被隔开的地图（大小增加一倍）
     * @param width 
     * @param height 
     */
    public init(width: number, height: number): MazeDFS {
        this.size = { width, height };

        let h = height * 2 - 1;
        let w = width * 2 - 1;

        //隔开单元格，生成地图
        for (let y = 0; y < h; y++) {
            this.maze[y] = [];
            for (let x = 0; x < w; x++) {
                let isWall = x % 2 == 0 && y % 2 == 0
                let point: MazePoint = {
                    x, y, wall: !isWall, visit: false,
                };
                this.maze[y][x] = point
            }
        }
        //初始位置
        this.initPoint();
        return this;
    }

    /**
     * 生成迷宫
     * 
     */
    public generateMaze(): MazeData {
        //最深长度
        let lenLog = 0;
        // 访问记录
        let history: MazeXY[] = [{ x: this.current.x, y: this.current.y }];

        while (history.length > 0) {
            //根据最深位置生成出口
            if (lenLog < history.length) {
                this.exit = history[history.length - 1];
                lenLog = history.length;
            }

            //已访问
            this.maze[this.current.y][this.current.x].visit = true;

            //获取可行走的随机位置
            let nextPos: MazeXY | false = this.dirRandomPoint(this.maze[this.current.y][this.current.x])
            if (!nextPos) {
                //返回上一步
                this.current = history.pop();
                continue;
            };

            //根据最深位置生成出口
            if (lenLog < history.length) {
                this.exit = history[history.length - 1];
                lenLog = history.length;
            }

            //打通墙壁
            this.digWall(nextPos);

            //设置下一步为当前
            this.current = nextPos;
            //记录
            history.push(nextPos)
        }

        return new MazeData(this.maze,this.enter,this.exit);
    }



    /**
     * 初始位置
     */
    private initPoint(): MazeDFS {
        this.enter = { x: 0, y: 0 };
        this.exit = { x: this.size.width - 1, y: this.size.height - 1 };
        this.current = this.enter;
        return this;
    }


    /** 获取当前位置可行走的随机位置 */
    private dirRandomPoint(cur: MazePoint): MazeXY | false {
        let size = { x: this.size.width, y: this.size.height };
        let list: MazeXY[] = [];
        //x左右 y上下 -1左/下 1右/上
        for (const pos of ['x', 'y']) {
            for (const num of [-1, 1]) {
                let temp = Object.assign({}, cur);//深拷贝一下
                //可行走的位置
                if (cur[pos] + num >= 0 && cur[pos] + num < size[pos]) {
                    temp[pos] += num
                    //访问过不添加
                    if (!this.maze[temp.y][temp.x].visit) {
                        list.push(temp)
                    }
                }
            }
        }

        //没找到位置
        if (list.length <= 0) return false;

        return list[Math.floor(Math.random() * list.length)]
    }

    /**
     * 打通当前位置和下一步的墙壁
     * @param nextPos 下一步位置
     */
    private digWall(nextPos: MazeXY) {
        let xSub = nextPos.x - this.current.x;
        let ySub = nextPos.y - this.current.y;
        if (xSub == 0) {
            this.maze[this.current.y * 2 + ySub][this.current.x * 2].wall = false;
        } else {
            this.maze[this.current.y * 2][this.current.x * 2 + xSub].wall = false;
        }
    }

}

/** 迷宫数据 */
class MazeData {
    /** 迷宫地图 */
    private maze: MazePoint[][] = [];
    /** 入口位置 */
    private enter: MazeXY = null;
    /** 出口位置 */
    private exit: MazeXY = null;

    constructor(maze: MazePoint[][], enter: MazeXY, exit: MazeXY) {
        this.maze = maze;
        this.enter = enter;
        this.exit = exit;
    }

    /** 获取迷宫地图 */
    public getMaze(): MazePoint[][] {
        return this.maze;
    }

    /** 获取出口位置 */
    public getExit(): MazeXY {
        return this.exit
    }

    /** 获取入口位置 */
    public getEnter(): MazeXY {
        return this.enter;
    }

}



interface MazePoint {
    x: number;
    y: number;
    /** true墙 false路 */
    wall: boolean;
    /** true访问过 false未访问 */
    visit: boolean;
}

interface MazeSize {
    width: number;
    height: number;
}

interface MazeXY {
    x: number;
    y: number;
}
