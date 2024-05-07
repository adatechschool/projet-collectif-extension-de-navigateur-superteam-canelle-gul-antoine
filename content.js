
//écoute les messages envoyés depuis d'autres parties de l'extension, comme le popup.
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {

  //vérifie si le message indique que l'extension doit être activée.
  if (message.enabled == true) {


    const regex = /\w+/g
    const attributeToSearch = `h1,h2,h3,h4,h5,p,b,i,a,span,caption`
    // let tmp =[];
    // let x = []
    // let temp = document.querySelectorAll(`h1,h2,h3,h4,h5,p,b,i,a,span,caption`);
    // console.log(temp);
    // for (let element of document.querySelectorAll(`${attributeToSearch}`)) {
    //  console.log(element.innerHTML);
    //   temp[element].innerText=x[element]; 
    //   // console.log(temp[element].innerText)
    // }
    // console.log(x);

    // Activer votre extension
    async function querySelectorAllRegex(regex, attributeToSearch) {
      const txt = [];
      if (attributeToSearch) {
        for (let element of document.querySelectorAll(`${attributeToSearch}`)) {  
          if (regex.test(element.getAttribute(attributeToSearch))) {
            txt.push(element);
          }
        }
      } else {
        for (let element of document.querySelectorAll('*')) {
          for (let attribute of element.attributes) {
            if (regex.test(attribute.value)) {
              txt.push(element);
            }
          }
        }
      }
      return txt;
    }

  

    //sélectionne tout les éléments de texte sur le site.
    let text = await querySelectorAllRegex(regex, attributeToSearch);
    //dico

   const fullURL= chrome.runtime.getURL("./dico.json") 
console.log(fullURL)

    fetch(fullURL)
      .then(response => response.json())
      .then(dictionary => {
        const dico = dictionary.dictionary[0]
        for (let i = 0; i < text.length; i++) {
          for (let y = 0; y < Object.keys(dico).length; y++) {
            if (text[i].innerHTML === Object.keys(dico)[y]) {
              text[i].innerHTML = text[i].innerHTML.replaceAll(Object.keys(dico)[y], dico[Object.keys(dico)[y]]);
              console.log(text[i].innerHTML)
              console.log(dico[Object.keys(dico)[y]])
            }
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
})