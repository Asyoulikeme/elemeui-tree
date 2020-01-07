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
>- 因为使用splice 会破坏数组，渲染会出问题，所以只能设置为空对象




## 关于 element-tree 中的 id

- 增加节点后 `node.id` 会 +1
- 移除节点后 `node.id` 会 -1
- 且不管你是在哪个父级下面建立子级
  >即使是在第一个2级的 tree node 中建立下级tree node
  >（假设此时你2级的 tree node，有N 个）
  >但它的 node id 永远维护着自己的增长规律
- 正确的做法是 使用 `data` 中的配置 配置一个 `id`
  
  > 使用 node.data.id 来 作为唯一的标识



在编码设计中：

- `module ` 的`node.data.id` 从0开始渲染，依次递增 (视图层的节点id)

  - 其id 由全局变量 `nodeKeyId `维护，依次递增

- `module ` 的`node.data.id` 就是 `module `的 `moduleKey` (数据库中存在的id 实体层id)

- `interface` 的  `node.data.id`  由 （`nodeKeyId`  + `childrenNodeKeyID`） 维护(视图层的节点id)

  - 由 : 模块数 + 当前总共的子节点（interfaceNode）数维护

  

## 关于module，interface从后端读取后的渲染

**注意事项：**

> - 后台返回的Json格式可能有所改变，应该先观察返回的Json对象
>
> - 在 `setModuleConfig` 的同时注意接口中返回的Json中的某些对象是否为空，否则将在中途抛出错误
>
> - 每个异步的逻辑都基于一个 `promise`，一旦后端的数据返回有改变`.then()`中的逻辑将不可用，请核对后端返回数据
>
>   ````javascript
>   /*现阶段后端返回格式如下：*/
>   {
>       code:1,
>       msg:""
>   }
>   /*所以我的写法*/
>   if(response.code === 1){
>   	//成功的逻辑与回调
>   }
>   else{
>       //否则将视为失败
>   }
>   ````
>
> 总的来说，多观察后端数据的变化

**大致方法：**

>getHttpActionList之后，
>遍历这个 List ，找到每一项的唯一标识 id，（moduleKey）
>在返回的数据里面，字段名字叫 module
>
>看看这个HttpAction 接口信息是属于哪一个 模块，就放到对应的模块下面
>
>先在 moduleConfig 里面找 module 的 index 然后
>放到 moduleConfig[index].interfaceConfig.HttpAction.push({})



## 关于tree node（树节点）中如果加入了 vue 中的响应式数据

>tree node（树节点）中如果加入了 vue 中的响应式数据,则 tree的 
>`:render-content="指定的render函数"` ，该指定的 render 函数会被调用多次
>（因为vue检测到了依赖的添加，则会动态的通知依赖点更新） 

**解决方案：**

> - 需要在 指定的render 函数中加入 多个情况下的`if`





## 之后要解决的问题
> 四大类型的接口结构以及设计好了，就等后台重新写后再配合后台写动态存储。
> 后续的工作是查bug
