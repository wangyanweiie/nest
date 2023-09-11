# DATABASE

## 一、数据类型

## 二、MySQL 语法

### 启动与连接

```shell
# 启动数据库
# 在安装路径的 bin 文件夹下或者配置电脑系统变量
net start mysql

# 停止数据库
net stop mysql

# 连接数据库
mysql -u root -p

# 退出连接
exit/quit
```

### 基本语法

``` shell
# 查看数据库
SHOW DATABASE;

# 创建数据库
CREATE DATABASE 数据库名;

# 删除数据库
DROP DATABASE 数据库名;

# 选择数据库
USE 数据库名;

# 创建表
CREATE TABLE 表名 (列名 列类型);

# 删除表
DROP TABLE 表名 ;

# 在表中插入数据
INSERT INTO 表名 (列名1, ...列名N) 
VALUES (值1, ...值N);

# 查询数据
# SELECT 命令可以读取一条或者多条记录
# 可以使用星号（*）来代替其他字段，SELECT 语句会返回表的所有字段数据
# 可以使用 WHERE 语句来包含任何条件
#   - [WHERE condition1 [AND [OR]] condition2.....
#   - 可以使用 AND 或者 OR 指定一个或多个条件
#   - 可以运用于 SQL 的 DELETE 或者 UPDATE 命令
#   - 类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据
# 可以使用 LIMIT 属性来设定返回的记录数
# 可以通过 OFFSET 指定 SELECT 语句开始查询的数据偏移量，默认偏移量为 0
SELECT 列名,列名 
FROM 表名
[WHERE conditions]
[LIMIT N]
[OFFSET M];

# 更新表中数据
# 可以同时更新一个或多个字段
# 可以在 WHERE 子句中指定任何条件
# 可以在一个单独表中同时更新数据
UPDATE 表名 SET 列名1=新值1, 列名2=新值2
[WHERE conditions]

# 删除表中数据
# 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除
# 可以在 WHERE 子句中指定任何条件
# 可以在单个表中一次性删除记录
DELETE FROM 表名 
[WHERE conditions]

# LIKE 子句
# 可以在 WHERE 子句中指定任何条件
# 可以在 WHERE 子句中使用 LIKE 子句
# LIKE 通常与 % 一同使用，类似于一个元字符的搜索
# 如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的
# 可以使用 AND 或者 OR 指定一个或多个条件
# 可以在 DELETE 或 UPDATE 命令中使用 WHERE...LIKE 子句来指定条件
SELECT 列名1, ...列名N
FROM 表名
WHERE 列名1 LIKE condition1 [AND [OR]] 列名2 = 'somevalue'

# UNION 操作符
# MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合
# UNION [ALL | DISTINCT] 可选
#   - UNION DISTINCT：删除结果集中重复的数据再返回
#   - UNION ALL：返回所有结果集，包含重复数据
SELECT 列名1, ...列名N
FROM 表名1
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT 列名1, ...列名N
FROM 表名2
[WHERE conditions];

# 表数据排序
# 可以使用任何字段来作为排序的条件，从而返回排序后的查询结果
# 可以设定多个字段来排序
# 可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列，默认升序
# 可以添加 WHERE...LIKE 子句来设置条件
SELECT 列名1, ...列名N 
FROM 表名
[WHERE conditions];
ORDER BY 列名1 [ASC | DESC];

# 列分组
# 在分组的列上我们可以使用 COUNT, SUM, AVG,等函数
# WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）
SELECT 列名, function(列名1, ...列名N)
FROM 表名
[WHERE conditions];
GROUP BY 列名;
```

### MySQL 连接的使用

我们已经学会了如何在一张表中读取数据，这是相对简单的，但是在真正的应用中经常需要从多个数据表中读取数据。下面我们将向大家介绍如何使用 MySQL 的 JOIN 在两个或多个表中查询数据，你可以在 SELECT, UPDATE 和 DELETE 语句中使用 Mysql 的 JOIN 来联合多表查询。

JOIN 按照功能大致分为如下三类：

- INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录
- LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录
- RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录

``` shell
# a ==> 表名1；b ==> 表名2
SELECT a.列名1, a.列名2, b.列名1 
FROM 表名1
INNER JOIN 表名2 
ON a.列名1 = b.列名2;

# 等价于
SELECT a.列名1, a.列名2, b.列名1 
FROM 表名1, INNER JOIN 表名2 
WHERE a.列名1 = b.列名2;
```

### MySQL NULL 值处理

我们已经知道 MySQL 使用 SQL SELECT 命令及 WHERE 子句来读取数据表中的数据，但是当提供的查询条件字段为 NULL 时，该命令可能就无法正常工作。关于 NULL 的条件比较运算是比较特殊的，你不能使用 = NULL 或 != NULL 在列中查找 NULL 值。在 MySQL 中，NULL 值与任何其它值的比较（即使是 NULL）永远返回 NULL，即 NULL = NULL 返回 NULL。

为了处理这种情况，MySQL提供了三大运算符:

- IS NULL: 当列的值是 NULL,此运算符返回 true。
- IS NOT NULL: 当列的值不为 NULL, 运算符返回 true。
- <=>: 比较操作符（不同于 = 运算符），当比较的的两个值相等或者都为 NULL 时返回 true。

``` shell
# 可以使用 WHERE...IS NOT NULL 子句来判空
SELECT * from 表名 
WHERE 列名 IS NOT NULL;
```

### MySQL 索引

### MySQL ALTER命令
