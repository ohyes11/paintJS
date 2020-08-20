const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

/* Canvas  function */
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

/* Change Color function */
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

/* Change Brush Width function */
function handleRangeChange(evnet) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

/* Change Mode function */
function handleMode(evnet) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling === true) {
        ctx.fillRect(0, 0, 700, 700);
    }
}

/* Image Save function */
function handleCM(event) {
    evnet.preventDefault();
}

function handleSave() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

/* function end */
/* Canvas */
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

/* Change Color */
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

/* Change Brush Width */
if(range) {
    range.addEventListener("input", handleRangeChange);
}

/* Change Mode */
if(mode) {
    mode.addEventListener("click", handleMode);
}

/* Image Save */
if(save) {
    save.addEventListener("click", handleSave);
}
