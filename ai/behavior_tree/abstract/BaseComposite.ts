import IBehaviour from "../interface/IBehaviour";
import IComposite from "../interface/IComposite";
import BaseBehaviour from "./BaseBehaviour";

/**
 * 组合节点基类
 */
export default abstract class BaseComposite extends BaseBehaviour implements IComposite {
    /**子节点 */
    childern: Array<IBehaviour> = [];

    addChild(child: IBehaviour) {
        this.childern.push(child)
    }
    removeChild(child: IBehaviour): void {
        let index = this.childern.findIndex(c => c === child)
        if (index >= 0) this.childern.splice(index, 1);
    }
    /** 清空子节点 */
    public clearChild(): void {
        this.childern = [];
    }
    getChildren(): IBehaviour[] {
        return this.childern;
    }
    
    setChildren(behaviour: IBehaviour[]): void {
        this.childern = behaviour;
    }

}