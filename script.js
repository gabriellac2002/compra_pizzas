console.log(pizzaJson);

//********variaveis globais************
//quantidades de pizzas selecionada no modal
let modalQt = 1;

//array do carrinho
let cart = [];

//guardar a chave da pizza
let modalKey = 0;

//**************************************

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
        modalKey = key;
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

//botões mais e menos
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1 ){
        modalQt --;
        c('.pizzaInfo--qt').innerHTML = modalQt ;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt ++;
    c('.pizzaInfo--qt').innerHTML = modalQt ;
});

cAll('.pizzaInfo--size').forEach((size,sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//botao adicionar ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {
    //qual a pizza?
    console.log("Pizza: " +modalKey);
    //qual o tamanho selecionado?
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    //verifica se tem um item igual no carrinho
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    console.log('Tamanho: ' + size);
    //quantas pizzas?
    console.log(modalQt);

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
        //adicionando ao carrinho
        cart.push({
            identifier,
            size,
            qt:modalQt
        });
    }

   
    updateCart();
    closeModal();
});

function updateCart(){
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => {
                return item.id == cart[i].id;
            });

           //preenchendo as informações
            let cartItem = c('.models .cart--item').cloneNode(true);

            cartItem.querySelector('.img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name; 

            c('.cart').append(cartItem);
        }
    } else {
        c('aside').classList.remove('show');
    }
}