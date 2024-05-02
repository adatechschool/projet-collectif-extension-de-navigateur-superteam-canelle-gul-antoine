//ce code sert à synchroniser l'état de l'extension  entre le popup et le contenu de la page.
//permet de détecter lorsque l'utilisateur clique sur la case à cocher dans le popup de l'extension. Une fois détecté, il envoie un message au script de contenu de la page web active, indiquant si l'extension doit être act. ou désac. Ca déclenche ensuite le traitement approprié dans le script de contenu pour modifier le contenu de la page en conséquence. 

document.addEventListener('DOMContentLoaded', () => { //ici ça va exécuter le code de la fonction 
    let toggle = document.getElementById('toggle'); //je récupère l'ID
    
    // Envoie un message au script de contenu pour indiquer l'état actuel de l'extension
    toggle.addEventListener('change', () => { //lorsque l'état de la case à cocher change ça exécute le code à l'intérieur de la fonction.
        if(toggle.checked == true){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //récupère les onglets actifs dans la fenêtre active.
            chrome.tabs.sendMessage(tabs[0].id, {enabled: toggle.checked}); //ici ça envoie un msg au contenu de la page active, indiquant si la case à cocher est cochée ou non (activée ou désactivée.)
        
        });
    }else{
            chrome.tabs.display == "none";
    }
    });
});