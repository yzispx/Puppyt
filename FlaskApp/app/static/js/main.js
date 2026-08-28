// console.log("Hello World!");
// DOM CONSTANTS

const downloadBtn = document.getElementById("download-btn");
const mediaUrlInput = document.getElementById("media-url-input");
const wavyTextParentDiv = document.querySelector('#WavyText');
const pasteBtn = document.getElementById("pasteBtn");
const audBtn = document.getElementById("audBtn");
const vidBtn = document.getElementById("vidBtn");
const vidRadios = document.querySelectorAll('#swOptVid input[type="radio"]');
const audRadios = document.querySelectorAll('#swOptAud input[type="radio"]');

let alreadyHasClipboard = false
let pastClipboard = ""
let currentClipboard = ""

function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes('firefox') || ua.includes('fxios')) {
    return 'Firefox';
  }

  if ((ua.includes('chrome') || ua.includes('crios')) && !ua.includes('edg') && !ua.includes('opr')) {
    return 'Chrome';
  }

  return 'Other Browser';
}

async function clipboardContent() {
  const response = await fetch("/clipboard");
  const text = await response.text();
  if (text.trim() === "") {
    return
  }
  alreadyHasClipboard = true;
  return text;
}

async function main() {
  currentClipboard = await clipboardContent();
  console.log("Clipboard Content:", currentClipboard);
  if (linkCheck(currentClipboard)) {
    await newClipboardCheck()

    pasteAsk(currentClipboard)
  }
}

main()

function wavyText() {
  const children = wavyTextParentDiv.children;
  // 3. Print the total count
  console.log(`Total direct tags: ${children.length}`);
  let count = 0;
  Array.from(children).forEach(child => {
    count++
    let childIndex = child.id
    child.style.animationDelay = `${count * 0.1}s`;

  });
}

mediaUrlInput.addEventListener('input', () => {
  if (linkCheck(mediaUrlInput.value)) {
    downloadBtn.disabled = false;
  } else {
    downloadBtn.disabled = true;
  }
});

async function newClipboardCheck() {
  currentClipboard = await clipboardContent();
  console.log(
    "Clipboards:",
    "\nPast:", pastClipboard,
    "\nCurrent:", currentClipboard
  );
  if (
    linkCheck(currentClipboard) &&
    pastClipboard !== currentClipboard
  ) {
    mediaUrlInput.placeholder = currentClipboard
    for (let i = 0; i < 20; i++) {
      await new Promise(requestAnimationFrame)
    }
    pasteAsk(currentClipboard)
  } else {
    mediaUrlInput.placeholder = "Insert a valid media URL here."
  }
  pastClipboard = currentClipboard;
}

document.addEventListener("visibilitychange", async () => {
  if (!alreadyHasClipboard) {
    return;
  }
  if (document.visibilityState === "visible") {
    console.log("Tab is active / focused");
    newClipboardCheck()
  } else {
    console.log("Tab is hidden / backgrounded");
  }
});

function linkCheck(text) {
  try {
    if ((text.trim() !== "") && (text.trim().startsWith("https://") || text.trim().startsWith("http://") || text.trim().startsWith("www."))) {
      console.log("Linkcheck ", true);
      return true
    } else {
      console.log("Linkcheck ", false);
      return false
    }
  } catch (err) {
    console.log("Failed to linkCheck!")
  }
}

async function pasteAsk(text) {
  // let confirm_v = confirm(
  //   "We found a thingabob in your clipboard. Do you wanna paste that?"
  // );

  // if (confirm_v) {
    mediaUrlInput.focus();
    mediaUrlInput.value = text;
    downloadBtn.disabled = !linkCheck(text);
  // }
}

pasteBtn.addEventListener("click", pasteClipboard);
downloadBtn.addEventListener("click",() => {
  window.showDirectoryPicker()
})

let leavePlaceholder = mediaUrlInput.placeholder

pasteBtn.addEventListener("mouseenter", () => {
  leavePlaceholder = mediaUrlInput.placeholder
  mediaUrlInput.placeholder = currentClipboard
})

pasteBtn.addEventListener("mouseleave", () => {
  mediaUrlInput.placeholder = leavePlaceholder
})

async function pasteClipboard() {
  try {
    let text;

    if (detectBrowser() === "Firefox") {
      console.log("Browser is Firefox, using alternative method...");
      text = await clipboardContent();
    } else {
      text = await navigator.clipboard.readText();
    }

    mediaUrlInput.focus();
    mediaUrlInput.value = text;

    console.log("Pasted content:", text);

    // Check the newly pasted URL
    downloadBtn.disabled = !linkCheck(text);

  } catch (err) {
    console.error("Failed to read clipboard contents:", err);
  }
}

wavyText()

// Format Selection (video or audio)

let currentFormat = "video";

function changeCurrentFormat() {
  if (currentFormat === "video") {
    // Video selected
    vidBtn.disabled = true;
    audBtn.disabled = false;

    vidBtn.classList.remove("switchOFF");
    vidBtn.classList.add("switchON");

    audBtn.classList.remove("switchON");
    audBtn.classList.add("switchOFF");
  } else {
    // Audio selected
    vidBtn.disabled = false;
    audBtn.disabled = true;

    vidBtn.classList.remove("switchON");
    vidBtn.classList.add("switchOFF");

    audBtn.classList.remove("switchOFF");
    audBtn.classList.add("switchON");
  }
  FormatRadios()
}

audBtn.addEventListener("click", () => {
  console.log("Clicked on audio!");

  currentFormat = "audio";
  changeCurrentFormat();
});

vidBtn.addEventListener("click", () => {
  console.log("Clicked on video!");

  currentFormat = "video";
  changeCurrentFormat();
});

// Set initial state
changeCurrentFormat();

function FormatRadios() {
  if (currentFormat === "audio") {
    audRadios.forEach(radio => {
      radio.classList.remove("fadedRadio");
      radio.parentElement.classList.remove("fadedLabel");
      radio.disabled = false;
    });
    
    vidRadios.forEach(radio => {
      radio.classList.add("fadedRadio");
      radio.parentElement.classList.add("fadedLabel");
      radio.disabled = true;
    });
  } else {
    audRadios.forEach(radio => {
      radio.classList.add("fadedRadio");
      radio.parentElement.classList.add("fadedLabel");
      radio.disabled = true;
    });

    vidRadios.forEach(radio => {
      radio.classList.remove("fadedRadio");
      radio.parentElement.classList.remove("fadedLabel");
      radio.disabled = false;
    });
  }
}

// window.addEventListener("resize", () => {
//     console.log("Window size changed!");
//     console.log(`Width: ${window.innerWidth}px, Height: ${window.innerHeight}px`);
// });