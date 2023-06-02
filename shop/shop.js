async function fetchproducts(){
    const url = "https://fakestoreapi.com/products";
    
    const response = await fetch(url);
     
    const data = await response.json();

    if(localStorage.getItem("productsList") == null){
        localStorage.setItem("productsList",JSON.stringify(data));
    }
}

fetchproducts();



const category_container = document.getElementById("filters");

const items = document.getElementById("items");



const title = document.getElementById("title");

let data = JSON.parse(localStorage.getItem("productsList"));

renderProductItems(data);

let curruser = JSON.parse(localStorage.getItem("current_user"));
console.log(curruser.tokenId);
if(localStorage.getItem(curruser.tokenId) == null){
    localStorage.setItem(curruser.tokenId,JSON.stringify([]));
}

let myCart = JSON.parse(localStorage.getItem(curruser.tokenId));
async function fetchProductCategories(data){

   let categories = [];
   for(let i = 0;i<data.length;i++){
       if(!categories.includes(data[i].category))
       categories.push(data[i].category);
       console.log(data[i]);
   }

  
    rendercategories(categories);

}

fetchProductCategories(data);



function rendercategories(categoryList){

    let category_items = categoryList.map(element => {
        const div = document.createElement("div");
        div.className = "filter";
        div.innerText = element;
        category_container.appendChild(div);
        return div;
    });

   
    let cate_list =[category_container.children[0],...category_items];
     cate_list.forEach((div,index)=>{
        div.addEventListener("click",()=>{
             changeBg(cate_list,div);
            // console.log(div.innerText);
        })
     })

}



async function changeBg(cate_list,element){
    cate_list.forEach((ele)=>{
        ele.classList.remove("active")
    })

    element.classList.add("active");
     title.innerText = element.innerText;
    if(element.innerText == "All"){
        renderProductItems(data);
    }  
    else{
   let itemslist =[];
    for(let i = 0;i<data.length;i++){
        if(data[i].category === element.innerText)
        itemslist.push(data[i]);
    }
    renderProductItems(itemslist);
   }
}


function renderProductItems(data){
    items.innerHTML ="";

    data.map(element =>{
       items.innerHTML +=
       `<div class="item" id= "item">
       <img src=${element.image} alt="Item" />
       <div class="info">
         <div class="row">
           <div class="price">$${element.price}</div>
           <div class="sized">S,M,L</div>
         </div>
         <div class="colors">
           Colors:
           <div class="row">
             <div class="circle" style="background-color: #000"></div>
             <div class="circle" style="background-color: #4938af"></div>
             <div class="circle" style="background-color: #203d3e"></div>
           </div>
         </div>
         <div class="row">Rating:${element.rating.rate}</div>
       </div>
       <button id="addBtn">Add to Cart</button>
     </div>`
    })

    const item = document.querySelectorAll(" .items .item");
    item.forEach((item)=>{
        item.addEventListener("click",(e)=>{
            if(e.target.id == "addBtn"){
            const img = item.querySelector(".item img");
            const price = item.querySelector(".item .price");
            let obj ={
                src :img.src,
                price: price.innerText.slice(1)
            }
            myCart.push(obj);
            localStorage.setItem(curruser.tokenId,JSON.stringify(myCart));
            // console.log(JSON.parse(localStorage.getItem(curruser.tokenId)));
            }
        })
    })
    
}





