export default class Util {

    public static Load3D(uri: string, completion: Laya.Handler) {
        let deps_path = uri.substring(0, uri.lastIndexOf('.'));
        deps_path += '_deps.json';
        Laya.loader.load(deps_path, Laya.Handler.create(completion.caller, () => {
            var arr: any = Laya.loader.getRes(deps_path);
            Laya.loader.create(arr, completion);
        }));
    }

    public static Unload3D(uri: string, completion: Laya.Handler) {
        let deps_path = uri.substring(0, uri.lastIndexOf('.'));
        deps_path += '_deps.json';
        Laya.loader.load(deps_path, Laya.Handler.create(completion.caller, () => {
            var arr: any = Laya.loader.getRes(deps_path);
            for (var i: number = arr.length - 1; i > -1; i--) {
                // 根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
                var resource: Laya.Resource = Laya.loader.getRes(arr[i].url);
                // 资源释放
                resource.destroy();
            }
            Laya.loader.clearRes(deps_path);
        }));
    }
}