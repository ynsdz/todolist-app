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
  
      