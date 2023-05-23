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
    /*On appelle la fonction DisplayTodos qui permet d'afficher toutes les todos avec la variable todos
    en paramètre*/
    DisplayTodos(todos);
    /*Fonction OpenTodo qui permet d'afficher les informations d'une todo*/
    OpenTodo(todos);
};

/*event listener au click sur le bouton "add"*/
addButton.addEventListener('click', AddNew);



// APPEL DES FONCTIONS COURANTES //

/*On récupère le local storage dans la variable todos*/
let todos = JSON.parse(localStorage.getItem("todo"));
/*On appelle la fonction DisplayTodos qui permet d'afficher toutes les todos avec la variable todos
en paramètre*/
DisplayTodos(todos);
/*Fonction OpenTodo qui permet d'afficher les informations d'une todo*/
OpenTodo(todos);



// AFFICHAGE DES NOUVELLES TODOS //

function DisplayTodos(todos) {
    /*Récupération dans le DOM des div où vont s'afficher les todos et on les initialise vide
    pour ne pas que les todos soient affichées en plusieurs fois*/
    let done = document.getElementById("done");
    done.innerHTML = "";
    let todo = document.getElementById("todo");
    todo.innerHTML = "";
    let inprogress = document.getElementById("inprogress");
    inprogress.innerHTML = "";
    /*Boucle sur le tableau "todos" du local storage*/
    for (let todo of todos) {
        /*Si le state de la todo est "todo" on crée une constante avec les infos et on 
        l'insère dans la div todo*/
        if(todo.state === 'todo') {
            const nouvelleTodo = 
                `<div class="item-todo-state">
                    <div class="setTodo">
                        <div class="change-state">
                            <label for="changestate-${todo.id}"></label>
                            <input type="checkbox" value="changestate" name="changestate" id="changestate-${todo.id}" class="checkbox-change-state">
                        </div>
                    </div>
                    <div class="todo ${todo.timelimit}" id="${todo.id}">
                        <div class="todo-content">
                            <h3 class="todo-title">${todo.title}</h3>
                            <p class="todo-description">${todo.description}</p>
                        </div>
                    </div>
                </div>`
            document
          .getElementById("todo")
          .insertAdjacentHTML("afterbegin", nouvelleTodo);

          /*Si le state de la todo est "in progress" on crée une constante avec les infos et on 
        l'insère dans la div in progress*/
        } else if(todo.state === 'in progress') {
            const nouvelleTodo = 
            `<div class="item-todo-state">
                <div class="setTodo">
                    <div class="change-state">
                        <label for="changestate-${todo.id}"></label>
                        <input type="checkbox" value="changestate" name="changestate" id="changestate-${todo.id}" class="checkbox-change-state">
                    </div>
                </div>
                <div class="todo ${todo.timelimit}" id="${todo.id}">
                    <div class="todo-content">
                        <h3 class="todo-title">${todo.title}</h3>
                        <p class="todo-description">${todo.description}</p>
                    </div>
                </div>
            </div>`
            document
          .getElementById("inprogress")
          .insertAdjacentHTML("afterbegin", nouvelleTodo);

          /*Si le state de la todo est "done" on crée une constante avec les infos et on 
        l'insère dans la div done*/
        } else {
            const nouvelleTodo =
            `<div class="item-todo-state">
                <div class="setTodo">
                    <div class="change-state">
                        <label for="changestate-${todo.id}"></label>
                        <input type="checkbox" value="changestate" name="changestate" id="changestate-${todo.id}" class="checkbox-change-state">
                    </div>
                </div>
                <div class="todo done ${todo.timelimit}" id="${todo.id}">
                    <div class="todo-content">
                        <h3 class="todo-title">${todo.title}</h3>
                        <p class="todo-description">${todo.description}</p>
                    </div>
                </div>
            </div>`
            document
          .getElementById("done")
          .insertAdjacentHTML("afterbegin", nouvelleTodo);
        }
    }
}


// OUVERTURE DES TODOS //

