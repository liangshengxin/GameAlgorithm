import BaseCondition from "../../abstract/BaseCondition";
import { EStatus } from "../../Enum";

/**
 * 敌人体力低
 */
export default class ConditionEnemyHLow extends BaseCondition {
    /**
     * 敌人体力低
     * @param b 结果是否取反
     */
    constructor(b: boolean = false) {
        super();
        this.setNepation(b)
    }

    public update(): EStatus {
        let i = Math.floor(100 * Math.random());

        if (i>50) {
            console.log('体力低')
            //低
            return !this.isNagation() ? EStatus.Success : EStatus.Failure;
        } else {
            console.log('体力不低')
            return !this.isNagation() ? EStatus.Failure : EStatus.Success;
        }
    }
}