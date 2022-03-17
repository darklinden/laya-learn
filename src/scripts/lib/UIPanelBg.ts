import UIPanel from "./UIPanel";

const BGSprite = 'res/UIPanelBg.png';

export default class UIPanelBg extends Laya.Script {

    /** @prop { name:CloseOnClicked, tips:"当点击时关闭父UIPanel", type:Bool, default:true }*/
    public CloseOnClicked: boolean = true;

    onAwake(): void {
        (this.owner as Laya.Image).loadImage(BGSprite);
        const widget = this.owner.getComponent(Laya.Widget) || this.owner.addComponent(Laya.Widget);
        widget.left = 0;
        widget.right = 0;
        widget.top = 0;
        widget.bottom = 0;

        this.owner.on(Laya.Event.CLICK, this, this.onClick);
    }

    onClick(e: Laya.Event): void {
        if (!this.CloseOnClicked) return;

        let pa = this.owner;
        let limit = 5;
        let panel: UIPanel = null;
        while (pa && limit > 0) {
            if (pa instanceof UIPanel) {
                panel = pa as UIPanel;
                break;
            }
            else {
                pa = pa.parent;
                limit--;
            }
        }

        if (panel) panel.ZCloseClicked(false);
    }
}