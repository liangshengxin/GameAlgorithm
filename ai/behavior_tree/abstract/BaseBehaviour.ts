import BtContext from "../BtContext";
import { EStatus } from "../Enum";
import IBehaviour from "../interface/IBehaviour";

/**
 * 所有行为树节点核心
 */
export default abstract class BaseBehaviour implements IBehaviour {
    /** 状态 */
    protected status: EStatus;

    childern: Array<IBehaviour> = [];

    context: BtContext;

    public constructor() {
        this.setStatus(EStatus.Invalid)
    }

    /**
     * 包装函数，防止打破调用契约
     */
    tick(): EStatus {
        if (this.status !== EStatus.Running) {
            this.onInitialize();
        }
        this.status = this.update();

        if (this.status !== EStatus.Running) {
            this.onTerminate(this.status);
        }
        return this.status;
    }
    onInitialize(): void {
        // throw new Error("方法未实现.");
    }
    update(): EStatus {
        throw new Error("方法未实现.");
    }
    onTerminate(status: EStatus): void {
        // throw new Error("方法未实现.");
    }
    release(): void {
        throw new Error("方法未实现.");
    }
    addChild(child: IBehaviour): void {
        throw new Error("方法未实现.");
    }
    setStatus(status: EStatus): void {
        this.status = status;
    }
    getStatus(): EStatus {
        return this.status;
    }
    reset(): void {
        this.setStatus(EStatus.Invalid);
    }
    abort(): void {
        this.onTerminate(EStatus.Aborted);
        this.setStatus(EStatus.Aborted)
    }

}