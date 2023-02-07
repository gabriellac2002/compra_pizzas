console.log(pizzaJson);

//quantidades de pizzas selecionada no modal
let modalQt = 1;

//função para retornar o querrySelector
const c = ( e ) => {
    return document.querySelector(e);
}

const cAll = ( e ) => {
    return document.querySelectorAll(e);
}

//listagem das pizzas
pizzaJson.map((item,index) => {
    // console.log(item)

    //pega a classe pizza-item pelo DOM e clona
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //insere a chave da pizza especifica clicada
    pizzaItem.setAttribute('data-key', index);

    //coloca as informações nos lugares
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); //impede a ação padrão que no caso é atualizar a tela
        //console.log("Clicou na pizza");

        modalQt = 1;

        //pega a pizza que esta sendo clicada
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        // console.log("Pizza clicada: " + key);

        //preecher o modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //slecionar o tamanho
        c('.pizzaInfo--size.selected').classList.remove('selected'); //deseleciona o selected
        cAll('.pizzaInfo--size').forEach((size,sizeIndex) => {
            if(sizeIndex == 2)
            {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt ;

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

//acoes do modal

//fecha o modal
function closeModal () {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    },500);
}

//gera um array com os dois botoes e para cada botao atribui um evento de click 'acionando' a funcao de fechar o modal
cAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});