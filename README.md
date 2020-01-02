
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
> 这是由于我删除数组中的某一条的时候不直接抹去，而且给对应下标的
>元素赋空对象 `{}` 
>


## 关于 element-tree 中的 id

- 增加节点后 `node.id` 会 +1
- 移除节点后 `node.id` 会 -1
- 且不管你是在哪个父级下面建立子级
  >即使是在第一个2级的 tree node 中建立下级tree node
  >（假设此时你2级的 tree node，有N 个）
  >但它的 node id 永远维护着自己的增长规律
  >
- 正确的做法是 使用 `data` 中的配置 配置一个 `id`
  
  > 使用 node.data.id 来 作为唯一的标识

## 关于module从后端读取后的渲染

> 后台返回的Json格式可能有所改变，应该先观察返回的Json对象
> 在 `setModuleConfig` 的同时注意接口中返回的Json中的某些对象是否为空
> ，否则将在中途抛出错误

## 关于命名与 对象的结构设计

- 每一个 `HttpAction `必定属于一个 `HttpModule`
- HttpQueryAction 
- HttpActionReport
- HttpQueryActionReport

从后台读取到的 `HttpAction` 放入到 `moduleConfig` 的 `inter `

```javascript
moduleConfig = [
  {
    moduleKey:1,
    interfaceConfig:
    {
        HttpAction:[
          
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
getHttpActionList之后，
遍历这个 List ，找到每一项的唯一标识 id，（moduleKey）
在返回的数据里面，字段名字叫 module

看看这个HttpAction 接口信息是属于哪一个 模块，就放到对应的模块下面

先在 moduleConfig 里面找 module 的 index 然后
放到 moduleConfig[index].interfaceConfig.HttpAction.push({})

## 关于tree node（树节点）中如果加入了 vue 中的响应式数据
>tree node（树节点）中如果加入了 vue 中的响应式数据,则 tree的 
>`:render-content="指定的render函数"` ，该指定的 render 函数会被调用多次
>（因为vue检测到了依赖的添加，则会动态的通知依赖点更新） 

>解决方案：

-  需要在 指定的render 函数中加入 多个情况下的`if`
- 

## 关于Vuex 读取数据库后 element-tree 渲染节点的注意事项


````
