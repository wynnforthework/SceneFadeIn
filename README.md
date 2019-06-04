# SceneFadeIn
cocos creator场景切换淡入淡出效果

> 由于场景切换没有特效，查找了网上的资料都没有现成的方法，于是自己实现了这个淡入淡出效果。
### 用法
1. 修改SceneNameDict，包含你自己的场景名；
2. 需要跳转场景的时候，使用 SceneController.startScene(2);
3. 返回上一个场景，使用SceneController.finishScene();

### 更新
1. 修复finishScene错误