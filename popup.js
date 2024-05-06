//ce code sert à synchroniser l'état de l'extension  entre le popup et le contenu de la page.
//permet de détecter lorsque l'utilisateur clique sur la case à cocher dans le popup de l'extension. Une fois détecté, il envoie un message au script de contenu de la page web active, indiquant si l'extension doit être act. ou désac. Ca déclenche ensuite le traitement approprié dans le script de contenu pour modifier le contenu de la page en conséquence. 

document.addEventListener('DOMContentLoaded', () => { //ici ça va exécuter le code de la fonction 
    let toggle = document.getElementById('switch'); //je récupère l'ID

    // Envoie un message au script de contenu pour indiquer l'état actuel de l'extension
    //lorsque l'état de la case à cocher change ça exécute le code à l'intérieur de la fonction.
    toggle.addEventListener('change', function () {
        if (toggle.checked == true) {
            //récupère les onglets actifs dans la fenêtre active.
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                //ici ça envoie un msg au contenu de la page active, indiquant si la case à cocher est cochée ou non (activée ou désactivée.)
                chrome.tabs.sendMessage(tabs[0].id, { enabled: toggle.checked });
            });
        } else if (!toggle.checked) {
            chrome.tabs.reload();
        }
    });
});