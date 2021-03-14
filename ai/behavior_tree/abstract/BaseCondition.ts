import ICondition from "../interface/ICondition";
import BaseBehaviour from "./BaseBehaviour";

/**
 * 条件基类
 */
export default abstract class BaseCondition extends BaseBehaviour implements ICondition {
    /** 是否取反 */
    protected negation: boolean = false;

    isNagation(): boolean {
        return this.negation;
    }
    setNepation(negation: boolean): void {
        this.negation = negation;
    }

}