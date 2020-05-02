/*
1.
背景：
    每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；
    或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
注意：
    你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
要求：
    ①要求使用JS闭包的方式使得计数实现局部私有，不可以在全局区域声明计数变量。
    ②使用console.log打印计数即可，到达一分钟提前停止也需要console.log相应的提示语句。
*/


function timeTest() {
    let timeLimit = Math.floor((new Date()).getTime() / 60000) * 60000 + 60000;//根据现在的时间，获得下一个整分钟对应的毫秒数，作为时间的上限
    let counter = function () {
        var count = 0;
        return {
            getCount: function () {
                return count;
            },
            add: function () {
                count++;
            },
            clear: function () {
                count = 0;
            }
        }

    }()//count变量在闭包里
    let valueClosure = function () {
        var value = 1;
        return {
            valueDouble: function () {
                value *= 2;
            },
            getValue: function () {
                return value;
            }

        }
    }()//value变量在闭包里

    function foo() {
        if ((new Date().getTime()) <= timeLimit && counter.getCount() < 10) {//每次迭代前先判断，如果此时的秒数等于时间上限，且迭代次数不超过10，就迭代
            valueClosure.valueDouble();
            counter.add();
            console.log(valueClosure.getValue());
        } else if (counter.getCount() >= 10) {
            console.log("已经迭代了10次了");
            clearInterval(interval)
        } else if ((new Date().getTime()) > timeLimit) {
            console.log("超过整分钟了");
            clearInterval(interval)
        }
    }

    let interval = setInterval(foo, 5000);
}


/*
2.
要求：
    ①能够对传入的、移动手机电话（11位）、邮箱字符串（上网查找其要求）进行正则判定。
    ②使用console.log打印即可，例如，电话不符合要求但是邮箱符合要求，则console.log("The telephone is right and the mail is wrong!")。
    ③邮箱字符串的正则匹配的理解需写入lab文档。
    ④telephone与mail均是字符串。
*/

// @([a-zA-Z]+.)+([a-z][A-Z]){2,4
function testMail(telephone, mail) {
    let cellphonePattern = /^(1)[\d]{10}$/;
    let mailPattern = /^[0-9a-zA-Z][0-9a-zA-Z\-.]+@([a-zA-Z0-9]+\.)+[a-z]{2,4}$/;  //匹配邮箱 如miaomiaomiao@abc.def.com
    let telephoneOK = cellphonePattern.test(telephone);
    let mailOK = mailPattern.test(mail);
    if (telephoneOK && mailOK) {
        console.log("手机号码和邮箱都符合要求")
    } else if (!telephoneOK && mailOK) {
        console.log("手机号码不符合要求，邮箱符合要求")
    } else if (telephoneOK && !mailOK) {
        console.log("手机号码符合要求，邮箱不符合要求")
    } else if (!telephoneOK && !mailOK) {
        console.log("手机号码和邮箱都不符合要求")
    }
}


/*
3.
要求：
    ①输入一段全英文语句，要求使用正则表达式找到相邻的重复单词放入一个Set，如果集合中元素超过10个，则按照首字母顺序取前10个于集合。
    ②使用console.log打印即可，将该集合打印出来。
    ③例如：输入"Is is the iS is cost of of gasoline going up up"，输出：Set { 'Is is', 'iS is', 'of of', 'up up' }。
    ④对该函数中用的正则匹配的理解需写入lab文档。
    ⑤str为字符串。
*/
function testRedundancy(str) {
    let pattern = /\b([a-zA-Z]+)( \b\1\b)+/gi;
    let array = str.match(pattern);
    array.sort(function (a, b) {
        if (a.toLowerCase() <= b.toLowerCase()) {
            return -1;
        } else {
            return 1
        }
    })
    if (array.length > 10) {
        array.length = 10;
    }
    let set = new Set(array);
    console.log(set);


}


/*
4.
背景：
    旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。
    现在给出应该输入的一段文字、以及实际被输入的文字，请你使用Set列出肯定坏掉的那些键。
    例如：输入7_This_is_a_test和_hs_s_a_es    输出：Set { '7', 'T', 'I' }
要求：
    ①需要使用Set。
    ②只能使用一次循环。
    ③使用console.log打印即可，将该集合打印出来。
    ④wantInput和actualInput为字符串。
注意：
    ①注意联系生活，并注意观察我给的上述例子。
*/
function testKeyBoard(wantInput, actualInput) {
    let wantArray = wantInput.toUpperCase().split("");
    let actualArray = actualInput.toUpperCase().split("");
    let wantSet = new Set(wantArray);
    let actualSet = new Set(actualArray);
    let keysNotWork = new Set();
    wantSet.forEach(function (name, value) {
        if (wantSet.has(name) && !actualSet.has(name)) {
            keysNotWork.add(name);
        }
    })
    console.log(keysNotWork);

}


/*
5.
背景：
    给定一个输入英文语句字符串，反转该语句。例如the sky is blue变成blue is sky the。
要求：
    ①如果输入的字符串前后有空格，输出中应该去除前后空格。如果输入字符串中间出现连续的两个空格，输出应该变为一个。
    比如输入是“  hello  world!  ”，输出应该是“world! hello”。
    ②请使用Array。
    ③使用console.log打印即可，将该数组打印出来。
    ④只能显式使用一次循环。
    ⑤str为字符串。
*/
function testSpecialReverse(str) {
    let array = str.split(" ");
    array.reverse();
    let newArray = Array();
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i] !== '') {
            newArray[newArray.length] = array[i];
        }
    }
    console.log(newArray.join(" "))
}


