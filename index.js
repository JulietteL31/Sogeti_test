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