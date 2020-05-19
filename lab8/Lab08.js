/*请在该区域内声明或者获取所要使用的全局变量*/
/********************************************begin************************************/

/*Global Variable Area */
let imagePathArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let carouselContainer = document.getElementsByClassName("container")[0];
let table = document.getElementsByTagName("table")[0];


class Carousel {
    constructor(carouselContainer, imgPathArray) {//传入轮播的dom元素和图片路径数组
        this.carouselContainer = carouselContainer;
        this.imgPathArray = imgPathArray;
        this.currentLoacation = 0;//现在是第几张图片
        this.carouselWrap = this.carouselContainer.getElementsByClassName("wrap")[0];//图片区域的wrapper
        this.carouselButtonGroup = this.carouselContainer.getElementsByClassName("buttons")[0];//按钮区域的wrapper
        this.buttons = this.carouselButtonGroup.getElementsByTagName("span");//按钮组
        this.arrowLeft = this.carouselContainer.getElementsByClassName("arrow_left")[0];//左箭头
        this.arrowRight = this.carouselContainer.getElementsByClassName("arrow_right")[0];//右箭头
        this.playstarted = true;//是否已经开始播放
        this.clearAllNodesInWrapper();
        this.clearAllNodesInButtonGroup();
        this.createButtons();
        this.carouselWrap.style.left = "0px";
        this.showPicture();

    }

    clearAllNodesInWrapper() {//清除图片wrapper里所有节点
        while (this.carouselWrap.firstChild) {
            this.carouselWrap.removeChild(this.carouselWrap.firstChild);
        }
    }

    clearAllNodesInButtonGroup() {//清除buttonWrapper里所有节点
        while (this.carouselButtonGroup.firstChild) {
            this.carouselButtonGroup.removeChild(this.carouselButtonGroup.firstChild);
        }
    }

    createButtons() {//根据传入图片数量自动创建切换图片的按钮
        for (let i = 1; i <= this.imgPathArray.length; i++) {
            let span = document.createElement("span");
            span.innerHTML = i;
            this.carouselButtonGroup.appendChild(span);
        }
    }

    setButtonHighlight() {//设置当前图片按钮高亮
        for (let i = 0; i <= this.buttons.length - 1; i++) {
            this.buttons[i].classList.remove("on");
            if (i === this.currentLoacation) {
                this.buttons[i].classList.add("on");
            }
        }

    }

    showPicture() {//展示当前位置的图片
        this.clearAllNodesInWrapper();
        let imageNode = document.createElement("img");
        imageNode.src = this.imgPathArray[this.currentLoacation];
        this.carouselWrap.appendChild(imageNode);
        this.setButtonHighlight()
    }

    getNextLocation() {
        let numOfImages = this.imgPathArray.length;
        return (this.currentLoacation + 1 > numOfImages - 1) ? 0 : this.currentLoacation + 1;
    }

    getPreviousLocation() {
        let numOfImages = this.imgPathArray.length;
        return (this.currentLoacation - 1 < 0) ? (numOfImages - 1) : this.currentLoacation - 1;
    }


    nextPicture() {//切换下一张图片
        this.currentLoacation = this.getNextLocation();
        this.showPicture();

    }

    previousPicture() {//切换上一张图片
        this.currentLoacation = this.getPreviousLocation();
        this.showPicture();
    }

    setCurrentLocation(newLocation) {//设置当前图片的位置
        this.currentLoacation = newLocation;
    }

    addListenerToArrows() {//为左右箭头添加监听器
        const caller = this;
        this.arrowLeft.onclick = function () {
            ((caller) => {
                caller.previousPicture()
            })(caller)
        }
        this.arrowRight.onclick = function () {
            ((caller) => {
                caller.nextPicture()
            })(caller)
        }

    }

