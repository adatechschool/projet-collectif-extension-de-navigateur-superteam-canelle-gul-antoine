const text = document.querySelectorAll(`h1,h2,h3,h4,h5,p,a,span,caption`)


const dictionnay = {
    homme: "femme",
    Homme: "Femme",
    hommes: "femmes",
  };




 for (let i=0 ; i< text.length ; i++){

    for(let y=0; y<Object.keys(dictionnay).length ; y++ ){
        if(text[i].innerHTML.includes(Object.keys(dictionnay)[y]))
        {
            text[i].innerHTML = text[i].innerHTML.replace(Object.keys(dictionnay)[y], dictionnay[Object.keys(dictionnay)[y]]);
        }
    }
 }
    
