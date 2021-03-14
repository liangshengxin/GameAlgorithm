import { INode } from "./IDataType";

/** 上下文数据 */
export default class BtContext {
    /** 目标节点 */
    target: INode = null;
    /** 自身节点 */
    self: INode = null;
    /** 帧 */
    dt: number = null;
}