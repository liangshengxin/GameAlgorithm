import BaseAction from "../../abstract/BaseAction";
import { EStatus } from "../../Enum";
import IBehaviour from "../../interface/IBehaviour";
/**
 * 跑路
 */
export default class ActionRunaway extends BaseAction{
  
    public update():EStatus{
        console.log("跑路")
        return EStatus.Success;
    }

    addChild(child:IBehaviour){

    }
}