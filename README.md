# keyuse
 快捷键使用
---
##keyuse(keyname, des, fn);
用于添加一个快捷键；

###参数:
- `keyname`
快捷键名称，组合键需要以`+`隔开，例如： `c`、 `c + ctrl`、 `c + ctrl + shift`
- `des`
快捷键的功能描述
- `fn`
快捷键功能

###示例

    keyuse('f + alt + ctrl', '快捷键添加测试', function(){
        console.log('f + alt + ctrl');
    });

----------
##keyuse.remove(keyname);
用于删除一个**已添加**的快捷键；

###参数:
- `keyname`
快捷键名称，组合键需要以`+`隔开，例如： `c`、 `c + ctrl`、 `c + ctrl + shift`

###示例

    keyuse.remove('f + alt + ctrl');

----------
##keyuse.modify(keyname, des, fn);
用于修改一个**已添加**的快捷键；

###参数:
- `keyname`
快捷键名称，组合键需要以`+`隔开，例如： `c`、 `c + ctrl`、 `c + ctrl + shift`
- `des`
快捷键的功能描述
- `fn`
快捷键功能

###示例

    keyuse.modify('f + alt + ctrl', '快捷键修改测试', function(){
        console.log('f + alt + ctrl 修改！');
    });

----------
##keyuse.addList(arr);
批量添加快捷键；

###参数:
- `arr`
快捷键数组，每个元素包含以下三个参数：`keyname`， `des`， `fn`,
> - `keyname`
> 快捷键名称，组合键需要以`+`隔开，例如： `c`、 `c + ctrl`、 `c + ctrl + shift`
> - `des`
> 快捷键的功能描述
> - `fn`
> 快捷键功能

###示例

    var list = [
        {
            keyname: 'a', 
            des: '批量添加测试a', 
            fn: function(){
                console.log('a批量添加');
            }
        },
        {
            keyname: 'b', 
            des: '批量添加测试b', 
            fn: function(){
                console.log('b批量添加');
            }
        },
    ];
    keyuse.addList(list);

----------
##keyuse.removeList(arr)
批量删除**已添加**的快捷键

###参数
- `arr`
快捷键数组，元素格式如下：
> 快捷键名称，组合键需要以`+`隔开，例如： `c`、 `c + ctrl`、 `c + ctrl + shift`

###示例
    var list = ['a', 'f + alt + ctrl'];
    keyuse.removeList(list);
    
----------
##keyuse.modifyList(arr);
批量修改快捷键；

###参数:
- `arr`
快捷键数组，每个元素包含以下三个参数：`keyname`， `des`， `fn`,
> - `keyname`
> 快捷键名称，组合键需要以`+`隔开，例如： `c`、 `c + ctrl`、 `c + ctrl + shift`
> - `des`
> 快捷键的功能描述
> - `fn`
> 快捷键功能

###示例

    var list = [
        {
            keyname: 'a', 
            des: '批量修改测试a', 
            fn: function(){
                console.log('a批量修改');
            }
        },
        {
            keyname: 'b', 
            des: '批量修改测试b', 
            fn: function(){
                console.log('b批量修改');
            }
        },
    ];
    keyuse.modifyList(list);


----------
##key.show()
展示设置的快捷键名称和功能描述

----------
#快捷键名称
![快捷键名称](http://upload-images.jianshu.io/upload_images/8769876-fa76cbd63c4ac2c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
