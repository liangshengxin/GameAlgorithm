import MazeDFS from "./MazeDFS"

export const mazeDFS = () => {
    let mazeDFS = new MazeDFS();
    //初始化
    mazeDFS.init(10, 10);
    //生成迷宫
    let result = mazeDFS.generateMaze();
    //获取迷宫地图
    let mazeMap = result.getMaze();
    
    console.log(mazeMap);
}

