document.querySelector('.choix1').addEventListener('click', choix1);
document.querySelector('.choix2').addEventListener('click', choix2);
document.querySelectorAll('.jouer').forEach((val) => {
    val.addEventListener('click', () => {
        choixJoueur();
    });
});

function choix1() {
    document.querySelector('.choix1').classList.add('on');
    document.querySelector('.choix1').classList.remove('off');
    
    document.querySelector('.choix2').classList.add('off');
    document.querySelector('.choix2').classList.remove('on');
}

function choix2() {
    document.querySelector('.choix2').classList.add('on');
    document.querySelector('.choix2').classList.remove('off');
    
    document.querySelector('.choix1').classList.add('off');
    document.querySelector('.choix1').classList.remove('on');
}
function localSave(){
    localStorage.setItem('choix', JSON.stringify(choixduJoueur));
}

let choixduJoueur;
function choixJoueur(){
    if (document.querySelector('.choix1').classList.contains('on')){
        choixduJoueur = 1;
    } else {
        choixduJoueur = 0;
    }
    localSave();
}