    setAutoPlay() {//设置自动播放
        let caller = this;

        this.interValId = setInterval(function () {
            caller.nextPicture();
        }, 2000)//一开始时自动播放

        this.carouselWrap.onmouseout = function () {//鼠标移出时开始自动播放
            ((caller) => {
                if (caller.playstarted === false) {
                    caller.interValId = setInterval(function () {
                        caller.nextPicture();
                    }, 2000);
                    caller.playstarted = true;
                }
            })(caller)
        }
        this.carouselWrap.onmouseover = function () {//鼠标移入时停止自动播放
            ((caller) => {
                if (caller.playstarted === true) {
                    clearInterval(caller.interValId);
                    caller.playstarted = false;
                }
            })(caller)
        }

    }

    addListenerToButtons() {//为切换图片的按钮添加监听
        let caller = this;
        for (let i = 0; i <= this.buttons.length - 1; i++) {
            ((num, caller) => {
                caller.buttons[num].onclick = function () {
                    caller.goto(num);

                }
            })(i, caller)

        }


    }

    goto(newLocation) {//切换到某个位置的图片
        this.setCurrentLocation(newLocation);
        this.showPicture();
    }


}

class EditableTable {
    constructor(tableElement) {
        this.tableElement = tableElement;
        this.tdElements = this.getAllTDElements();
    }

    getAllTDElements() {
        return this.tableElement.getElementsByTagName("td");

    }

    addListenerToTDS() {
        for (let i = 0; i <= this.tdElements.length - 1; i++) {
            this.tdElements[i].onclick = function (e) {
                let target = e.target;
                if (target.childNodes[0].nodeType !== 1) {
                    let input = document.createElement("input");
                    input.value = target.innerHTML;
                    target.innerHTML = "";
                    target.appendChild(input);
                    input.focus();
                    input.setSelectionRange(0, 0);
                    input.onblur = function () {
                        target.innerHTML = input.value;

                    }
                }

            }
        }

    }


}


/*********************************************end*************************************/


/* 任务一
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击左箭头prev和右箭头next的时候，可以切换到前一张图片和下一张图片。（左右箭头为html中的a标签）
 * ②每切换一张图片，右下角的数字标记对应变化。
 *      如：一开始，第1张图片显示出来，右下角的1-5的数值中，数值1位红色，2-4为绿色，表示当前显示第1张图片。
 *      点击next箭头，图片切换到第2张，同时，右下角红色数值从1切换为2，数值1,3,4,5为绿色。
 * ③当当前图片为第1张时，点击prev箭头，切换到第5张图片，且数值5置为红色。
 * 当当前图片为第5张时，点击next箭头，切换到第1张图片，且数值1置为红色。
 * ④切换图片的过程不要求，可直接切换，也可动画切换，但要求保证一定的切换动画合理性，不能出去明显的衔接不当。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
let carousel = new Carousel(carouselContainer, imagePathArray);
carousel.addListenerToArrows();

/*********************************************end*************************************/


/* 任务二
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①轮播可以自动播放，切换图片间隔为2s，每一次切换的效果与点击next箭头的效果一致。
 * ②当鼠标移入轮播区域内时，停止自动播放。
 * ③当鼠标不在轮播区域内时，开始自动播放。
 * ④页面刚加载完成时，如果鼠标不在轮播区域内，自动开始自动播放；否则，等待直到鼠标移出轮播区域，再进行自动播放。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
carousel.setAutoPlay();


/*********************************************end*************************************/


/* 任务三
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击右下角的任意一个数值，能够切换到对应图片，且相应数值变为红色。
 * ②进行①操作过后，是否自动播放，其规则与上一个任务一致。
 * ③本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
carousel.addListenerToButtons();

/*********************************************end*************************************/


/*任务四
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击某一非表头的单元格，可以编辑其内容，编辑完毕后点击其他部位，可以在界面上显示修改后的内容。
 * ②点击单元格后，光标自动定位于单元格的首个字符或者汉字前。
 * ③本部分可以使用jQuery，也可以使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/

let editableTable = new EditableTable(table)
editableTable.addListenerToTDS();


/*********************************************end*************************************/