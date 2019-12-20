
## 关于store.state.moduleConfig 的 length
>> 在遍历 store中的状态 moduleConfig 的length的时候
>不能直接使用.length，要额外的写个函数遍历，判断里面的对象
>是否为空
>如果为空则不计算 实际长度的length
>如果不为空，则计算实际长度的 length
>

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


## 关于 element-tree

- 增加节点后 `node.id` 会 +1
- 移除节点后 `node.id` 会 -1
- 且不管你是在哪个父级下面建立子级
  >即使是在第一个2级的 tree node 中建立下级tree node
  >（假设此时你2级的 tree node，有N 个）
  >但它的 node id 永远维护着自己的增长规律
  >
- 正确的做法是 使用 `data` 中的配置 配置一个 `id`
  > 使用 node.data.id 来 作为唯一的标识
