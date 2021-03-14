import BaseDecorator from "../../abstract/BaseDecorator"
import { EStatus } from "../../Enum";
import IBehaviour from "../../interface/IBehaviour";
/**
 * 重复
 */
export default class DecoratorRepeat extends BaseDecorator {
    private limited: number = 3;
    private count: number = 0;
    
    public update(): EStatus {
        while (true) {
            this.child.tick();
            switch (this.child.getStatus()) {
                case EStatus.Running:
                    return EStatus.Running;
                case EStatus.Failure:
                    return EStatus.Failure;
                default:
                    break;
            }
            if (++this.count > this.limited) {
                return EStatus.Success;
            }
            this.child.reset();
        }
    }
    public onInitialize(): void {
        this.count = 0;
    }

    public addChild(child: IBehaviour) {
        super.addChild(child)
    }
}