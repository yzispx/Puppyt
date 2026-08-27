// console.log("Hello World!");

const parentDiv = document.querySelector('#WavyText');
function wavyText() {
    const children = parentDiv.children;
    // 3. Print the total count
    console.log(`Total direct tags: ${children.length}`);
    let count = 0;
    Array.from(children).forEach(child => {
        count++
        let childIndex = child.id
        child.style.animationDelay = `${count * 0.1}s`;

    });
}

wavyText();
// parentDiv.style.left = `${parseInt(window.innerWidth*0.75,10) * -1}px`;
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// console.log(window.innerWidth * -1)
// async function moveWavyText() {
    
//     while (true) {
//         parentDiv.style.left = window.innerWidth;
//         parentDiv.style.left = `${parentDiv.offsetLeft + 1}px`;

//         await sleep(10);
//     }
// }
// callmovewavy()

// async function callmovewavy(){
//     await sleep(100);
//     moveWavyText();
// }

// let c_winsize =
// {
//     x: window.innerWidth,
//     y: window.innerHeight
// };

// let p_winsize = {
//     x: window.innerWidth,
//     y: window.innerHeight
// };



// async function runInfiniteLoop(change) {
//     c_winsize.x = window.innerWidth;
//     c_winsize.y = window.innerHeight;
//     if (change) {
//         console.log("Window size changed!");
//         console.log(`Width: ${c_winsize.x}px, Height: ${c_winsize.y}px`);
//         p_winsize.x = c_winsize.x;
//         p_winsize.y = c_winsize.y;
//         await sleep(100)
//     } else {
//         await sleep(100)
//     }
// }
// runInfiniteLoop(true)

// async function checkWindowSizeChange() {
//     while (true) {
//         if (c_winsize.x !== p_winsize.x || c_winsize.y !== p_winsize.y) {
//             runInfiniteLoop(true)
//         } else {
//             runInfiniteLoop(false)
//         }
//         await sleep(100)
//     }
// }

// checkWindowSizeChange()

window.addEventListener("resize", () => {
    console.log("Window size changed!");
    console.log(`Width: ${window.innerWidth}px, Height: ${window.innerHeight}px`);
});