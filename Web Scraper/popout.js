//A popup appears when all commands are executed
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == "run-complete") {
    document.querySelector("textarea").value = JSON.stringify(msg.data);
    document.querySelector("textarea").style.display = "block";
    alert("All commands are executed");
  }
});

//Creating an object based upon our given input
function createCommandObject() {
  var commandsArr = [];

  var commands = document.querySelectorAll(".commands-list .command-item");
  //Pushing the input commands to commandsArr
  for (var i = 0; i < commands.length; i++) {
    var itemObj = {};
    itemObj.type = commands[i].querySelector("select").value;
    itemObj.one = commands[i].querySelector(".value-1").value;
    itemObj.two = commands[i].querySelector(".value-2").value;
    commandsArr.push(itemObj);
  }

  console.log(commandsArr);

  //Executing the command Object
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0]; //Selecting the tab where to execute
    var obj = commandsArr;
    //console.log(activeTab, obj);
    chrome.tabs.sendMessage(activeTab.id, {
      //chrome.tabs: API to interact with the browser's tab
      command: "runCommands",
      data: obj,
    });
  });
}

//Whenever we push the run button
document.querySelector(".run-command").addEventListener("click", function () {
  createCommandObject();
});

//Whenever we press 'Add command' it will generate the respective input fields
document.querySelector(".new-command").addEventListener("click", function () {
  var newItem = `
    <div class="command-item">
      <select>
        <option value="wait">Wait</option>
        <option value="click">Click</option>
        <option value="enter">Enter Value</option>
        <option value="save">Save Value</option>
      </select>
      <input class="value-1" placeholder="200ms"/>
      <input class="value-2" placeholder="Optional"/>
    </div>`;
  document.querySelector(".commands-list").innerHTML += newItem;
});
