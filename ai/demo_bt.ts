import BehaviorTreeBuilder from "./behavior_tree/BehaviorTreeBuilder"
import { EPolicy } from "./behavior_tree/Enum";
import { INode } from "./behavior_tree/IDataType";
import ActionAttack from "./behavior_tree/impl/action/ActionAttack";
import ActionPatrol from "./behavior_tree/impl/action/ActionPatrol";
import ActionRunaway from "./behavior_tree/impl/action/ActionRunaway";
import ParallelImpl from "./behavior_tree/impl/composite/ParallelImpl";
import SelectorImpl from "./behavior_tree/impl/composite/SelectorImpl";
import SequenceImpl from "./behavior_tree/impl/composite/SequenceImpl";
import ConditionEnemySee from "./behavior_tree/impl/condition/ConditionEnemySee";

export const behaviorTree = (selfNode: INode, enemys: INode[]) => {
    //创建行为树
    let builder = new BehaviorTreeBuilder();
    let tree = builder
        .addBehavior(new SelectorImpl) //组合选择
        .addBehavior(new SequenceImpl) //组合顺序
        .addBehavior(new ConditionEnemySee(false, enemys)) //条件-看见敌人
        .back()
        //组合并行-全部成功或全部失败
        .addBehavior(new ParallelImpl(EPolicy.RequireAll, EPolicy.RequireAll))
        //动作-跑路
        .addBehavior(new ActionRunaway)
        .back()
        //动作-攻击
        .addBehavior(new ActionAttack)
        .back(3)
        //动作-巡逻
        .addBehavior(new ActionPatrol)
        .end(selfNode)
    return tree;
}

let enemys: INode[] = [1, 2, 3, 4];
let tree = behaviorTree(null, enemys);
for (let i = 0; i < 10; i++) {
    tree.tick()
    console.log('==============')
}