//The input, buttons are appeared when create-todo button clicked
document.querySelector(".create-todo").addEventListener("click", function () {
  //Clicking the create-todo class
  document.querySelector(".new-item").style.display = "block"; //Appearing the input section
});

//Adding the new task when 'add' button is pressed
document
  .querySelector(".new-item .add")
  .addEventListener("click", function () {
    var itemName = document.querySelector(".new-item input").value; //Taking the new task
    if (itemName != "") {
      var itemsStorage = localStorage.getItem("todo-items"); //Fetching the previous tasks
      var itemsArr = JSON.parse(itemsStorage);
      itemsArr.push({ item: itemName, status: 0 }); //Adding the new task
      saveItems(itemsArr); //Save to local storage
      fetchItems(); //Fetching and data from local storage
      //Hiding the input section
      document.querySelector(".new-item input").value = "";
      document.querySelector(".new-item").style.display = "none";
    }
  });

//Disapear the block when 'cancel' button is clicked
document
  .querySelector(".new-item .cancel")
  .addEventListener("click", function () {
    document.querySelector(".new-item").style.display = "none";
  });

//Print the items stored inside our local storage
function fetchItems() {
  //Initialising the variables
  const itemsList = document.querySelector("ul.todo-items");
  itemsList.innerHTML = "";
  var newItemHTML = "";
  try {
    //Fetching the contents from local storage
    var itemsStorage = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(itemsStorage);

    //Displaying them
    for (var i = 0; i < itemsArr.length; i++) {
      var status = "";
      if (itemsArr[i].status == 1) {
        status = 'class="done"';
      }
      newItemHTML += `
        <li data-itemindex="${i}" ${status}>
          <span class="itemComplete">✅</span>
          <span class="item">${itemsArr[i].item}</span>
          <span class="itemDelete">🗑️</span>
        </li>`;
    }

    //Converting to html
    itemsList.innerHTML = newItemHTML;

    //Whenever ✅ or 🗑️ clicked
    var itemsListUL = document.querySelectorAll("ul li");
    for (var i = 0; i < itemsListUL.length; i++) {
      //For ✅???????????????????????????????????????????????????????????????????????????
      itemsListUL[i]
        .querySelector(".itemComplete") //Selecting the class
        .addEventListener("click", function () { //The type of event we want to listen
          var index = this.parentNode.dataset.itemindex; //parentNode = because we need itemindex which is the the parent of itemComplete
          //console.log(index);
          itemComplete(index);
        });
      //For 🗑️
      itemsListUL[i]
        .querySelector(".itemDelete")
        .addEventListener("click", function () {
          var index = this.parentNode.dataset.itemindex;
          itemDelete(index);
        });
    }
  } catch (e) {}
}

//Update the status of that item when ✅ is pressed
function itemComplete(index) {
  var itemsStorage = localStorage.getItem("todo-items");
  var itemsArr = JSON.parse(itemsStorage); //JSON to object

  itemsArr[index].status = 1; //Changing
  saveItems(itemsArr); //Saving

  document.querySelector(
    'ul.todo-items li[data-itemindex="' + index + '"]'
  ).className = "done";
}

//Delete the task when 🗑️ is pressed
function itemDelete(index) {
  var itemsStorage = localStorage.getItem("todo-items");
  var itemsArr = JSON.parse(itemsStorage);

  itemsArr.splice(index, 1); //Splice deletes the indexes
  saveItems(itemsArr);

  document
    .querySelector('ul.todo-items li[data-itemindex="' + index + '"]')
    .remove(); //Removing the child node
}

//Saving the changes to our local storage
function saveItems(obj) {
  var string = JSON.stringify(obj);
  localStorage.setItem("todo-items", string);
}

fetchItems();
