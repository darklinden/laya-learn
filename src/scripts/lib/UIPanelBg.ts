import UIPanel from "./UIPanel";

const BGSprite = 'res/UIPanelBg.png';

export default class UIPanelBg extends Laya.Image {

    /** @prop { name:CloseOnClicked, tips:"当点击时关闭父UIPanel", type:Bool, default:true }*/
    public CloseOnClicked: boolean = true;

    onAwake(): void {

        this.loadImage(BGSprite, Laya.Handler.create(this, () => {
            this._widget.left = 0;
            this._widget.right = 0;
            this._widget.top = 0;
            this._widget.bottom = 0;
        }));

        this.on(Laya.Event.CLICK, this, this.onClicked);
    }

    private onClicked(button: Laya.Button): void {
        if (!this.CloseOnClicked) return;

        let pa = this.parent;
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

        if (panel) panel.ZCloseClicked();
    }
}