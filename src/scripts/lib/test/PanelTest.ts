import CameraMoveScript from "../CameraMoveScript";
import UIPanel from "../UIPanel";
import Util from "../Util";

export default class TestPanel extends UIPanel {

    btnShow3D: Laya.Sprite;

    onAwake(): void {
        this.btnShow3D = this.getChildByName('btnShow3D') as Laya.Sprite;
        this.btnShow3D.on(Laya.Event.CLICK, this, this.onBtnClicked);
    }

    onBtnClicked(): void {
        Util.Load3D('res3d/man_scene.lh', Laya.Handler.create(this, () => {

            // 添加相机
            var camera = new Laya.Camera();
            this.scene.addChild(camera);
            // 设置相机清楚标记，使用天空
            camera.clearFlag = Laya.CameraClearFlags.SolidColor;
            // 调整相机的位置
            camera.transform.translate(new Laya.Vector3(3, 20, 47));
            // 相机视角控制组件(脚本)
            camera.addComponent(CameraMoveScript);

            //添加光照
            var directionLight = this.scene.addChild(new Laya.DirectionLight());
            //光照颜色
            directionLight.color = new Laya.Vector3(1, 1, 1);
            directionLight.transform.rotate(new Laya.Vector3(-3.14 / 3, 0, 0));

            //使用精灵
            var sp = Laya.Loader.getRes('res3d/man_scene.lh');
            var man = this.addChild(sp) as Laya.Sprite3D;
            man.transform.localScale = new Laya.Vector3(4, 4, 4);
            man.transform.translate(new Laya.Vector3(-10, 13, 0));

            //获取动画组件
            let animator = man.getChildAt(0).getComponent(Laya.Animator);

            var pangAni = Laya.Loader.getRes("res3d/Man/Assets/Res/man_fbx-Root_Run_loop.lani");
            //创建动作状态
            var state1 = new Laya.AnimatorState();
            //动作名称
            state1.name = "hello";
            // //动作播放起始时间
            // state1.clipStart = 0 / 581;
            // //动作播放结束时间
            // state1.clipEnd = 581 / 581;
            //设置动作
            state1.clip = pangAni;
            //设置动作循环
            state1.clip.islooping = true;
            //为动画组件添加一个动作状态
            animator.getControllerLayer(0).addState(state1);
            //播放动作
            animator.play("hello");
        }));
    }


}