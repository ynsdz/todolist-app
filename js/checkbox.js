Object.values(checkboxBttn).forEach((item) =>{
    item.addEventListener('click', e=>{
      let element = e.target;
      let Element = element.parentElement.children[1];
      if (element.checked) {
        Element.className += ' completedTask';
        checkItem(element);
      } else {
        element.parentElement.children[1].classList.remove('completedTask');
        checkItem(element);
      }
    })
  })

toggleAll.addEventListener('click', e =>{
  if(toggleAll.checked) {
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
})