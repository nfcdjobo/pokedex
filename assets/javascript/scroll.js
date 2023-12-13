const content = document.querySelector(".content");
content.addEventListener("scroll", scroller);
function scroller(event){
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollHeight)
}