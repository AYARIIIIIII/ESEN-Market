/* ==========================================================================
   1. LA BASE DE DONNÉES 
   --------------------------------------------------------------------------
   ajout d'un produit ou un vendeur ICI 
   
   Structure :
   "Catégorie": {
       "Nom du produit": ["Vendeur 1", "Vendeur 2"],
   }
   ========================================================================== */
const marketData = {
    "Shop": {
        // Format : "Nom de l'objet" : ["Tableau des vendeurs"]
        "Calculus Notes": ["Amin", "Yosra"],
        "Physics Textbook": ["Amin", "Mohamed"],
        "Homemade Cookies": ["Islem", "Amira"],
        "Uni Hoodie (Vintage)": ["Lyn", "Yomen"],
        "Laptop Stand 3D Printed": ["Ghassen", "Amin"],
        "Energy Bars": ["Takwa"],
        "Stickers": ["Rayen", "Islem"],
        "Scientific Calculator": ["Mohamed"],
        "Gaming Mouse Used": ["Baha"]
        // POUR AJOUTER UN PRODUIT : Ajoute une ligne ici avec une virgule à la fin
        // Exemple : "Vélo Occasion": ["Sami"]
    },
    "Services": {
        "Web Development": ["Med Ghassen", "Med Amine"],
        "Math Tutoring": ["Ghaith", "Amin"],
        "Photography": ["Amen", "Salim"],
        "Graphic Design": ["Med Amine"],
        "Essay Editing": ["Yomen"],
        "Moving Help": ["Mohamed", "Amir"],
        "Guitar Lessons": ["Asma"],
        "Gym Coaching": ["Leith", "Mohamed Ali"],
        "Laptop Repair": ["Ilyes"]
    }
};

/* ==========================================================================
   2. LOGIQUE DES LISTES DÉROULANTES (Dropdowns)
   --------------------------------------------------------------------------
   Ces fonctions permettent de mettre à jour les choix "Produit" et "Vendeur"
   automatiquement quand l'utilisateur change la catégorie.
   ========================================================================== */

// Fonction 1 : Met à jour la liste des PRODUITS quand on choisit une CATÉGORIE
function updateItems() {
    // On récupère les 3 boîtes de sélection (HTML)
    const typeSelect = document.getElementById("typeSelect");   // Shop ou Service
    const itemSelect = document.getElementById("itemSelect");   // Quel objet ?
    const sellerSelect = document.getElementById("sellerSelect"); // Quel vendeur ?
    
    // ÉTAPE 1 : On vide les anciennes options pour éviter les doublons
    // On remet juste l'option par défaut "-- Select --"
    itemSelect.innerHTML = '<option value="">-- Select Item --</option>';
    sellerSelect.innerHTML = '<option value="">-- Select Seller --</option>';

    // On regarde ce que l'utilisateur a choisi (Shop ou Services)
    const selectedType = typeSelect.value; 

    // Si une catégorie est choisie ET qu'elle existe dans notre base de données (marketData)
    if (selectedType && marketData[selectedType]) {
        
        // ÉTAPE 2 : On parcourt tous les produits de cette catégorie
        // La boucle "for...in" lit chaque clé (ex: "Calculus Notes", "Cookies"...)
        for (let item in marketData[selectedType]) {
            // Création d'une nouvelle balise <option> HTML
            let option = document.createElement("option");
            option.value = item; // Ce qui est envoyé au code (ex: Calculus Notes)
            option.text = item;  // Ce que l'utilisateur voit à l'écran
            
            // On ajoute cette option dans la liste déroulante
            itemSelect.add(option);
        }
    }
}

// Fonction 2 : Met à jour la liste des VENDEURS quand on choisit un PRODUIT
function updateSellers() {
    const typeSelect = document.getElementById("typeSelect");
    const itemSelect = document.getElementById("itemSelect");
    const sellerSelect = document.getElementById("sellerSelect");

    // On vide la liste des vendeurs avant de la remplir
    sellerSelect.innerHTML = '<option value="">-- Select Seller --</option>';

    // On récupère les choix actuels
    const type = typeSelect.value; // ex: "Shop"
    const item = itemSelect.value; // ex: "Homemade Cookies"

    // Si tout est sélectionné correctement
    if (type && item && marketData[type][item]) {
        // On récupère la liste des vendeurs pour cet objet précis (ex: ["Islem", "Amira"])
        const sellers = marketData[type][item];
        
        // Pour chaque vendeur dans la liste...
        sellers.forEach(seller => {
            let option = document.createElement("option");
            option.value = seller;
            option.text = seller;
            sellerSelect.add(option); // ...on l'ajoute à la liste déroulante
        });
    }
}

