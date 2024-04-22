//   SELECT ITEMS
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// const deleteBtn = document.querySelector(".delete-btn");
//edit option

let editElement;
let editFlag = false;
let editID = "";

//EVENT LISTENERS
//submit form
form.addEventListener("submit", addItem);
//FUNCTIONS
clearBtn.addEventListener("click", clearItems);
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  //console.log(id)
  if (value && !editFlag) {
    const element = document.createElement("article");
    //console.log(element)

    element.classList.add("grocery-item");

    const attr = document.createAttribute("data-id");
    attr.value = id;
    // console.log(attr);
    element.setAttributeNode(attr);

    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    //append child
    list.prepend(element);
    //display alert
    displayAlert("item added to the list", "success");
    container.classList.add("show-container");
    //add To Local storage

    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  } else if (value && editFlag) {
   editElement.innerHTML=value;
    displayAlert('value changed','success') 
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
//clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
}
//delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  list.removeChild(element);
  displayAlert("item removed", "danger");
  if (list.children.length === 0) {
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
  }
  setBackToDefault();
}
//edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit  item 
  editElement=e.currentTarget.parentElement.previousElementSibling; 
  grocery.value=editElement.innerHTML; 
  editFlag=true;
  editID=element.dataset.id;
  submitBtn.textContent="edit"
}

//set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
//********LOCAL STORAGE**********
// function addToLocalStorage(id, value) {
//   console.log("added to local storage");
// } 

// function removeFromLocalStorage(id){

// } 
// localStorage.setItem("orange",JSON.stringify(["item","item2"]));

// const oranges=JSON.parse(localStorage.getItem("orange"));

// console.log(oranges) 
// localStorage.removeItem("orange")
 













// let key=prompt("Enter key you want to set")
// let value=prompt("Enter value you want to set") 

// localStorage.setItem(key,value) 

// if(key==="red" || key==="blue"){
//   localStorage.removeItem(key)
// } 
// if(key==0){
//   localStorage.clear()
// }
// localStorage.getItem(key)
