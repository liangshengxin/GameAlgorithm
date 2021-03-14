import AStar from "./AStar"

export const astar = (): void => {
    let astar = new AStar();
    //初始化地图
    astar.initMap(10, 10);
    //设置墙
    astar.setWalls([
        { x: 5, y: 1 },
        { x: 5, y: 2 },
        { x: 5, y: 3 },
        { x: 5, y: 4 },
        { x: 5, y: 5 },
    ]);
    //设置搜索路径
    astar.setFindPath({ x: 4, y: 4 }, { x: 6, y: 6 });
    //搜索
    astar.findPath();
    //获取搜索路径结果
    let path = astar.getPath();
    
    console.log(path)
}

astar();