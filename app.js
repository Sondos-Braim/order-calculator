'use strict';
let orders = []
let table = document.createElement('table')
let tbod 
let deliveryFee
let validation=document.createElement('p')
form.appendChild(validation)
function Order(name,item,quantity,price){
    this.name = name
    this.item = item
    this.quantity = quantity
    this.price = price * quantity
    this.share = 0
    orders.push(this)   
}
Order.prototype.countShare=function(){
    this.share=(deliveryFee / orders.length)+this.price   
}

function setItems(){
    localStorage.setItem('orders',JSON.stringify(orders))
}

function getItems(){
    let storageData=JSON.parse(localStorage.getItem('orders'))
    if(storageData){
        orders=storageData
        tableHeader()
        tableBody()
        tableFooter()
    }
}

form.addEventListener('submit',ordering)
function ordering(event){
    event.preventDefault()  
    validation.textContent=''   
    deliveryFee = event.target.fee.value
    let hungryPerson = event.target.name.value 
    if (orders.length>0){
        for(let i=0;i<orders.length;i++){
            if(orders[i].name==hungryPerson){
                validation.textContent='This user already exists.'
            }
            else{               
                if(i==orders.length-1){
                    var food = event.target.order.value
                    var quantity = event.target.one.value
                    var price = event.target.money.value
                    new Order(hungryPerson,food,quantity,price)  
                    for(let i = 0 ; i < orders.length ; i++){
                    orders[i].countShare()
                    }
                    table.textContent=""
                    tableHeader()
                    tableBody()
                    tableFooter()
                    setItems()
                    break
                }
            }
        }        
    }
    else{
        var food = event.target.order.value
        var quantity = event.target.one.value
        var price = event.target.money.value  
        new Order(hungryPerson,food,quantity,price) 
        for(let i = 0 ; i < orders.length ; i++){
            orders[i].countShare()
            }     
        table.innerHTML=""
        tableHeader()
        tableBody()
        tableFooter()
        setItems()
    }
}

function tableHeader(){
    let row = document.createElement('tr')
    let firstCell = document.createElement('th')
    firstCell.textContent='Name'
    let seconedCell = document.createElement('th')
    seconedCell.textContent='Share'
    row.appendChild(firstCell)
    row.appendChild(seconedCell)
    table.appendChild(row)
    result.appendChild(table)
}

function tableBody(){
    tbod = document.createElement('tbody')
    for(let x = 0 ; x < orders.length ; x++){
        let row = document.createElement('tr')
        let firstCell = document.createElement('td')
        firstCell.textContent=orders[x].name  
        let seconedCell = document.createElement('td')
        seconedCell.textContent= orders[x].share
        let deleteRow=document.createElement('td')
        deleteRow.textContent='X'
        row.id=x
        deleteRow.onclick = removeOrder
        row.appendChild(firstCell)
        row.appendChild(seconedCell)
        row.appendChild(deleteRow)
        
        tbod.appendChild(row)
    }
    table.appendChild(tbod)
}

function tableFooter(){
    let total=0
    for(let j=0;j<orders.length;j++){
        total=total+orders[j].share
    }
    let footerRow = document.createElement('tr')
    table.appendChild(footerRow)
    let cell = document.createElement('th')
    cell.textContent = 'Total'
    footerRow.appendChild(cell)
    let totalCell = document.createElement('th')
    totalCell.textContent = total  
    footerRow.appendChild(totalCell)
}
function removeOrder(x){
    console.log(x)
    let rowId = x.path[1].id
    console.log(rowId)
    orders.splice(rowId,1)
    tbod.deleteRow(rowId)
    table.innerHTML=""
    for(let i = 0 ; i < orders.length ; i++){
        orders[i].countShare()
        }   
    tableHeader()
    tableBody()
    tableFooter()
    setItems()
}
getItems()
