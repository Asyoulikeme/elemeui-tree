| 开发环境 | 版本号 |
|----------|--------|
|Webstorm | v2019.3 |
|Vue-cli  | v4.1.1 |
|axios   | v0.19.1 |
|ElementUI| v2.13.0|
|https://www.iconfont.cn/ | 阿里矢量图标|




注意：文档中提到的`interface` 代表以下四类接口

1. HttpAction
2. HttpQueryAction 
3. HttpActionReport
4. HttpQueryActionReport

## 关于命名与 对象的结构设计

- 每一个 `HttpAction `必定属于一个 `HttpModule`，如下皆是如此
- HttpQueryAction 
- HttpActionReport
- HttpQueryActionReport

举例：从后台读取到的 `HttpAction` 放入到 `moduleConfig` 的 `interfaceConfig `

```javascript
state.moduleConfig = [
  {
    moduleKey:1,
    interfaceConfig:
    {
        HttpAction:[
          //push放于这里
        ],
        HttpQueryAction:[
        
        ],
        HttpActionReport:[
        
        ],
        HttpQueryActionReport:[
        
        ]     
    } 
    
  }
]
```



## 关于store.state.moduleConfig 的 length

>在遍历 store中的状态 moduleConfig 的length的时候
>不能直接使用.length，要额外的写个函数遍历，判断里面的对象
>是否为空
>如果为空则不计算 实际长度的length
>如果不为空，则计算实际长度的 length

> moduleConfig 中的存储可能呈现为以下样子:

````javascript
moduleConfig = [
  {
    // index 为 0 的时候，它可能是空对象
  },
  {
    name: '新模块',
    dbtype: 'MySql',
    dataSourceType:'C3P0',
    dbUrl:'',
    dbUser:'',
    dbPassword:''
  } ,
  {
    // index 为 n 的时候，它也有可能是空对象
  } 
]
````
> - 这是由于我删除数组中的某一条的时候不直接抹去，而是给对应下标的元素赋空对象 `{}` 
>
>- 因为使用splice 会破坏数组，渲染会出问题，所以暂时只设置为空对象




## 关于 element-tree 中的 id

- 增加节点后 `node.id` 会 +1
- 移除节点后 `node.id` 会 -1
- 且不管你是在哪个父级下面建立子级
  >即使是在第一个2级的 tree node 中建立下级tree node
  >（假设此时你2级的 tree node，有N 个）
  >ElementUI 它的 node id 永远被它自己维护着自己的增长规律
- 正确的做法是 使用 `data` 中的配置 配置一个 `id`
  
  > 使用 node.data.id 来 作为唯一的标识



在编码设计中：

- `module ` 的`node.data.id` 从0开始渲染，依次递增 (视图层的节点id)

  - 其id 由全局变量 `nodeKeyId `维护，依次递增

- `module ` 的`node.data.id` 就是 `module `的 `moduleKey` (数据库中存在的id 实体层id)

- `interface` 的  `node.data.id`  由 （`nodeKeyId`  + `childrenNodeKeyID`） 维护(视图层的节点id)
- 由 : 模块数 + 当前总共的子节点（interfaceNode）数维护
  



目前的 module 与 interface 的id 都是通过 `nodeKeyId`  + `childrenNodeKeyID` 来岔开维护着它们的id进展的

如果要做到最后 id 不爆炸，个人觉得，应该将module 也独立成一张表，interface 的四大模块也是另外一张表，这样才能有效的避免 主键冲突，现阶段问题如下：

1. 在频繁的 建立 module 后，在module 下建立 interface，然后再建立module ，下一个id必须 是两者数量的合，这种情况不利于扩展，且删除中间节点的 module后容易发生主键冲突，现阶段解决方法如下：
   - 无奈之下，下一次添加时赋值的 id 用 module与 interface 的数量总和来维护

2. 在删除module后，会使得module 下面的interface依然存在，导致下一次刷新页面后，interface的初始化无法找到属于它的模块，将会抛出错误。现阶段解决方法如下：

   - 删除module 之前，需要先将其下面的 interface 手动点击删除

   - 数据库应该设置联动，既父表更新 / 删除时，子表采取对应行动

     

3. id 数字的大爆炸，即删除了module/interface 后（不按照顺序从后往前删），中间的id 用不到，id却一直在自增，虽然也无大碍，但还是有点隐患

## 关于module，interface从后端读取后的渲染

**注意事项：**

> - 后台返回的Json格式可能有所改变，应该先观察返回的Json对象
>
> - 在 `initSetModuleConfig/initSetHttpActionConfig` 的同时注意接口中返回的Json中的某些对象是否为空，否则将在中途抛出错误
>
> - 每个异步的逻辑都基于一个 `promise`，一旦后端的数据返回有改变`.then()`中的逻辑将不可用，请核对后端返回数据
>
>   ````javascript
>   /*现阶段后端返回格式如下：*/
>   {
>       code:1,
>       msg:""
>   }
>   /*我的写法*/
>   if(response.code === 1){
>   	//成功的逻辑与回调
>   }
>   else{
>       //否则将视为失败
>   }
>   ````
> 当且仅当返回 `code` 标记为 `1` 时，才执行成功的回调，
> 总的来说，多观察后端数据的变化

**大致方法：**

>访问接口`getHttpActionList`拿到数据之后，
>遍历`response.list `，先找到每一项的 `module`标识 id，（`moduleKey`）
>在返回的数据里面，字段名字叫 `module`（目前这么叫）
>
>看看这个HttpAction 接口信息是属于哪一个 模块(`module`)，就放到对应的模块下面
>
>先在 `moduleConfig` 数组里面找 module 的 index 然后
>放到 moduleConfig[index].interfaceConfig.HttpAction.push({})

````javascript
/*伪代码*/
let list = response.list;  // 从后台获取的
for(let item of list)
{
    let belongWithModule = item.module; // 拿到该 HttpAction 属于某个 module
    // 在对象数组里面遍历数组state.moduleConfig 的 item（每一项） 的 moduleKey，
    // 如果 item.moduleKey == belongWithModule 则返回所在的下标，否则返回 `not found`
    let index = 	objectArrayFoundKeyIndex(state.moduleConfig,"moduleKey",parseInt(belongWithModule));			
    //拿到属于某module 的下标后，再填充
    state.moduleConfig[index].interfaceConfig.HttpAction.push(item);
	
}
````





## 关于tree node（树节点）中如果加入了 vue 中的响应式数据

>tree node（树节点）中如果加入了 vue 中的响应式数据,则 tree的 
>`:render-content="renderFunctionName"` ，该指定的 render 函数会被调用多次
>（因为vue检测到了依赖的添加，则会动态的通知依赖点更新） 





## 之后要解决的问题
> 解决上一版本中的接口删除问题，
> 后台接口有bug，有关键词 Report的都不能进行添加操作，明天催办
> 接下来要完成 剩下三类接口的 保存与删除

