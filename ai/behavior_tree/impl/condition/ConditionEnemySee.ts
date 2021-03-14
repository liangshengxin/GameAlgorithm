import BaseCondition from "../../abstract/BaseCondition";
import { EStatus } from "../../Enum";
import { INode } from "../../IDataType";

/**
 * 看到敌人
 */
export default class ConditionEnemySee extends BaseCondition {

    /** 敌人集合 */
    public enemys: INode[] = [];

    /**
     * 看到敌人
     * @param b 结果是否取反
     */
    constructor(b: boolean = false, enemys: INode[]) {
        super();
        this.setNepation(b)
        this.enemys = enemys;
    }

    public update(): EStatus {

        let re = Math.floor(100 * Math.random());

        let node = null;
        if (this.enemys.length > 0) {
            let index = Math.floor(Math.random() * this.enemys.length);
            node = this.enemys[index];
        }

        if (re > 50 && node != null) {
            console.log("看到敌人")
            //看到
            this.context.target = node;
            return !this.isNagation() ? EStatus.Success : EStatus.Failure;
        } else {
            console.log("没有看到")
            return !this.isNagation() ? EStatus.Failure : EStatus.Success;
        }
    }
}