const DefaultInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const LandscapeInsets = {
    top: 0,
    bottom: 0,
    left: 44,
    right: 44
};

const PortraitInsets = {
    top: 44,
    bottom: 34,
    left: 0,
    right: 0
};

const LongWith = 777.0; // iPhoneX 812, HuaweiP20 2240/1080 777/375
const LongHeight = 375.0;

export default class UISafeArea extends Laya.Script {

    onAwake() {
        this.owner.parent.on(Laya.Event.RESIZE, this, this.onResize);
    }

    onEnable() {
        Laya.timer.callLater(this, this.onResize);
        this.owner.parent.on(Laya.Event.RESIZE, this, this.onResize);
    }

    onResize() {

        let owner = (this.owner as Laya.UIComponent);
        let parent = (this.owner.parent as Laya.UIComponent);

        if (owner == null || parent == null) return;

        let widget = owner.getComponent(Laya.Widget);
        let w = parent.width;
        let h = parent.height;
        console.log('SafeArea.onResize parentSize: ' + w + ', ' + h);

        if (w <= 0 || h <= 0) return;

        const landscape = w > h;

        if (landscape) {
            const insets = (w / h) >= (LongWith / LongHeight) ? LandscapeInsets : DefaultInsets;

            widget.top = Math.round(h * insets.top / LongHeight);
            widget.bottom = Math.round(h * insets.bottom / LongHeight);
            widget.left = Math.round(w * insets.left / LongWith);
            widget.right = Math.round(w * insets.right / LongWith);
            widget.resetLayout();

            console.log('SafeArea.onResize insets: ' + JSON.stringify(insets));
            console.log('SafeArea.onResize real insets: { left: ' + widget.left + ', right: ' + widget.right + ', top: ' + widget.top + ', bottom: ' + widget.bottom + '}');
        }
        else {
            const insets = (h / w) >= (LongWith / LongHeight) ? PortraitInsets : DefaultInsets;

            widget.top = Math.round(h * insets.top / LongWith);
            widget.bottom = Math.round(h * insets.bottom / LongWith);
            widget.left = Math.round(w * insets.left / LongHeight);
            widget.right = Math.round(w * insets.right / LongHeight);
            widget.resetLayout();

            console.log('SafeArea.onResize insets: ' + JSON.stringify(insets));
            console.log('SafeArea.onResize real insets: { left: ' + widget.left + ', right: ' + widget.right + ',top: ' + widget.top + ', bottom: ' + widget.bottom + '}');
        }
    }
}