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



// AJOUT D'UNE NOUVELLE TODO //

/*Récupération des éléments du DOM: bouton Add et champs du formulaire*/
let addButton = document.getElementById('add');
let title = document.getElementById('title');
let description = document.getElementById('description');
let states = document.getElementById('state-select');
let urgent = document.getElementById('urgent');
let secondary = document.getElementById('secondary');


function AddNew(e) {
    /*Récupération des valeurs des champs*/
    let titlevalue = title.value;
    let desvalue = description.value;
    let statevalue = states.value;

    /*Suppression des espaces entre les mots du titre pour en faire un id*/
    let id = titlevalue.split(' ').join('');
    
    /*Désactivation de la fonction par défaut du bouton*/
    e.preventDefault();

    /*Vérification que le champ titre n'est pas vide*/
    if(titlevalue === "") {
        alert("Veuillez saisir un titre");

    /*Vérification qu'un state a bien été sélectionné*/
    } else if(statevalue === "") {
        alert("Veuillez sélectionner un statut")

    /*Cas où le bouton radio "urgent" est coché*/
    } else if(urgent.checked) {
        /*Création d'une constante avec les informations saisies*/
        const newtodo = {
            id: id,
            title: titlevalue,
            description: desvalue,
            state: statevalue,
            timelimit: 'urgent'
        }

        /*Récupération du stockage local*/
        let productLocalStorage = JSON.parse(localStorage.getItem("todo"));

        /*Initialisation d'une variable à null que l'on va utiliser pour vérifier que la todo n'existe pas*/
        let newTodo = null;

        if (productLocalStorage != null) {
            newTodo = productLocalStorage.find(
              (element) =>
                element.id === id
            );
          }

          /*Si la todo existe: affichage d'une alerte*/
          if (newTodo) {

            alert('La todo existe déjà : veuillez saisir un titre différent');
  
          /*Si le stockage local est présent et que la todo n'y est pas
          on push la nouvelle variable*/
          } else if (productLocalStorage) {
            productLocalStorage.push(newtodo);
            localStorage.setItem("todo", JSON.stringify(productLocalStorage));

          /*Si le stockage local n'existe pas on l'initialise et on push la nouvelle variable*/
          } else {
            productLocalStorage = [];
            productLocalStorage.push(newtodo);
            localStorage.setItem("todo", JSON.stringify(productLocalStorage));
          }

          /*On clean le formulaire et on le ferme automatiquement*/
          document.querySelector('.form').reset();
          form.style.display = "none";
          plus.classList.remove('plus');
          plus.classList.add('minus');

    /*Cas où le bouton radio "secondary" est coché (même logique que la précédente)*/
    } else {
        const newtodo = {
            id: id,
            title: titlevalue,
            description: desvalue,
            state: statevalue,
            timelimit: 'secondary'
        }

        let productLocalStorage = JSON.parse(localStorage.getItem("todo"));

        let newTodo = null;

        if (productLocalStorage != null) {
            newTodo = productLocalStorage.find(
              (element) =>
                element.id === id
            );
          }

          if (newTodo) {
            alert('La todo existe déjà : veuillez saisir un titre différent');
          } else if (productLocalStorage) {
            productLocalStorage.push(newtodo);
            localStorage.setItem("todo", JSON.stringify(productLocalStorage));
          } else {
            productLocalStorage = [];
            productLocalStorage.push(newtodo);
            localStorage.setItem("todo", JSON.stringify(productLocalStorage));

          }
          document.querySelector('.form').reset();
          form.style.display = "none";
          plus.classList.remove('plus');
          plus.classList.add('minus');
    };

    /*Récupération des données du stockage local*/
    let todos = JSON.parse(localStorage.getItem("todo"))
};

/*event listener au click sur le bouton "add"*/
addButton.addEventListener('click', AddNew);