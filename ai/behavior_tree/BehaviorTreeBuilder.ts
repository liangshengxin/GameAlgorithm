import BehaviorTree from "./BehaviorTree";
import { INode } from "./IDataType";
import IBehaviour from "./interface/IBehaviour";

/**
 * 数生成类
 */
export default class BehaviorTreeBuilder {
    private behaviorStack: Array<IBehaviour> = [];
    private treeRoot: IBehaviour = null;

    /** 添加行为 */
    public addBehavior(behavior: IBehaviour): BehaviorTreeBuilder {
        //如果没有根节点，设置新节点为根节点
        //否则设置新节点为堆栈顶部节点的子节点
        if (this.treeRoot === null) {
            this.treeRoot = behavior;
        } else {
            this.behaviorStack[this.behaviorStack.length - 1].addChild(behavior)
        }
        //将新节点压入堆栈
        this.behaviorStack.push(behavior)
        return this;
    }
    /**
     * 后退
     * @param num 后退个数
     */
    public back(num: number = 1) {
        for (let i = 0; i < num; i++) {
            this.behaviorStack.pop();
        }
        return this;
    }

    /**
     * 完成行为树
     * @param node 绑定自身节点
     */
    public end(node?: INode): BehaviorTree {
        //堆栈不为空
        while (this.behaviorStack.length > 0) {
            this.behaviorStack.pop();
        }
        return new BehaviorTree(this.treeRoot, node);
    }
}