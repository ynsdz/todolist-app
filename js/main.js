
let button = document.getElementById("inputClick");
let userInput = document. getElementById("userInput");
let toggleAll = document.getElementById('toggleAll');
let checkboxBttn = document.getElementsByClassName('checkbox');


const counter = document.getElementById('counter');
const allBtn = document.getElementById('all-button');
const activeBtn= document.getElementById('active-button');
const completedBtn = document.getElementById('completed-button');
const clearAll = document.getElementById('clear-all');
const menuBtns =document.getElementsByClassName('menu-buttons');
const listItems = document.getElementsByClassName('rowList');

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
      localStorage.setItem('items',JSON.stringify(find));
    }
  }
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
 
  if(todo.isCompleted){
    newItem.classList  += ' completedTask'; 
  };
  // listItems = document.getElementsByClassName('rowList');
}


startConf();


userInput.addEventListener('keypress',function(event){
  if (event.code == "Enter") {
    // ne kadar bosluk bulursa bulsun silmesi lazim String.trim() √√√√
    if(userInput.value.trim().length){
      addLocal();
      countItem();
    }
    else{ 
      alert('Bir deger giriniz');
    }
  }
})
// window.load'dan sonra direkt butona atama yapilmali
Object.values(document.querySelectorAll('.deleteButton')).forEach(item => {
  item.addEventListener('click', e => {
      let element = e.target;
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
  })
})

  
    
    // tum kayitlari degil completed olanlari silmesi gerekiyor√√√
    clearAll.addEventListener('click',function(){
      if (confirm('Tum kayitlari silmek istediginizden emin misiniz?')) {
        let itemsArray = JSON.parse(localStorage.getItem('items'));
        for(let i =0; i<itemsArray.length;){
          if(itemsArray[i].isCompleted){
            document.querySelectorAll('.rowList')[i].remove();
            itemsArray.splice(i,1);
          } else {
            i++;
          }
        }
        localStorage.setItem('items', JSON.stringify(itemsArray));
       } else {
         console.log('islem iptal edildi');
      }
    })

    
