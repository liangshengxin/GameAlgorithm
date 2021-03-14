import BaseAction from "../../abstract/BaseAction";
import { EStatus } from "../../Enum";
import IBehaviour from "../../interface/IBehaviour";
/**
 * 巡逻
 */
export default class ActionPatrol extends BaseAction{
    
    public update():EStatus{
        console.log('巡逻')

        return EStatus.Success;
    }

    addChild(child:IBehaviour){

    }
}