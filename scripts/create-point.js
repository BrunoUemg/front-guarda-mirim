function populateUFs(){
   
    const ufSelect =  document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then(states => {
  for(const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
  }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]") 
    const stateInput = document.querySelector("input[name=state]") 
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione uma cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then(cities => {
       
  for(const city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
  }

  citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities  )

/// Itens de coleta
//Pegar todos os li´s

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
//criando variavel
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


    function handleSelectedItem(event){
       const itemLi = event.target
        // adicionar ou remover uma classe com javascrip
       itemLi.classList.toggle("selected")

        const ItemId = itemLi.dataset.id


    

//verificar se existem itemns selecionados, se sim pegar o itens

const alreadySelected = selectedItems.findIndex( item => {
   const itemFound = item == ItemId
    return itemFound
})
//se ja estiver selecionado, tirar da selecao
if( alreadySelected >= 0){
    //tirar da selecao
const filteredItems = selectedItems.filter( item => {
    const itemIsDifferent = item != ItemId
    return itemIsDifferent
})
selectedItems = filteredItems
// se nao estiver selecionado, adicionar à seleção
} else {
    selectedItems.push(ItemId)
}
collectedItems.value = selectedItems
}


//atualizar o campo escondido com os items selecionados
    