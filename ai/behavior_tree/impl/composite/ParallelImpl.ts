import BaseComposite from "../../abstract/BaseComposite"
import { EPolicy, EStatus } from "../../Enum";
import IParallel from "../../interface/composite/IParallel";

/**
 * 并行
 * 1.成功或失败一次，即为结果
 * 2.全部成功或失败，即为结果
 * --- 运行完毕无响应结果自动执行onTerminate,中止并重置
 */
export default class ParallelImpl extends BaseComposite implements IParallel {
    /** 成功的要求 */
    successPolicy: EPolicy;
    /** 失败的要求 */
    failPolicy: EPolicy;

    constructor(successPolicy: EPolicy, failPolicy: EPolicy) {
        super();
        this.successPolicy = successPolicy;
        this.failPolicy = failPolicy;
    }

    public update(): EStatus {
        let successCount = 0, failureCount = 0;
        let childrenSize = this.getChildren().length;
        for (const iBehavior of this.getChildren()) {
            let status = iBehavior.getStatus();
            //如果行为已经终止则不再执行该行为
            if (!(status === EStatus.Success || status === EStatus.Failure)) {
                iBehavior.tick();
            }

            //运行成功
            if (iBehavior.getStatus() === EStatus.Success) {
                ++successCount;
                //成功一个即为成功
                if (this.successPolicy === EPolicy.RequireOne) {
                    iBehavior.reset();
                    return EStatus.Success;
                }
            }
            //运行失败
            if (iBehavior.getStatus() === EStatus.Failure) {
                ++failureCount;
                //失败一个即为失败
                if (this.failPolicy === EPolicy.RequireOne) {
                    iBehavior.reset();
                    return EStatus.Failure;
                }
            }

            //全部运行失败才为失败
            if (this.failPolicy === EPolicy.RequireAll && failureCount === childrenSize) {
                //重置
                this.getChildren().forEach(iBehavior => iBehavior.reset());
                return EStatus.Failure;
            }
            //全部运行成功才为成功
            if (this.successPolicy === EPolicy.RequireAll && successCount === childrenSize) {
                //重置
                this.getChildren().forEach(iBehavior => iBehavior.reset());
                return EStatus.Success;
            }
        }

        return EStatus.Running;
    }

    onTerminate(status:EStatus):void{
        //运行中的终止后重置
        this.getChildren().forEach(iBehavior=>{
            if(iBehavior.getStatus()===EStatus.Aborted){
                iBehavior.abort();
            }
            iBehavior.reset();
        })
    }
}