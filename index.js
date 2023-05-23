                    // /* AJOUT DE TODOS PAR DEFAUT DANS LE LOCAL STORAGE POUR EXEMPLE */ //

/*Création d'une variable pour chaque todo exemple*/
const todotest = {
    id: "Courses",
    title: "Courses",
    description: "Acheter du lait, des oeufs, de la farine et du chocolat pour le gâteau d'anniversaire de Maria et aussi des décorations pour la fête : guirlandes, banderolles, etc. Penser au jus de pomme !",
    state: "in progress",
    timelimit: "secondary"
}

const todotest2 = {
    id: "Invitations",
    title: "Invitations",
    description: "Envoyer les invitations pour l'anniversaire de Maria",
    state: "done",
    timelimit: "urgent"
}

const todotest3 = {
    id: "Cadeaux",
    title: "Cadeaux",
    description: "Acheter un cadeau et/ou mettre en place une cagnotte",
    state: "todo",
    timelimit: "urgent"
}

/*Récupération du stockage local dans la variable productLocalStorage*/
let productLocalStorage = JSON.parse(localStorage.getItem("todo"));

/*Si le stockage local est vide, on l'initialise et on y ajoute nos trois variables*/
/*Si le stockage local n'est pas vide on ne pousse pas les todos exemple*/
if(productLocalStorage === null) {
    productLocalStorage = [];
    productLocalStorage.push(todotest);
    productLocalStorage.push(todotest2);
    productLocalStorage.push(todotest3);
    localStorage.setItem("todo", JSON.stringify(productLocalStorage));
}


                    // /* GESTION DES FONCTIONNALITES DYNAMIQUES */ //


// OUVERTURE ET FERMETURE DU FORMULAIRE ADD NEW //

/*Récupération des éléments nécessaires dans le DOM: bouton pour ouvrir le formulaire, 
icone plus et formulaire*/
let add = document.getElementById('add-new');
let form = document.getElementById('form-add-new');
let plus = document.getElementById('plus');

/*Ouverture du formulaire: le formulaire passe en display flex, on ajoute la classe "plus" 
sur l'icone pour déclencher une animation et on supprime la classe "minus" (pour le cas où 
l'on a déjà ouvert et fermé le formulaire)*/
/*Fermeture du formulaire : le formulaire passe en display none, on supprime la classe "plus" et
on ajoute la classe "minus" pour déclencher l'animation de fermeture*/
function OpenForm() {
 if(getComputedStyle(form).display != "flex") {
    form.style.display = 'flex';
    plus.classList.remove('minus');
    plus.classList.add('plus');
 } else {
    form.style.display = 'none';
    plus.classList.remove('plus');
    plus.classList.add('minus');
 }
}

/*On met un event listener sur le bouton*/
add.addEventListener('click', OpenForm);