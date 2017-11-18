;(function(undefined) {
    "use strict"
    var _global;

    var keyList = {
        'ctrl': 'ctrlKey',
        'shift': 'shiftKey',
        'alt': 'altKey',
        'meta': 'metaKey',
        'backspace': 8,
        'tab': 9,
        'enter': 13, 'return': 13,
        'pause': 19,
        'caps': 20, 'capslock': 20,
        'escape': 27, 'esc': 27,
        'space': 32,
        'pgup': 33, 'pageup': 33,
        'pgdown': 34, 'pagedown': 34,
        'end': 35,
        'home': 36,
        'ins': 45, 'insert': 45,
        'del': 46, 'delete': 46,

        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,


        ';': 186,
        '=': 187,
        ',': 188,
        '-': 189,
        '.': 190,
        '/': 191,
        '`': 192,
        '[': 219,
        '\\': 220,
        ']': 221,
        "'": 222
    };
    // 字母
    for (var i = 65; i < 91; i++) {
        keyList[String.fromCharCode(i).toLowerCase()] = i;
    }

    // 字母组合键盘上的数字键
    for (var i = 0; i < 10; i++) {
        keyList['' + i] = 48 + i;
    }
    // f功能键
    for (var i = 1; i < 13; i++) {
        keyList['f' + i] = 111 + i;
    }

    var featureList = [];

    // 添加快捷键
    var keyuse = function(keyname, des, fn) {
        if(itemIn(keyname)) {
            throw new Error(keyname + ' is repeat, please use the [keyuse.modify()]');
        }
        featureList.push({
            code: duename(keyname),
            keyname: keyname,
            des: des,
            fn: fn,
        });
        return featureList;
    }
    // 删除快捷键
    keyuse.remove = function (keyname) {
        var code = duename(keyname);
        var indexName = null;
        featureList.some(function(item, index) {
            if(qualArr(code, item.code)) {
                indexName = index;
                return true;
            }
        });
        if(indexName !== null) {
            featureList.splice(indexName, 1);
        }
        return featureList;
    }
    // 修改
    keyuse.modify = function(keyname, des, fn) {
        if(!itemIn(keyname)) {
            throw new Error(keyname + ' does not exist, please use the [keyuse()]');
        }
        keyuse.remove(keyname);
        keyuse(keyname, des, fn);
        return featureList;
    }
    // 批量添加
    keyuse.addList = function(arr) {
        if(!(arr instanceof Array)) {
            throw new Error('The input is not an array');
        }
        arr.forEach(function(item) {
            if(itemIn(item.keyname)) {
                throw new Error(item.keyname + ' is repeat, please use the [keyuse.modify()]');
            }
            featureList.push({
                code: duename(item.keyname),
                keyname: item.keyname,
                des: item.des,
                fn: item.fn,
            });
            return featureList;
        });
    }
    // 批量删除
    keyuse.removeList = function(arr) {
        if(!(arr instanceof Array)) {
            throw new Error('The input is not an array');
        }
        var indexArr = [];
        arr.forEach(function(arritem) {
            featureList.some(function(item, index) {
                if(qualArr(duename(arritem), item.code)) {
                    indexArr.push(index);
                    return true;
                }
            });
        });
        featureList = featureList.filter(function(item, index) {
            return  indexArr.indexOf(index) === -1;
        })
        return featureList;
    }
    // 批量修改
    keyuse.modifyList = function(arr) {
        if(!(arr instanceof Array)) {
            throw new Error('The input is not an array');
        }
        arr.forEach(function(arritem) {
            if(!itemIn(arritem.keyname)) {
                throw new Error(arritem.keyname + ' does not exist, please use the [keyuse()]');
            }
            featureList.some(function(item, index) {
                if(qualArr(duename(arritem.keyname), item.code)) {
                    keyuse.modify(arritem.keyname, arritem.des, arritem.fn);
                    return true;
                }
            });
        });
        return featureList;
    }
    // 展示快捷键描述
    keyuse.show = function () {
        // window.open();
        return featureList;
    }
    var eCtrl = ['altKey', 'ctrlKey', 'shiftKey', 'metaKey'];
    document.onkeydown = function(e) {
        var key = document.all ? e.keyCode : e.which;
        featureList.forEach(function(item) {
            if(e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                if(stringArr(item.code)) {
                    // console.log('one');
                    var arrObj = divideArr(item.code);//{[f], [alt, ctrl]}
                    var flag = false;
                    var num = 0;
                    // 只要注册的键中有没被摁下的，flag就会变成true，函数不执行
                    arrObj.strArr.forEach(function(item) {
                        if(!e[item]) {
                            flag = true;
                        }
                    });
                    eCtrl.forEach(function(item) {
                        if(e[item]) {
                            num ++;
                        }
                    });
                    // console.log(flag);
                    if(!flag && num === arrObj.strArr.length  && arrObj.numberArr[0] === key) {
                        item.fn();
                    }
                }
            } else {
                if(!stringArr(item.code) && key === item.code[0]) {
                    item.fn();
                }
            }
        })
    }

    // 处理输入的键名,变成对应数组形式的keyCode
    function duename(keyname) {
        if(!keyname) {
            throw new Error('The keyname is invalid');
        }
        var keyarr = keyname.split('+');
        var code = keyarr.map(function(item) {
            if (!keyList.hasOwnProperty(item.trim())) {
                throw new Error(item + ' is invalid');
            } else {
                return keyList[item.trim()];
            }
        });
        if(code.length > 1 &&　numNumber(code) > 1) {
            throw new Error(keyname + ' is invalid');
        }
        return code;
    }
    // 判断输入的快捷键是否在featureList中
    function itemIn(keyname) {
        var result = false;
        featureList.some(function(item) {
            if(qualArr(duename(keyname), item.code)) {
                result = true;
                return true;
            }
        });
        return result;
    }

    // 简单判断两个数组是否相等
    function qualArr(arr1, arr2) {
        return arr1.sort().toString() === arr2.sort().toString();
    }

    // 数组中的元素是否有字符
    function stringArr(arr) {
        var result = false;
        arr.forEach(function(item) {
            if(typeof(item) === 'string') {
                result = true;
            }
        });
        return result;
    }

    // 数组元素里的数字有几个
    function numNumber(arr) {
        var num = 0;
        arr.forEach(function(item) {
            if(typeof(item) === 'number') {
                num++;
            }
        });
        return num;
    }

    //将数组中的字符和数字剥离
    function divideArr(arr) {
        var arrObj = {};
        arrObj.strArr = arr.filter(function(item) {
            return typeof (item) === 'string';
        });
        arrObj.numberArr = arr.filter(function(item) {
            return typeof (item)  === 'number';
        });
        return arrObj;
    }


    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());

    if (typeof module !== "undefined" && module.exports) {
        module.exports = keyuse;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return keyuse;});
    } else {
        !('keyuse' in _global) && (_global.keyuse = keyuse);
    }
}());