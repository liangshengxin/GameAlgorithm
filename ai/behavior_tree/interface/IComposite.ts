import IBehaviour from "./IBehaviour";

/**
 * 组合节点
 */
export default interface IComposite extends IBehaviour {
    addChild(child: IBehaviour): void;

    /** 删除指定子节点 */
    removeChild(child: IBehaviour): void;

    /** 获取子节点 */
    getChildren(): Array<IBehaviour>;

    /** 设置子节点 */
    setChildren(behaviour: Array<IBehaviour>): void;
}