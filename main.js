
let button = document.getElementById("inputClick");
let userInput = document. getElementById("userInput");
let deleteBttn = document.getElementsByClassName(".deleteButton");
let checkboxBttn = document.getElementsByClassName("checkbox");

const counter = document.getElementById('counter');
const allBtn = document.getElementById('all-button');
const activeBtn= document.getElementById('active-button');
const completedBtn = document.getElementById('completed-button');
const clearAll = document.getElementById('clear-all');
const menuBtns =document.getElementsByClassName('menu-buttons');
const listItems = document.getElementById('list');

const countItem = () => {
  let itemCount = document.querySelectorAll('.checkbox').length
  let checkedCount = document.querySelectorAll('.checkbox:checked').length
  let uncheckedCount = itemCount - checkedCount;
  counter.textContent = uncheckedCount+ ' item left';
}


const startConf = () => {
  let itemsArray = JSON.parse(localStorage.getItem("items"));
  if (!itemsArray) {
    localStorage.setItem("items", JSON.stringify([]));
  } else {
    itemsArray.forEach(todo => {
      createNewItem(todo);
    });
  }
  countItem();
}

const addLocal = () => {
  
  inputText = userInput.value;
  
  const todo = {
    text : inputText,
    isCompleted: false,
  };
  
  let itemsArray = JSON.parse(localStorage.getItem('items'));
  itemsArray.push(todo);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  
  createNewItem(todo);
}


function checkItem(element){
  let find = JSON.parse(localStorage.getItem('items'));
  let found = element.parentElement.children[1].firstChild;
  for(let i=0;i<find.length;i++){
    if(find[i].text == found.data){
        find[i].isCompleted = !find[i].isCompleted;
        //  found.parentElement.classList.remove('completedTask');
        // find[i].isCompleted = !find[i].isCompleted;
      localStorage.setItem('items',JSON.stringify(find));
    }
  }
  // countFunc();
  // tek tek saydirmaya gerek yok. direkt azalt/arttir
  countItem();
}



function createNewItem(todo) {
  
  const newDiv = document.createElement("div");
  newDiv.classList.add("rowList");
  document.getElementById("list").appendChild(newDiv);
  
  const newCheckbox = document.createElement('input');
  newCheckbox.setAttribute("type", "checkbox"); 
  newCheckbox.classList.add('checkbox');
  document.getElementById('list').lastChild.appendChild(newCheckbox);
  newCheckbox.checked = todo.isCompleted;
  
  const newItem = document.createElement("div");
  newItem.setAttribute('class','textArea');
  const itemText = document.createTextNode(todo.text);
  newItem.appendChild(itemText);
  document.getElementById('list').lastChild.appendChild(newItem);
  userInput.value = "";
  
  const newButton = document.createElement("button");
  newButton.classList.add("deleteButton");
  newButton.textContent ="Delete";
  document.getElementById('list').lastChild.appendChild(newButton);
  // newButton.addEventListener('click', function(){
  //   removeTodo();
  // });
 
  if(todo.isCompleted){
    newItem.classList  += ' completedTask'; 
  };
}


startConf();


userInput.addEventListener('keypress',function(event){
  if (event.code == "Enter") {
    // ne kadar bosluk bulursa bulsun silmesi lazim String.trim()
    if(userInput.value !== ' ' || ''){
      addLocal();
      countItem();
    }
    else{ 
      alert('Bir deger giriniz');
    }
  }
})

// window.load'dan sonra direkt butona atama yapilmali
document.addEventListener('click', (e) => {
      let element = e.target;
      if(element.className == "deleteButton"){     
        let find = JSON.parse(localStorage.getItem('items'));
        let found = element.parentElement.children[1].firstChild.data;
        for(let i=0; i<find.length; i++){
          if(find[i].text == found){
            let todos = JSON.parse(localStorage.getItem('items'));          
            todos.splice(i,1);
            localStorage.setItem('items', JSON.stringify(todos));
            element.parentElement.remove();
            // tekrar saydirmaya gerek yok. count'u dusur direkt olarak.
            countItem();
          }
        }
      }
      
  });

document.addEventListener('click', function(e){
      let element = e.target;
      // birden fazla class'da bu calismaz
      if(element.classList == 'checkbox'){
        let Element = element.parentElement.children[1];
        if (this.activeElement.checked) {
          Element.className += ' completedTask';
         checkItem(element);
        } else {
          element.parentElement.children[1].classList.remove('completedTask');
          checkItem(element);
        }
        
      }
      // birden fazla class'da bu calismaz
      if(element.classList == 'toggleAll'){
        if(this.activeElement.checked) {
          for (let i = 0; i < checkboxBttn.length; i++) {
            let Element = checkboxBttn[i].parentElement.children[1];
            if(!checkboxBttn[i].checked){
              checkboxBttn[i].checked = true;
              Element.className +=' completedTask';
              checkItem(Element);
            }
          }}
        else{
          for (let i = 0; i < checkboxBttn.length; i++) {
            let Element = checkboxBttn[i].parentElement.children[1];
            if(checkboxBttn[i].checked){
              checkboxBttn[i].checked= false;
              Element.classList.remove('completedTask');
              checkItem(Element);
            }
            }
        }
         }
    });

    activeBtn.addEventListener('click',function(){
      let task = document.querySelectorAll('.textArea');
      for(let i=0;i<task.length;i++){
        if($(task[i]).hasClass('completedTask')){
          task[i].parentElement.style.display = "none";
        }if(!$(task[i]).hasClass('completedTask')){
          task[i].parentElement.style.display = "flex";
        }
      }
    })  
    completedBtn.addEventListener('click',function(){
      let task = document.querySelectorAll('.textArea');
      for(let i=0;i<task.length;i++){
        if(!$(task[i]).hasClass('completedTask')){
          task[i].parentElement.style.display = "none";
        }if($(task[i]).hasClass('completedTask')){
          task[i].parentElement.style.display = "flex";
        }
      }
    })  
    allBtn.addEventListener('click',function(){
      let task = document.querySelectorAll('.textArea');
      for(let i=0;i<task.length;i++){
          task[i].parentElement.style.display = "flex";
      }
    })  
    // tum kayitlari degil completed olanlari silmesi gerekiyor
    clearAll.addEventListener('click',function(){
      if (confirm('Tum kayitlari silmek istediginizden emin misiniz?')) {
        localStorage.clear();
        listItems.remove();
        location.reload();      
       } else {
        console.log('tum kayitlar silindi');
      }
    })
