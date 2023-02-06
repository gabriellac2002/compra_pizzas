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

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); //impede a ação padrão que no caso é atualizar a tela
        //console.log("Clicou na pizza");

        //abrir o modal
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
    });

    //adiciona as pizzas na classe pizza-area
    c('.pizza-area').append(pizzaItem);

});