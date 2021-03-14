import BtContext from "./BtContext";
import { INode } from "./IDataType";
import IBehaviour from "./interface/IBehaviour";

/**
 * 行为树
 */
export default class BehaviorTree {
    private root: IBehaviour;

    /**
     * 
     * @param root 
     * @param selfNode 自身节点
     */
    constructor(root: IBehaviour, selfNode?: INode) {
        this.root = root;
        let context = new BtContext;
        this.bindContext(context, root)
        //绑定自身节点
        selfNode && (this.root.context.self = selfNode)
    }

    //绑定上下文数据
    private bindContext(context: BtContext, root: IBehaviour) {
        if (root) {
            root.context = context;
            let children: IBehaviour[] = root.childern;
            children?.forEach(child => {
                this.bindContext(context, child)
            })
        }
    }

    /** 执行任务 dt  */
    public tick(dt?: number): void {
        this.root.context.dt = dt;
        this.root.tick();
    }

    /** 是否存在root */
    public haveRoot(): boolean {
        return Boolean(this.root)
    }

    public setRoot(inNode: IBehaviour): void {
        this.root = inNode
    }

    /** 释放对象所占资源 */
    public release(): void {
        this.root.release();
    }
}