/*
6.
背景：
    给定一个整数数组和一个值，找出相加为该值的两个元素下标并保存在一个数组中。
    例如给定 [2, 7, 11, 15]和9,
    打印结果为[0,1]
要求：
    ①使用Map。
    ②只能显式使用一次循环。
    ③使用console.log打印即可，将满足条件的数组打印出来。
    ④nums为数字数组，如[1,2,3,4],target为数字,如5，那么输出为
    [ 0, 3 ]
    [ 1, 2 ]
*/

function twoSum(nums, target) {
    //nums：整数数组
    //target:目标数
    let map = new Map();
    let result = [];
    for (let i = 0; i <= nums.length - 1; i++) {
        let anotherOperand = target - nums[i];
        if (map.has(anotherOperand)) {
            result[result.length] = [i, map.get(anotherOperand)].reverse();
        }
        map.set(nums[i], i);
    }
    console.log(result.toString());
}


/*
7.
背景：
    打印最长的包含不同字符串的子字符串长度。
要求：
    ①使用Map。
    ②例如：输入"abbbbb",输出1，输入"bbbbb",输出2；
    ③只能显式使用一次循环。
    ④使用console.log打印即可。
    ⑤str为字符串。
*/
function lengthOfLongestSubstring(str) {
    let map = new Map(); //map是单个char到其在字符串中索引的映射
    let maxLength = 0;
    let start = 0;//起始位置的指针
    for (let destination = 0; destination <= str.length - 1; destination++) {//开始对终点位置的指针进行遍历
        if (map.has(str.charAt(destination))) {//判断map中是否有dest指针对应的字符
            if (map.get(str.charAt(destination)) + 1 >= start) {//判断这个字符是否是“有效”的重复字符。即：这个字符的索引位置是不是在start的右边
                start = map.get(str.charAt(destination)) + 1;//如果是，说明最长的不重复子串已经找到，更新起始指针的位置到重复元素的位置+1（否则最长的子串一定短
            }

        }
        map.set(str.charAt(destination), destination);//将单个char->索引的映射存储在map里
        maxLength = (destination - start + 1) > maxLength ? destination - start + 1 : maxLength;//如果此时的子串长度大于之前的最大值，就更新最大值

    }
    console.log(maxLength);


}

/*
8.
背景：
    该部分只是为了让你们自己动动手更好地感受不同继承方式。
要求：
    ①借助构造函数、原型链、和Object.create分别编写DevelopingCountry、PoorCountry、DevelopedCountry以实现对Country的继承，
    并在三者分别添加sayHi、saySad、sayHappy函数分别打印"Hi,i am a developing country."、"I am a sad poor country."、"I am a Happy developed country."
    ②请调用他们并打印相关语句即可。
*/
function Country() {
    this.name = "国家";
}

//借用构造函数

function inheritanceBorrowConstructor() {
    function DevelopingCountry(name) {
        Country.call(this, name);
        if (typeof DevelopingCountry.prototype.sayHi !== "function") {
            DevelopingCountry.prototype.sayHi = function () {
                console.log("Hi,I'm a developing country");
            }
        }
    }

    function PoorCountry(name) {
        Country.call(this, name);
        if (typeof PoorCountry.prototype.saySad !== "function") {
            PoorCountry.prototype.saySad = function () {
                console.log("I am a sad poor country");
            }
        }
    }

    function DevelopedCountry(name) {
        Country.call(this, name);
        if (typeof DevelopedCountry.prototype.sayHappy !== "function") {
            DevelopedCountry.prototype.sayHappy = function () {
                console.log("I am a happy developed country");
            }

        }
    }

    let developingCountry = new DevelopingCountry();
    let poorCountry = new PoorCountry();
    let developedCountry = new DevelopedCountry();
    developedCountry.sayHappy()
    developingCountry.sayHi();
    poorCountry.saySad();

}


function inheritancePrototypeChain() {
    function DevelopingCountry() {
    }

    DevelopingCountry.prototype = new Country();
    DevelopingCountry.prototype.sayHi = function () {
        console.log("Hi,I'm a developing country")
    }

    function PoorCountry() {
    }

    PoorCountry.prototype = new Country();
    PoorCountry.prototype.saySad = function () {
        console.log("I am a sad poor country")
    }

    function DevelopedCountry() {
    }

    DevelopedCountry.prototype = new Country();
    DevelopedCountry.prototype.sayHappy = function () {
        console.log("I am a happy developed country");
    }

    let developingCountry = new DevelopingCountry();
    let poorCountry = new PoorCountry();
    let developedCountry = new DevelopedCountry();
    developedCountry.sayHappy()
    developingCountry.sayHi();
    poorCountry.saySad();
}

function inheritanceObjectCreate() {
    let developedCountry = Object.create(new Country());
    developedCountry.sayHappy = function () {
        console.log("I am a happy developed country");
    }
    let developingCountry = Object.create(new Country());
    developingCountry.sayHi = function () {
        console.log("Hi,I'm a developing country")
    }
    let poorCountry = Object.create(new Country());
    poorCountry.saySad = function () {
        console.log("I am a sad poor country")
    }

    developingCountry.sayHi();
    developedCountry.sayHappy();
    poorCountry.saySad();
}


let test = (function () {
    timeTest();
    testMail(13764402740, "zhanghaojie12345@gmail.com")
    testRedundancy("Is is the iS is cost of of gasoline going up up");
    testKeyBoard("7_This_is_a_test", "_hs_s_a_es");
    testSpecialReverse("  hello  world!  ")
    twoSum([1,2,3,4],5);
    lengthOfLongestSubstring("shanghai");
    inheritancePrototypeChain();
    inheritanceBorrowConstructor();
    inheritanceObjectCreate();

})()




