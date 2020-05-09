const works = [
    {
        author: "Micheal Jackson",
        lifetime: "1022-1055",
        tips: "Human",
        photos: ["human1.jpg", "human2.jpg", "human3.jpg"]
    },
    {author: "Maria JK", lifetime: "1920-2001", tips: "Classical", photos: ["classical1.jpg", "classical2.jpg"]},
    {
        author: "John Herry UY",
        lifetime: "1894-1928",
        tips: "Abstract",
        photos: ["abstract1.jpg", "abstract2.jpg", "abstract3.jpg", "abstract4.jpg", "abstract5.jpg"]
    },
    {author: "Coco", lifetime: "1777-1799", tips: "Beauty", photos: ["beauty1.jpg", "beauty2.jpg"]}
];
let flex_container = document.getElementsByClassName("flex-container");
for (let i = 0; i <= works.length - 1; i++) {
    flex_container[0].append(createItem(works[i]))
}


function createItem(work) {
    let item = document.createElement("div");
    item.classList.add("item");

    let h4 = document.createElement("h4");
    h4.innerHTML = "Genre:" + work.tips;


    let innerBox1 = createInnerBox1(work);

    let innerBox2 = createInnerBox2(work);

    let button = document.createElement("button");
    button.innerHTML = "Visit";

    item.append(h4, innerBox1, innerBox2, button);

    return item;


    function createInnerBox1(work) {
        let h3 = document.createElement("h3");
        h3.style.display = "inline";
        h3.innerHTML = work.author;

        let h4 = document.createElement("h4");
        h4.style.display = "inline";
        h4.innerHTML = "&nbsp;&nbsp;lifetime:" + work.lifetime;

        let innerBox1 = document.createElement("div");
        innerBox1.classList.add("inner-box");
        innerBox1.append(h3, h4);

        return innerBox1;
    }

    function createInnerBox2(work) {
        let h3 = document.createElement("h3");
        h3.innerHTML = "Popular Photos";

        let imageArray = [];

        for (let i = 0; i <= work.photos.length - 1; i++) {
            let img = document.createElement("img");
            img.classList.add("photo");
            img.src = work.photos[i];
            imageArray[imageArray.length] = img;
        }

        let innerBox2 = document.createElement("div");
        innerBox2.classList.add("inner-box");
        innerBox2.append(h3, ...imageArray);
        return innerBox2;
    }
}
