
export enum EFitLimit {
    Height = 0,
    Width = 1,
}

export enum EFitLimitStep {
    P99,
    P90,
    P80,
    P70,
    P60,
    P50,
    P40,
    P30,
    P20,
    P10,
    P00,
}

const EFitLimitStepDict = {
    P99: 0.99,
    P90: 0.90,
    P80: 0.80,
    P70: 0.70,
    P60: 0.60,
    P50: 0.50,
    P40: 0.40,
    P30: 0.30,
    P20: 0.20,
    P10: 0.10,
    P00: 0,
}

const fAnimTime: number = 300;

export default class UIScaleFit extends Laya.Script {

    /** @prop { name:AutoFit, tips:"是否自动适配", type:Bool, default:true } */
    public AutoFit: boolean = true;

    /** @prop { name:sFitLimit, tips:"适配参考类型", type:Option, default:"Height", option:"Height,Width" } */
    public sFitLimit: string = "Height";

    public get FitLimit(): EFitLimit {
        return EFitLimit[this.sFitLimit];
    }

    /** @prop { name:sRateLimitMax, tips:"最大比例限制", type:Option, default:"P99", option:"P99,P90,P80,P70,P60,P50,P40,P30,P20,P10,P00" } */
    public sRateLimitMax: string = "P99";

    public get ERateLimitMax(): EFitLimitStep {
        return EFitLimitStep[this.sRateLimitMax];
    }

    public get RateLimitMax(): number {
        return EFitLimitStepDict[this.sRateLimitMax];
    }

    /** @prop { name:sRateLimitMin, tips:"最小比例限制", type:Option, default:"P00", option:"P99,P90,P80,P70,P60,P50,P40,P30,P20,P10,P00" } */
    public sRateLimitMin: string = "P00";

    public get ERateLimitMin(): EFitLimitStep {
        return EFitLimitStep[this.sRateLimitMin];
    }

    public get RateLimitMin(): number {
        return EFitLimitStepDict[this.sRateLimitMin];
    }

    onEnable(): void {
        if (window['debug']) {
            const widget = this.owner.getComponent(Laya.Widget);
            if (widget) {
                if (this.FitLimit == EFitLimit.Width && !isNaN(widget.left) && !isNaN(widget.right)) {
                    console.error('UIScaleFit [' + this.owner.name + '] WidthLimit with widget align both left and right');
                }

                if (this.FitLimit == EFitLimit.Height && !isNaN(widget.top) && !isNaN(widget.bottom)) {
                    console.error('UIScaleFit [' + this.owner.name + '] HeightLimit with widget align both top and bottom');
                }
            }
        }

        console.log('UIScaleFit.onEnable: [' + this.owner.name + ']');

        if (!this || !this.owner || !this.owner.parent) return;
        if (this.AutoFit) {
            this.onParentResize();
            this.owner.parent.on(Laya.Event.RESIZE, this, this.onParentResize);
        }
    }

    onDisable(): void {
        if (!this || !this.owner || !this.owner.parent) return;
        this.owner && this.owner.parent && this.owner.parent.off(Laya.Event.RESIZE, this, this.onParentResize);
    }

    private onParentResize() {
        if (!this || !this.owner || !this.owner.parent) return;

        let owner = (this.owner as Laya.UIComponent);
        let parent = (this.owner.parent as Laya.UIComponent);

        if (owner == null || parent == null) return;

        const w = owner.width;
        const h = owner.height;
        const pw = parent.width;
        const ph = parent.height;

        console.log("UIScaleFit.onParentResize: " + owner.name
            + ' fitType: ' + this.FitLimit
            + ' nodeScale: ' + owner.scaleX + ', ' + owner.scaleY
            + ' nodeSize: ' + w + ', ' + h
            + ' parentSize: ' + pw + ', ' + ph);

        switch (this.FitLimit) {
            case EFitLimit.Width: {
                this.FitWidth(owner, parent);
            }
                break;
            case EFitLimit.Height: {
                this.FitHeight(owner, parent);
            }
                break;
            default:
                break;
        }
    }

