import IBehaviour from "./IBehaviour";

/**
 * 条件基类
 * 具体执行条件
 */
export default interface ICondition extends IBehaviour {
    /** 获取条件结果是否取反 */
    isNagation(): boolean;

    /** 设置条件结果是否取反 */
    setNepation(negation: boolean): void;
}