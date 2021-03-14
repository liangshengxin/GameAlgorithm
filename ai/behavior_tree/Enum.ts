/** 所有行为执行状态 */
export enum EStatus{
    /** 初始状态 */
    Invalid,
    /** 成功 */
    Success,
    /** 失败 */
    Failure,
    /** 运行 */
    Running,
    /** 终止 */
    Aborted,
}

/** Parallel节点成功与失败的要求，是全部成功/失败，还是一个成功/失败 */
export enum EPolicy{
    /** 一个成功/失败 */
    RequireOne,
    /** 全部成功/失败 */
    RequireAll,
}