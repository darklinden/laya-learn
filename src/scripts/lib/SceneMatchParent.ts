export default class SceneMatchParent extends Laya.Script {

    onAwake() {
        this.owner.parent.on(Laya.Event.RESIZE, this, this.onResize);
    }

    onEnable() {
        Laya.timer.callLater(this, this.onResize);
        this.owner.parent.on(Laya.Event.RESIZE, this, this.onResize);
    }

    onResize() {
        this.owner.scene.width = Laya.stage.width;
        this.owner.scene.height = Laya.stage.height;
    }
}