/* ==========================================================================
   3. AUTO-REMPLISSAGE 
   --------------------------------------------------------------------------
   Cette partie s'exécute AUTOMATIQUEMENT quand la page charge (window.onload).
   Elle regarde l'URL pour voir si on vient du bouton "Buy Now".
   ========================================================================== */
window.onload = function() {
    // On analyse l'URL actuelle
    const urlParams = new URLSearchParams(window.location.search);
    
    // On cherche s'il y a des infos "type" et "item" dans l'URL
    const type = urlParams.get('type');
    const item = urlParams.get('item');
    
    // S'il y a des infos (l'utilisateur a cliqué sur "Buy Now")
    if(type && item) {
        let typeBox = document.getElementById("typeSelect");
        let itemBox = document.getElementById("itemSelect");
        
        // Si les boîtes existent sur la page...
        if(typeBox && itemBox) {
            // 1. On force la sélection de la catégorie (ex: Shop)
            typeBox.value = type;       
            
            // 2. On déclenche manuellement la mise à jour des items 
            // (sinon la liste des produits resterait vide)
            updateItems();              
            
            // 3. On force la sélection du produit (ex: Calculus Notes)
            itemBox.value = item;       
            
            // 4. On déclenche la mise à jour des vendeurs correspondants
            updateSellers();            
        }
    }
};

/* ==========================================================================
   4. FONCTIONS UTILITAIRES (Scroll, Recherche, Animations)
   ========================================================================== */

// Fonction pour remonter tout en haut de la page (Bouton flèche)
function scrollToTop() {
    // "smooth" donne l'effet de glissement fluide
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Fonction de recherche (Barre de recherche Shop/Services)
function searchProducts() {
    // On récupère ce que l'utilisateur tape et on le met en minuscule (pour comparer facilement)
    let input = document.getElementById('searchBar').value.toLowerCase();
    // On récupère toutes les "cards" (les cartes produits)
    let cards = document.getElementsByClassName('card');

    // On boucle sur chaque carte
    for (let i = 0; i < cards.length; i++) {
        // On prend tout le texte de la carte
        let text = cards[i].innerText.toLowerCase();
        
        // Si le texte contient ce qu'on a tapé -> on affiche ("")
        // Sinon -> on cache ("none")
        cards[i].style.display = text.includes(input) ? "" : "none";
    }
}

/* ==========================================================================
   5. VALIDATION DU FORMULAIRE (Numéro Tunisien)
   --------------------------------------------------------------------------
   Gère le clic sur "Envoyer". Vérifie que le numéro a 8 chiffres.
   ========================================================================== */
function submitForm(event) {
    event.preventDefault(); // EMPÊCHE la page de se recharger 

    // 1. Trouver le champ téléphone
    // On cherche l'input qui a le placeholder "+216..."
    let phoneInput = event.target.querySelector('input[placeholder*="+216"]');
    let phoneNumber = phoneInput.value;

    // 2. Nettoyage et Validation
    // .replace(/\s/g, '') -> Enlève tous les espaces (ex: "55 123 123" devient "55123123")
    let cleanNumber = phoneNumber.replace(/\s/g, ''); 
    
    // Condition : Si moins de 8 chiffres OU si ce n'est pas un nombre (isNaN)
    if (cleanNumber.length < 8 || isNaN(cleanNumber)) {
        // Alerte utilisateur
        alert("⚠️ Please enter a valid phone number (8 digits).");
        // Bordure rouge pour montrer l'erreur
        phoneInput.style.border = "2px solid red"; 
        return; // STOP ! On sort de la fonction, le message n'est pas envoyé.
    }

    // 3. Si tout est bon 
    phoneInput.style.border = "2px solid #2ecc71"; // Bordure verte
    
    // Animation du bouton
    let btn = event.target.querySelector('button');
    let originalText = btn.innerText; // On garde le texte "Send Request" en mémoire

    btn.innerText = "✓ Request Sent!";
    btn.style.backgroundColor = "#2ecc71"; // Vert succès
    
    // Attendre 3 secondes (3000ms) avant de remettre à zéro
    setTimeout(() => {
        btn.innerText = originalText;     // Remet le texte normal
        btn.style.backgroundColor = "";   // Remet la couleur normale (CSS)
        event.target.reset();             // Vide tous les champs du formulaire
        phoneInput.style.border = "";     // Enlève la bordure verte
    }, 3000);
}