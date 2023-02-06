console.log(pizzaJson);

//função para retornar o querrySelector
const c = ( e ) => {
    return document.querySelector(e);
}

const cAll = ( e ) => {
    return document.querySelectorAll(e);
}

pizzaJson.map((item,index) => {
    // console.log(item)

    //pega a classe pizza-item pelo DOM e clona
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //coloca as informações nos lugares
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    //adiciona as pizzas na classe pizza-area
    c('.pizza-area').append(pizzaItem);

});