function OpenTodo(todos) {
    /*Boucle sur le tableau d'objet du local storage : "pour chaque todo..."*/
    for(let todo of todos) {
        /*Récupération de la todo en fonction de son id*/
        let id = document.getElementById(`${todo.id}`);
        /*Récupération de la div conteneur dans le DOM*/
        let conteneur = document.getElementById("opentodoview");
        /*event listener sur la todo*/
        id.addEventListener('click', () => {
            /*Vérification que le conteneur est vide*/
            let yet = conteneur.firstElementChild;
            /*S'il est vide*/
            if(yet === null) {
                /*Création de la constante avec les informations à afficher*/
                const open = 
            `<div class="opentodo" id="opentodo">
                <div class="opentodo-close" id="iconeclose"><i class="fa-solid fa-plus fas i-close"></i></div>
                <div class="opentodo-content">
                    <h3>${todo.title}</h3>
                    <p>${todo.description}</p>
                    <div class="legende">
                        <div class="circle legende-${todo.timelimit}"></div>
                        <p>${todo.timelimit}</p>
                    </div>
                    <div class="modify" id="modify">
                        <div class="modify-content">
                            <i class="fa-solid fa-pen fas icone-modify" id="pen"></i>
                            <p>Modify</p>
                        </div>
                    </div>
                    <div class="form-modify" id="form-modify">
                        <form class="formulaire">
                            <div class="question-form question-modify">
                                <label for="title-input-modify">Title :</label>
                                <input
                                    type="text"
                                    id="title-input-modify"
                                    name="title"
                                    class="input"
                                    value="${todo.title}"
                                    required
                                />
                            </div>
                        <div class="question-form question-modify">
                            <label for="description-modify">Description :</label>
                            <textarea
                                id="description-modify"
                                name="description"
                                class="input"
                                value=""
                            ></textarea>
                        </div>
                        <div class="question-form question-modify">
                            <label for="state-modify">Choose a state:</label>
                            <select name="states" id="state-modify" class="input pointer">
                                <option class="pointer" value="">
                                --Please choose an option--
                                </option>
                                <option class="pointer" value="todo">Todo</option>
                                <option class="pointer" value="in progress">In progress</option>
                                <option class="pointer" value="done">Done</option>
                            </select>
                        </div>
                        <div class="question-form question-modify">
                            <legend>Choose a time limit:</legend>
                            <div class="form-radio">
                                <input
                                    type="radio"
                                    id="urgent-modify"
                                    name="time-limit"
                                    value="urgent"
                                    class="pointer radio"
                                    checked
                                />
                                <label for="urgent-modify">Urgent</label>
                            </div>
                            <div class="form-radio">
                                <input
                                    type="radio"
                                    id="secondary-modify"
                                    name="time-limit"
                                    value="secondary"
                                    class="pointer radio"
                                />
                                <label for="secondary-modify">Secondary</label>
                            </div>
                        </div>
                        <div class="buttons-form">
                            <div class="form-button">
                                <div type="modify" class="button-modify" id="button-modify-todo">
                                    Modify
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>`
            /*Insertion de la constante dans le conteneur*/
            conteneur.insertAdjacentHTML("afterbegin", open);

            /*Scroll en haut de page*/
            window.scroll({
                top: 1,
                left: 1,
                behavior: 'smooth'
              });
            
            /*Appel de la fonction CloseTodo qui permet de fermer la fenêtre*/
            CloseTodo();
            /*Appel de la fonction OpenFormModif qui permet d'ouvrir le formulaire de modification*/
            OpenFormModif();
            /*Event listener sur le bouton "modify" du formulaire*/
            document.getElementById("button-modify-todo").addEventListener('click', () => {
                /*On récupère les éléments du formulaire dans le DOM*/
                let title = document.getElementById("title-input-modify");
                let description = document.getElementById("description-modify");
                let state = document.getElementById("state-modify");
                let urgent = document.getElementById("urgent-modify");
                let secondary = document.getElementById("secondary-modify");

                /*On récupère les valeurs des input*/
                let titlevalue = title.value;
                let desvalue = description.value;
                let statevalue = state.value;

                /*On enlève les espaces du titre pour obtenir un id viable*/
                let id = titlevalue.split(' ').join('');

                let productLocalStorage = JSON.parse(localStorage.getItem("todo"));
    
                        /*On récupère les éléments de la todo à modifier dans le local storage*/
                        let todoModify = productLocalStorage.find(el => el.id === id);
                        

                        if(statevalue === "") {
                            alert("Veuillez saisir un statut");
                            //CAS URGENT
                        } else if(urgent.checked) {
                            /*On modifie les informations existantes avec les nouvelles infos*/
                            todoModify.id = id;
                            todoModify.title = titlevalue;
                            todoModify.description = desvalue;
                            todoModify.state = statevalue;
                            todoModify.timelimit = "urgent"
    
                            /*On ajoute au local storage*/
                            localStorage.setItem("todo", JSON.stringify(productLocalStorage));
                            /*On ferme le conteneur*/
                            document.getElementById("opentodo").remove();

                            //CAS SECONDARY
                        } else if(secondary.checked) {
                            todoModify.id = id;
                            todoModify.title = titlevalue;
                            todoModify.description = desvalue;
                            todoModify.state = statevalue;
                            todoModify.timelimit = "secondary"
    
                            localStorage.setItem("todo", JSON.stringify(productLocalStorage));
                            document.getElementById("opentodo").remove();

                        }
                        
                        let todos = JSON.parse(localStorage.getItem("todo"));
                        DisplayTodos(todos);
                        OpenTodo(todos);
                    });
            /*Si le conteneur n'est pas vide : si une todo est ouverte et que l'on clique sur une 
            autre todo sans avoir fermé la précédente*/
            /*Suppression de la todo puis même logique que pour le premier cas*/
            } else {
                yet.remove();
                const open = 
            `<div class="opentodo" id="opentodo">
                <div class="opentodo-close" id="iconeclose"><i class="fa-solid fa-plus fas i-close"></i></div>
                <div class="opentodo-content">
                    <h3>${todo.title}</h3>
                    <p>${todo.description}</p>
                    <div class="legende">
                        <div class="circle legende-${todo.timelimit}"></div>
                        <p>${todo.timelimit}</p>
                    </div>
                    <div class="modify" id="modify">
                        <div class="modify-content">
                            <i class="fa-solid fa-pen fas icone-modify" id="pen"></i>
                            <p>Modify</p>
                        </div>
                    </div>
                    <div class="form-modify" id="form-modify">
                        <form class="formulaire">
                            <div class="question-form question-modify">
                                <label for="title-input-modify">Title :</label>
                                <input
                                    type="text"
                                    id="title-input-modify"
                                    name="title"
                                    class="input"
                                    value="${todo.title}"
                                    required
                                />
                            </div>
                        <div class="question-form question-modify">
                            <label for="description-modify">Description :</label>
                            <textarea
                                id="description-modify"
                                name="description"
                                value=""
                                class="input"
                            ></textarea>
                        </div>
                        <div class="question-form question-modify">
                            <label for="state-modify">Choose a state:</label>
                            <select name="states" id="state-modify" class="input pointer">
                                <option class="pointer" value="">
                                --Please choose an option--
                                </option>
                                <option class="pointer" value="todo">Todo</option>
                                <option class="pointer" value="in progress">In progress</option>
                                <option class="pointer" value="done">Done</option>
                            </select>
                        </div>
                        <div class="question-form question-modify">
                            <legend>Choose a time limit:</legend>
                            <div class="form-radio">
                                <input
                                    type="radio"
                                    id="urgent"
                                    name="time-limit"
                                    value="urgent"
                                    class="pointer radio"
                                    checked
                                />
                                <label for="urgent">Urgent</label>
                            </div>
                            <div class="form-radio">
                                <input
                                    type="radio"
                                    id="secondary"
                                    name="time-limit"
                                    value="secondary"
                                    class="pointer radio"
                                />
                                <label for="secondary">Secondary</label>
                            </div>
                        </div>
                        <div class="buttons-form">
                            <div class="form-button">
                                <div type="modify" class="button-modify" id="button-modify-todo">
                                    Modify
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>`
            conteneur.insertAdjacentHTML("afterbegin", open);
            window.scroll({
                top: 1,
                left: 1,
                behavior: 'smooth'
              });
            CloseTodo();
            OpenFormModif();
            document.getElementById("button-modify-todo").addEventListener('click', () => {
                //On récupère les éléments du formulaire dans le DOM
                let title = document.getElementById("title-input-modify");
                let description = document.getElementById("description-modify");
                let state = document.getElementById("state-modify");
                let urgent = document.getElementById("urgent-modify");
                let secondary = document.getElementById("secondary-modify");

                //On récupère les valeurs des input
                let titlevalue = title.value;
                let desvalue = description.value;
                let statevalue = state.value;

                //On enlève les espaces du titre pour obtenir un id viable
                let id = titlevalue.split(' ').join('');

                let productLocalStorage = JSON.parse(localStorage.getItem("todo"));
    
                        let todoModify = productLocalStorage.find(el => el.id === id);
                        console.log(todoModify);

                        if(statevalue === "") {
                            alert("Veuillez saisir un statut");
                        } else if(urgent.checked) {
                            todoModify.id = id;
                            todoModify.title = titlevalue;
                            todoModify.description = desvalue;
                            todoModify.state = statevalue;
                            todoModify.timelimit = "urgent"
    
                            localStorage.setItem("todo", JSON.stringify(productLocalStorage));
                            document.getElementById("opentodo").remove();

                        } else if(secondary.checked) {
                            todoModify.id = id;
                            todoModify.title = titlevalue;
                            todoModify.description = desvalue;
                            todoModify.state = statevalue;
                            todoModify.timelimit = "secondary"
    
                            localStorage.setItem("todo", JSON.stringify(productLocalStorage));
                            document.getElementById("opentodo").remove();

                        }
                        
                        let todos = JSON.parse(localStorage.getItem("todo"));
                        DisplayTodos(todos);
                        OpenTodo(todos);
                    });
            }
        })
    }
}


// FERMETURE DES TODOS //

function CloseTodo() {
    let iconeclose = document.getElementById("iconeclose");
    iconeclose.addEventListener("click", () => {
    iconeclose.closest("#opentodo").remove();
})
}


// OUVERTURE DU FORMULAIRE DE MODIFICATION //

/*Même logique que pour l'ouverture du formulaire d'ajout*/
/*Récup des infos : bouton, icone, formulaire*/
/*event listener sur le bouton*/
/*Si le formulaire est fermé : display flex, ajout/suppression d'une classe pour animation icone*/
/*Si le formulaire est ouvert : display none, ajout/suppression d'une classe pour animation icone*/
function OpenFormModif() {
    let form = document.getElementById("form-modify");
    let icone = document.getElementById("pen");
    let bouton = document.getElementById("modify");
    bouton.addEventListener('click', () => {
        if(getComputedStyle(form).display != "flex") {
            form.style.display = "flex";
            icone.classList.remove('droite');
            icone.classList.add('gauche');
        } else {
            form.style.display = "none";
            icone.classList.remove('gauche');
            icone.classList.add('droite');
        }
    })
}