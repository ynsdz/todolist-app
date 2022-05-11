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
