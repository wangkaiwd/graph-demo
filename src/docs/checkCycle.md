## 环检测

### 思路

### FAQ

#### 1. 我只要找到起点，然后进行 dfs，一轮就可以知道有没有环

非连通图

```mermaid
graph TD
    subgraph Component 1
    A --> B
    end

    subgraph Component 2 - Has Cycle
    C --> D
    D --> E
    E --> C
    end

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#f9f,stroke:#333,stroke-width:2px
```

没有办法找到一个起点，可以按照连线遍历完所有节点

```mermaid
graph LR
    A((A)) --> B((B))
    C((C)) --> B
    C --> D((D))
    D --> C

    style C fill:#f96,stroke:#333
    style D fill:#f96,stroke:#333
```

#### 2. visited 有什么作用？

```mermaid
graph TD
    A[Start Node A] --> B
    A --> C
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G

    style D fill:#bbf,stroke:#333,stroke-width:2px
```

没有 `visited` ，D 节点会被重复访问