    FitWidth(owner: Laya.UIComponent, parent: Laya.UIComponent) {

        if (!this || !this.owner || !this.owner.parent) return;

        owner = owner || (this.owner as Laya.UIComponent);
        parent = parent || (this.owner.parent as Laya.UIComponent);

        if (owner == null || parent == null) return;

        let w = owner.width;
        let pw = parent.width;

        var scale = 1;
        if (w < pw * this.RateLimitMin) {
            scale = pw * this.RateLimitMin / w;
        }
        else if (w > pw * this.RateLimitMax) {
            scale = pw * this.RateLimitMax / w;
        }

        owner.scale(scale, scale);
    }

    FitHeight(owner: Laya.UIComponent, parent: Laya.UIComponent) {

        if (!this || !this.owner || !this.owner.parent) return;

        owner = owner || (this.owner as Laya.UIComponent);
        parent = parent || (this.owner.parent as Laya.UIComponent);

        if (owner == null || parent == null) return;

        let h = owner.height;
        let ph = parent.height;

        var scale = 1;
        if (h < ph * this.RateLimitMin) {
            scale = ph * this.RateLimitMin / h;
        }
        else if (h > ph * this.RateLimitMax) {
            scale = ph * this.RateLimitMax / h;
        }

        owner.scale(scale, scale);
    }

    public AnimEnable(completion: () => void = null, dur: number = -1) {
        if (dur !== -1) {
            dur = fAnimTime;
        }

        if (!this || !this.owner || !this.owner.parent) return;

        const owner = (this.owner as Laya.UIComponent);
        const parent = (this.owner.parent as Laya.UIComponent);

        if (owner == null || parent == null) return;

        let w = owner.width;
        let pw = parent.width;
        let h = owner.height;
        let ph = parent.height;

        let des_scale = 1.0;
        switch (this.FitLimit) {
            case EFitLimit.Width: {
                if (w < pw * this.RateLimitMin) {
                    des_scale = pw * this.RateLimitMin / w;
                }
                else if (w > pw * this.RateLimitMax) {
                    des_scale = pw * this.RateLimitMax / w;
                }
            }
                break;
            case EFitLimit.Height: {
                if (h < ph * this.RateLimitMin) {
                    des_scale = ph * this.RateLimitMin / h;
                }
                else if (h > ph * this.RateLimitMax) {
                    des_scale = ph * this.RateLimitMax / h;
                }
            }
                break;
            default:
                break;
        }

        owner.scale(0.01, 0.01);
        Laya.timer.callLater(this, () => {
            Laya.Tween.to(owner, { scaleX: des_scale * 1.1, scaleY: des_scale * 1.1 }, dur * 0.8, Laya.Ease.bounceInOut, Laya.Handler.create(this, () => {
                Laya.Tween.to(owner, { scaleX: des_scale, scaleY: des_scale }, dur * 0.2, Laya.Ease.bounceIn, Laya.Handler.create(this, () => {
                    this.onParentResize();
                    this.owner.parent.on(Laya.Event.RESIZE, this, this.onParentResize);
                    completion && completion();
                }));
            }));
        });
    }

    public AnimDisable(completion: () => void = null, dur: number = 0) {
        if (dur !== -1) {
            dur = fAnimTime;
        }

        if (!this || !this.owner || !this.owner.parent) return;

        const owner = (this.owner as Laya.UIComponent);
        const parent = (this.owner.parent as Laya.UIComponent);

        if (owner == null || parent == null) return;

        const des_scale = 0.01;
        Laya.Tween.to(owner, { scaleX: des_scale, scaleY: des_scale }, dur, Laya.Ease.bounceIn, Laya.Handler.create(this, () => {
            this.owner.parent.off(Laya.Event.RESIZE, this, this.onParentResize);
            completion && completion();
        }));
    }
}
