import UIPanel from "./UIPanel";

const PanelPathPrefix = 'prefab/ui_';

export default class UIL {

    private static _instance: UIL = null;
    public static get instance(): UIL {
        if (!this._instance) this._instance = new UIL();
        return this._instance;
    }

    private _lastRootCount: number = -1;
    private _lastRootIndex: number = -1;
    private _panelRoot: Laya.Node = null;
    public static AddPanelRoot() {
        this.instance._AddPanelRoot();
    }

    public _AddPanelRoot() {

        const root = new Laya.Sprite();
        root.name = 'UIL Panel Root';
        Laya.stage.addChild(root);
        this._panelRoot = root;

        this._lastRootCount = Laya.stage.numChildren;
        this._lastRootIndex = Laya.stage.getChildIndex(this._panelRoot);

        // warnning: LayaAir does not support CHILDCHANGED event, change che source code to add it for Stage
        // Laya.Node this._childChanged();
        // class Stage extends Sprite { ... _childChanged(child = null) { this.event(Event.CHILDCHANGED); }
        // class Event { ... Event.CHILDCHANGED = "childchanged";
        Laya.stage.on(Laya.Event.STAGE_CHILD_CHANGE, this, (child: Node) => {
            // prevent loop set
            if (Laya.stage.numChildren != this._lastRootCount
                || Laya.stage.getChildIndex(this._panelRoot) != this._lastRootIndex) {
                // should change this._panelRoot to cover 
                Laya.timer.callLater(this, () => {
                    this._lastRootCount = Laya.stage.numChildren;
                    this._lastRootIndex = Laya.stage.numChildren - 1;
                    Laya.stage.setChildIndex(this._panelRoot, Laya.stage.numChildren - 1);
                });
            }
        });

        const widget = this._panelRoot.getComponent(Laya.Widget) || this._panelRoot.addComponent(Laya.Widget);
        widget.left = 0;
        widget.right = 0;
        widget.top = 0;
        widget.bottom = 0;
    }

    private _cachedPanel: Map<string, UIPanel> = new Map();

    // for prevent fire
    private _showingPanel: Map<string, boolean> = new Map();
    public HasShownPanel() {
        return this._showingPanel.size > 0;
    }

    public MarkPanelShow(k: string) {
        this._showingPanel.set(k, true);
    }

    public MarkPanelClosed(k: string) {
        this._showingPanel.delete(k);
    }

    public static Show(panelPath: string, data?: any, completion?: (panel: UIPanel) => void): void {
        this.instance._Show(panelPath, data, completion);
    }

    private _pathToUri(panelPath: string): string {
        return PanelPathPrefix + panelPath + '.json';
    }

    private _createPanel(panelPath: string, prefab_res: Laya.Prefab): UIPanel | null {
        const prefab: Laya.Prefab = new Laya.Prefab();
        prefab.json = prefab_res;
        const p = prefab.create();

        let panel: UIPanel | null = null;
        if (p) {
            panel = p as UIPanel;
        }
        return panel;
    }

    private _dealBeforePanelShow(panel: UIPanel, panelPath: string, data: any) {
        this._cachedPanel.set(panelPath, panel);

        panel.panelPath = panelPath;
        panel.SetCloseCallback((u, p) => {
            this.MarkPanelClosed(u);
            this._cachedPanel.delete(u);
            this._releaseResForPanel(panelPath);
            panel.destroy();
        });

        if (data) panel.SetData(data);

        this._panelRoot.addChild(panel);

        // panel.parent = cc.director.getScene().getComponentInChildren(cc.Canvas).node;
        // vag.util.bringNodeToFront(panel);

        this.MarkPanelShow(panelPath);
    }

    private _Show(panelPath: string, data?: any, completion?: (panel: UIPanel | null) => void): void {

        const uri: string = this._pathToUri(panelPath);

        let panel: UIPanel | null = this._cachedPanel.get(panelPath);
        if (panel) {
            panel.removeSelf();
            this._panelRoot.addChild(panel);
        }
        else {
            const prefab_res: any = Laya.loader.getRes(uri);

            if (prefab_res) {
                panel = this._createPanel(panelPath, JSON.parse(prefab_res));
                if (panel) {
                    this._dealBeforePanelShow(panel, panelPath, data);
                }
                else {
                    console.error('UIL.Show Failed. ' + panelPath);
                }
                completion && completion(panel);
            }
            else {
                Laya.loader.load(uri, Laya.Handler.create(this, prefab_res => {
                    panel = this._createPanel(panelPath, prefab_res);
                    if (panel) {
                        this._dealBeforePanelShow(panel, panelPath, data);
                    }
                    else {
                        console.error('UIL.Show Failed. ' + panelPath);
                    }
                    completion && completion(panel);
                }));
            }
        }
    }

    public static Close(panelPath: string, force: boolean = false): boolean {
        return this.instance._Close(panelPath, force);
    }

    private _Close(panelPath: string, force: boolean): boolean {
        let panel: UIPanel | null = this._cachedPanel.get(panelPath);

        let ret: boolean = false;
        if (panel) {
            ret = true;
            panel.ZCloseClicked(force);
        }

        return ret;
    }

    public static IsShowing(panelPath: string): boolean {
        return this.instance._IsShowing(panelPath);
    }

    private _IsShowing(panelPath: string): boolean {
        let panel: UIPanel | null = this._cachedPanel.get(panelPath);
        return !!panel;
    }

    public static ApplyData(panelPath: string, data: any): boolean {
        return this.instance._ApplyData(panelPath, data);
    }

    private _ApplyData(panelPath: string, data: any): boolean {
        let panel: UIPanel | null = this._cachedPanel.get(panelPath);

        let ret: boolean = false;
        if (panel) {
            ret = panel.ApplyData(data);
        }

        return ret;
    }

    public static CloseAll(): void {
        this.instance._CloseAll();
    }

    private _CloseAll() {
        this._cachedPanel.forEach((panel, panelPath, map) => {
            this.MarkPanelClosed(panelPath);
            this._cachedPanel.delete(panelPath);
            this._releaseResForPanel(panelPath);
            panel.destroy();
        });
    }

    private _pathToRes(panelPath: string): string {
        return PanelPathPrefix + panelPath + '_deps.json';
    }

    private _releaseResForPanel(panelPath: string) {
        const res_path = this._pathToRes(panelPath);
        Laya.loader.load([{ url: res_path, type: Laya.Loader.JSON }],
            Laya.Handler.create(this, () => {
                // 获取加载的数据（Json数组转化成数组）
                var arr: any = Laya.loader.getRes(res_path);
                for (var i: number = arr.length - 1; i > -1; i--) {
                    // 根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
                    Laya.loader.clearTextureRes(arr[i]);
                }
            }));
    }
}