import BaseComposite from "../../abstract/BaseComposite";
import { EStatus } from "../../Enum";
import ISequence from "../../interface/composite/ISequence";
import IBehaviour from "../../interface/IBehaviour";

/**
 * 顺序 --- 如果执行成功就继续执行，否则返回
 */
export default class SequenceImpl extends BaseComposite implements ISequence {
    private currentChild: IBehaviour;
    
    public update(): EStatus {
        let childern = this.getChildren();
        for (this.currentChild of childern) {
            let s = this.currentChild.tick();
            //执行成功继续执行
            if (s != EStatus.Success) {
                return s;
            }
        }
        return EStatus.Success;
    }
}