import UIL from "./UIL";

export default class UILoaderBtn extends Laya.Script {

    /** @prop {name:Uri, tips:"UIPanel 路径", type:String, default:""}*/
    public Uri: string = "";

    /** @prop {name:Data, tips:"UIPanel 数据", type:String, default:""}*/
    public Data: string = "";

    onEnable(): void {
        this.owner.on(Laya.Event.CLICK, this, this.onClick);
    }

    onClick(e: Laya.Event): void {
        if (this.Data && this.Data.length) {
            UIL.Show(this.Uri, this.Data);
        } else {
            UIL.Show(this.Uri);
        }
    }
}
