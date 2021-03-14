import BtContext from '../BtContext';
import { EStatus } from '../Enum';
/**
 * 所有行为树节点核心
 */
export default interface IBehaviour {
    /** 上下文数据 */
    context: BtContext;
    childern: Array<IBehaviour>;



    /** 设置调用顺序 onInitialize--update--onTerminate */
    tick(): EStatus;

    /** 当节点调用前 */
    onInitialize(): void;

    /** 节点操作具体实现 */
    update(): EStatus;

    /** 节点调用后执行 */
    onTerminate(status: EStatus): void;

    /** 释放对象所占资源 */
    release(): void;

    /** 添加子节点 */
    addChild(child: IBehaviour): void;

    /** 设置状态 */
    setStatus(status: EStatus): void;

    /** 获取状态 */
    getStatus(): EStatus;

    /** 重置 */
    reset(): void;

    /** 中止 */
    abort(): void;
}