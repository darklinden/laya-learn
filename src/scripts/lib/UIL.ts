import UIPanel from "./UIPanel";

const PanelPath = 'panel/';

export default class UIL {

    private static _instance: UIL = null;
    public static get instance(): UIL {
        if (!this._instance) this._instance = new UIL();
        return this._instance;
    }

    // private _save
    // private setPanel(path: string, panel: cc.Node) {
    //     this._panelSaved = this._panelSaved || {};
    //     this._panelSaved[this._scene] = this._panelSaved[this._scene] || {};
    //     this._panelSaved[this._scene][path] = panel;
    // }

    // private getPanel(path: string): cc.Node {
    //     this._panelSaved = this._panelSaved || {};
    //     this._panelSaved[this._scene] = this._panelSaved[this._scene] || {};
    //     return this._panelSaved[this._scene][path];
    // }

    // // for prevent fire
    // private _panelShow: Dictionary<boolean> = {};
    // public hasShownPanel() {
    //     let has = false;
    //     for (const k in this._panelShow) {
    //         if (this._panelShow[k]) {
    //             has = true;
    //             break;
    //         }
    //     }
    //     return has;
    // }

    // public markPanelShow(k: string) {
    //     this._panelShow[k] = true;
    // }

    // public markPanelClosed(k: string) {
    //     this._panelShow[k] = false;
    //     delete this._panelShow[k];
    // }

    public static Show(panelName: string, data?: any, completion?: (panel: UIPanel) => void): void {
        this.instance._Show(panelName, data, completion);
    }

    private _Show(panelName: string, data?: any, completion?: (panel: UIPanel) => void): void {

        // let path: string = PanelPath + panelName;

        // const p = this.getPanel(path);
        // if (p) {

        //     let preventAction = true;
        //     let c = p.getComponent(panelName);
        //     if (!c) c = p.getComponent(CommonPanel);
        //     if (c) {
        //         try {
        //             c['setClosedCallback']((forceClose: boolean) => {
        //                 this.markPanelClosed(path);
        //                 !forceClose && closed && closed();
        //             });
        //             if (data) c['setData'](data);
        //             preventAction = c['preventAction']();
        //         }
        //         catch (e) {
        //             cc.log(e);
        //         }
        //     }

        //     p.active = true;
        //     vag.util.bringNodeToFront(p);
        //     preventAction && this.markPanelShow(path);
        //     this.eventChanged();
        //     if (completion) completion(p);
        //     return;
        // }

        // if (this._panelLoading[path]) return;

        // this._panelLoading[path] = true;
        // vag.loading.show();

        // let abundle = cc.resources;
        // let loadPath = path;

        // let adc = vag.downloadFile.getDownloadContentInfoForGametype(vag.data.game.gameType)
        // if (adc && adc.assetBundle) {
        //     abundle = adc.assetBundle;
        //     loadPath = PanelPath + panelName;
        // }

        // abundle.load(loadPath, cc.Prefab, (err: Error, panelPrefab: cc.Prefab) => {
        //     if (!this._panelLoading[path]) return;
        //     delete this._panelLoading[path];
        //     vag.loading.hide();
        //     if (err) {
        //         cc.error(err);
        //         closed && closed();
        //     }
        //     else {
        //         if (!panelPrefab) {
        //             cc.error('UILoader.show empty resource');
        //             closed && closed();
        //             return;
        //         }

        //         this.addRes2Release(panelPrefab);

        //         const panel = cc.instantiate(panelPrefab.data);

        //         let preventAction = true;
        //         let c = panel.getComponent(panelName);
        //         if (!c) c = panel.getComponent(CommonPanel);
        //         if (c) {
        //             try {
        //                 const doNotSave = c['doNotSave']();
        //                 c['setClosedCallback']((forceClose: boolean) => {
        //                     this.markPanelClosed(path);
        //                     if (doNotSave) {
        //                         this.setPanel(path, null);
        //                     }
        //                     !forceClose && closed && closed();
        //                 });
        //                 if (data) c['setData'](data);
        //                 preventAction = c['preventAction']();
        //                 this.setPanel(path, panel);

        //             }
        //             catch (e) {
        //                 cc.log(e);
        //             }
        //         }

        //         panel.parent = cc.director.getScene().getComponentInChildren(cc.Canvas).node;
        //         vag.util.bringNodeToFront(panel);
        //         preventAction && this.markPanelShow(path);
        //         this.eventChanged();
        //         if (completion) completion(panel);
        //     }
        // });
    }

    public static Hide(panelName: string): void {
        this.instance._Hide(panelName);
    }

    private _Hide(panelName: string) {
        // if (!gameType) gameType = GameType.HALL;

        // let path: string;

        // if (gameType == GameType.HALL) {
        //     path = PanelPath + panelName;
        // }
        // else {
        //     path = PanelPath + GameTypeName.toName(gameType) + '/' + panelName;
        // }

        // const p = this.getPanel(path);
        // if (p && p.active) {
        //     this.markPanelClosed(path);

        //     let c = p.getComponent(panelName);
        //     if (!c) c = p.getComponent(CommonPanel);
        //     if (c) {
        //         try {
        //             c['aBtnCloseClicked']();
        //         }
        //         catch (e) {
        //             cc.log(e);
        //         }
        //     }
        // }
    }

    public static IsShowing(panelName: string): boolean {
        return this.instance._IsShowing(panelName);
    }

    private _IsShowing(panelName: string): boolean {
        // if (!gameType) gameType = GameType.HALL;

        // let path: string;

        // if (gameType == GameType.HALL) {
        //     path = PanelPath + panelName;
        // }
        // else {
        //     path = PanelPath + GameTypeName.toName(gameType) + '/' + panelName;
        // }

        // const p = this.getPanel(path);
        // return (p && p.active);
        return false;
    }

    public static ApplyData(panelName: string, data: any): void {
        this.instance._ApplyData(panelName, data);
    }

    private _ApplyData(panelName: string, data: any) {
        // if (!gameType) gameType = GameType.HALL;

        // let path: string;

        // if (gameType == GameType.HALL) {
        //     path = PanelPath + panelName;
        // }
        // else {
        //     path = PanelPath + GameTypeName.toName(gameType) + '/' + panelName;
        // }

        // const p = this.getPanel(path);
        // if (p && p.active) {

        //     let c = p.getComponent(panelName);
        //     if (!c) c = p.getComponent(CommonPanel);
        //     if (c) {
        //         try {
        //             c['setData'](data);
        //         }
        //         catch (e) {
        //             cc.log(e);
        //         }
        //     }
        // }
    }

    public static HideAll(): void {
        this.instance._HideAll();
    }

    private _HideAll() {
        // this._panelSaved = this._panelSaved || {};
        // this._panelShow = {};
        // this._panelLoading = {};
        // for (const k in this._panelSaved) {
        //     if (!this._panelSaved.hasOwnProperty(k)) continue;

        //     const dict = this._panelSaved[k];
        //     if (!dict) continue;

        //     for (const j in dict) {
        //         if (!dict.hasOwnProperty(j)) continue;
        //         const p = dict[j];
        //         if (p && p.active) {
        //             const c = p.getComponent(CommonPanel);
        //             if (c) {
        //                 try {
        //                     c['aBtnCloseClicked'](true);
        //                 }
        //                 catch (e) {
        //                     cc.log(e);
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}