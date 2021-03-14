import BaseAction from "../../abstract/BaseAction";
import { EStatus } from "../../Enum";
import IBehaviour from "../../interface/IBehaviour";

/**
 * 攻击
 */
export default class ActionAttack extends BaseAction {

    public update(): EStatus {
        console.log('攻击')
        return EStatus.Success;
    }

    addChild(child: IBehaviour): void {
    }
}