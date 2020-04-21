# 函数相关知识点

String.prototype.split()分割字符串

String.prototype.startswith()判断一个字符串是否由给定的子串开头

Math.floor()向下取整

Date.prototype().getTime()获得当前时间对应的毫秒数



# 解决方案

## 问题1

先对整个url以"?"进行分割，得到queryString部分。再对queryString以"&"分割，得到每一个name-value pair，存储在一个数组里。遍历这个数组，判断是否有名为name的属性

## 问题2

程序开始执行前先用Date.prototype.getTime()获得当前时间对应的毫秒数，计算出下一个整分钟时对应的毫秒数，记为timeLimit。利用setTimeInterval(timeTest,5000)使timeTest函数每五秒运行一次。每次在对框中的值乘2前先判断 a.当前的时间有没有超过timeLimit b.迭代次数是否超过10次。如果符合条件则将框中内容乘2。

## 问题3

遍历整个字符串，建立字符串中每个字符的名字到出现次数的映射。再在映射中找出出现次数最多的字符和对应的次数，输出。