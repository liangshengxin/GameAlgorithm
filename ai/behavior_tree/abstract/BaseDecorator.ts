import IBehaviour from "../interface/IBehaviour";
import IDecorator from "../interface/IDecorator";
import BaseBehaviour from "./BaseBehaviour";

/**
 * 装饰基类
 */
export default abstract class BaseDecorator extends BaseBehaviour implements IDecorator {
    /**装饰器只会有一个节点 */
    protected child: IBehaviour;

    public addChild(child: IBehaviour) {
        this.child = child;
    }
}