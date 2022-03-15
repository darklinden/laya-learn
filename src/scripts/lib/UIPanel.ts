
export default class UIPanel extends Laya.UIComponent {

    // @property({ visible: true })
    // protected _autoAnimateShow: boolean = true;

    // @property({ visible: true })
    // protected _autoAnimateDisable: boolean = true;

    // @property({ type: RectSizeFit, visible: true })
    // protected _animRectSizeFit: RectSizeFit = null;

    // @property({ type: cc.Animation, visible: true })
    // protected _animA: cc.Animation = null;

    // @property({ visible: true })
    // protected _notSave: boolean = false;

    // private _widget: cc.Widget = null;
    // protected _onPanelClosed: (forceClose: boolean) => void = null;

    // public preventAction(): boolean {
    //     return true;
    // }

    // public doNotSave(): boolean {
    //     return this._notSave;
    // }

    public ZCloseClicked(forceClose: boolean = false) {
        // if (this._animRectSizeFit && this._autoAnimateDisable) {

        //     this._animRectSizeFit.animDisable(() => {
        //         if (this && cc.isValid(this)) {
        //             vag.ui.eventChanged();
        //             this._onPanelClosed && this._onPanelClosed(forceClose);

        //             if (this.doNotSave()) {
        //                 this.node.destroy();
        //             }
        //             else {
        //                 this.node.active = false;
        //             }
        //         }
        //     }, dur);
        // }
        // else {
        //     this.scheduleOnce(() => {
        //         if (this && cc.isValid(this)) {
        //             vag.ui.eventChanged();
        //             this._onPanelClosed && this._onPanelClosed(forceClose);

        //             if (this.doNotSave()) {
        //                 this.node.destroy();
        //             }
        //             else {
        //                 this.node.active = false;
        //             }
        //         }
        //     });
        // }
    }

    // onRestore() {
    //     const widget = this.getComponent(cc.Widget) || this.addComponent(cc.Widget);
    //     widget.top = 0;
    //     widget.bottom = 0;
    //     widget.left = 0;
    //     widget.right = 0;
    // }

    // private _firstTimeRun: Dictionary<boolean> = {};
    // protected firstTimeRun(key: string = 'default'): boolean {
    //     if (Object.prototype.hasOwnProperty.call(this._firstTimeRun, key)) {
    //         return this._firstTimeRun[key];
    //     }

    //     this._firstTimeRun[key] = false;
    //     return true;
    // }

    // private _firstTimeEnable: Dictionary<boolean> = {};
    // protected firstTimeEnable(key: string = 'default'): boolean {
    //     if (Object.prototype.hasOwnProperty.call(this._firstTimeEnable, key)) {
    //         return this._firstTimeEnable[key];
    //     }

    //     this._firstTimeEnable[key] = false;
    //     return true;
    // }

    // onEnable() {
    //     this._firstTimeEnable = {};
    //     this._widget = this._widget || this.getComponent(cc.Widget) || this.addComponent(cc.Widget);
    //     this.resetSize();
    //     if (this._animRectSizeFit) {
    //         const block = this._animRectSizeFit.getComponent(cc.BlockInputEvents) || this._animRectSizeFit.addComponent(cc.BlockInputEvents);
    //         block.enabled = true;
    //     }

    //     if (this._autoAnimateShow && this._animRectSizeFit) {
    //         let dur = -1;
    //         if (this._animA) {
    //             this._animA.play("AnimOnable", 0);
    //             dur = this._animA.getAnimationState("AnimOnable").duration;
    //         }
    //         this._animRectSizeFit.animEnable(() => {
    //             this.onAnimateShow();
    //         }, dur);
    //     }

    //     if (this._animRectSizeFit) vag.util.mountClickAnim(this._animRectSizeFit.node);
    // }

    // protected onAnimateShow() {

    // }



    // public setData(data: any): void {
    //     cc.error('CommonPanel.setData No Implementation: ' + this.name);
    //     cc.error(data);
    // }

    // public setClosedCallback(closedCall: (forceClose: boolean) => void) {
    //     this._onPanelClosed = closedCall;
    // }

    // protected resetSize() {
    //     this._widget = this._widget || this.getComponent(cc.Widget) || this.addComponent(cc.Widget);
    //     this._widget.enabled = true;

    //     this._widget.isAlignHorizontalCenter = true;
    //     this._widget.horizontalCenter = 0;
    //     this._widget.isAlignVerticalCenter = true;
    //     this._widget.verticalCenter = 0;

    //     this._widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;

    //     const ws: cc.Size = SceneRoot.Root ? SceneRoot.Root.getContentSize() : this.node.parent.getContentSize();
    //     this.node.setContentSize(ws.width, ws.height);
    //     this.node.angle = SceneRoot.Root ? SceneRoot.Root.angle : 0;
    // }
}