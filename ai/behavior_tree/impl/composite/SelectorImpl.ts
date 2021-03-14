import BaseComposite from "../../abstract/BaseComposite";
import { EStatus } from "../../Enum";
import ISelector from "../../interface/composite/ISelector";
import IBehaviour from "../../interface/IBehaviour";

/**
 * 选择 --- 执行失败就继续执行，否则返回
 */
export default class SelectorImpl extends BaseComposite implements ISelector {
    private currectChild: IBehaviour;

    public update(): EStatus {
        let childern = this.getChildren();
        for (this.currectChild of childern) {
            let s = this.currectChild.tick();
            //执行失败继续执行
            if (s !== EStatus.Failure) {
                return s;
            }
        }
        return EStatus.Failure;
    }
}