import BaseCondition from "../../abstract/BaseCondition";
import { EStatus } from "../../Enum";
import IBehaviour from "../../interface/IBehaviour";

/**
 * 敌人死亡
 */
export default class ConditionEnemyDead extends BaseCondition {
    /**
     * 敌人死亡
     * @param b 结果是否取反
     */
    constructor(b: boolean = false) {
        super();
        this.setNepation(b)
    }

    update(): EStatus {
        let i = Math.floor(100 * Math.random());

        if (i>50) {
            //死亡
            return !this.isNagation() ? EStatus.Success : EStatus.Failure;
        } else {
            return !this.isNagation() ? EStatus.Failure : EStatus.Success;
        }
    }

    addChild(child: IBehaviour): void {
        
    }
}