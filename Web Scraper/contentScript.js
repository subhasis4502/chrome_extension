//Executing one command
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == "runCommands") {
    console.log("start commands");
    window.ScraperExt = [];
    var scrapeObj = msg.data;
    //console.log(scrapeObj);
    getNextItem(scrapeObj, 0); //Move to the next command
  }
});

function getNextItem(obj, index) {
  if (typeof obj[index] !== "undefined") {
    //Choosing the command
    if (obj[index].type == "click") {
      clickEvent(obj, index);
    }

    if (obj[index].type == "wait") {
      waitEvent(obj, index);
    }

    if (obj[index].type == "save") {
      saveEvent(obj, index);
    }

    if (obj[index].type == "enter") {
      enterEvent(obj, index);
    }
  } else {
    //When all command exection is completed
    console.log("run complete");
    chrome.runtime.sendMessage({
      command: "run-complete",
      data: window.ScraperExt,
    });
  }
}

//For wait command
function waitEvent(obj, index) {
  var item = obj[index];
  var waitTime = parseInt(item.one);
  setTimeout(function () {
    getNextItem(obj, index + 1);
  }, waitTime);
}

//For click command
function clickEvent(obj, index) {
  var item = obj[index];
  document.querySelector(item.one).click();
  getNextItem(obj, index + 1);
}

//For save command
function saveEvent(obj, index) {
  var item = obj[index];
  var value = document.querySelector(item.one).innerText;
  window.ScraperExt.push(value);
  getNextItem(obj, index + 1);
}

//For enter command
function enterEvent(obj, index) {
  var item = obj[index];
  var value = (document.querySelector(item.one).value = item.two);
  getNextItem(obj, index + 1);
}
