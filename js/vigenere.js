// -------- Vigenere Cipher source code ----------
// Note: comments are in French

// Fonction qui détermine la distance de décalage correspondante à chaque 
// lettre du mot indiqué en paramètre
let decalage = function (mot) {
    let distance = [];

    for (let i = 0; i < mot.length; i++) {
        // si lettre minuscule...
        if (mot.charCodeAt(i) >= 97 && mot.charCodeAt(i) <= 122) {
            let car = mot.charCodeAt(i) - 97;
            distance.push(car);
        }

        // si lettre majuscule...
        else if (mot.charCodeAt(i) >= 65 && mot.charCodeAt(i) <= 90) {
            let car = mot.charCodeAt(i) - 65;
            distance.push(car);
        }
    }
    return distance;
};


// Fonction principale qui encode le message selon un mot-clef
let encoderTexte = function (message, clef) {

    let resultat = ""; 
    let distance = decalage(clef); // tableau contenant les distances de décalage de chaque lettre
    let p = 0; // caractère à la position p dans le message


    for (let i = 0; i < message.length; i++) { // boucle pour répéter les distances de décalage lorsque terminé (ex. pour "rats" = [17, 0, 19, 18], [17, 0 ,19, 18],etc.  
        for (let j = 0; j < clef.length; j++) { // boucle pour obtenir distance de décalage correspondante

            let code = message.charCodeAt(p); // contient le code ASCII du caractère à la position p dans le message

            // si le caractère à la position p est tout sauf une lettre (= caractère spécial - e.g "!@#$%..."):
            if ((code >= 32 && code <= 64) || (code >= 91 && code <= 96) || (code >= 123 && code <= 127)) {

                resultat += message.charAt(p); // ajout dans "resultat" du caractère tel quel (e.g si c'est "%", il se sera ré-inscrit "%" dans le message)
                p++; // caractere suivant dans le message
                j--; // évite un décalage des distances de chiffrage causé par les espaces vides (= " ") ou les caractères spéciaux
            }

            else if (code >= 97 && code <= 122) { // sinon, si le caractère à la position p est une lettre MINUSCULE...
                let car = code + distance[j]; // addition de la distance de décalage correspondante au code ASCII du caractère en position p (étape de l'encodage)

                if (car < 97 || car > 122) { // si le code ASCII obtenu est tout sauf une lettre minuscule...

                    resultat += String.fromCharCode(car - 122 + 96); // ajout dans "resultat"  du caractère encodé (étape de la permutation circulaire)
                    // "car-122" = de combien le code ASCII dépasse de la limite maximum (= distance de décalage)
                    // "+96" = juste avant le point de départ de l'alphabet en code ASCII (= position "0" = "a")
                } else { // sinon, si le code ASCII est une lettre minuscule => ajout dans "resultat" du caractère encodé
                    resultat += String.fromCharCode(car); //
                }
                p++;
            }

            else if (code >= 65 && code <= 90) { // sinon, si le caractère est une lettre MAJUSCULE...
                // (mêmes étapes qu'avec les lettres minuscules, seulement les codes ASCII changent 
                let car = code + distance[j];

                if (car < 65 || car > 90) {
                    resultat += String.fromCharCode(car - 90 + 64);
                } else {
                    resultat += String.fromCharCode(car); //
                }
                p++;
            }
        }
    }

    return resultat; // retourne le message encodé
};



// Fonction qui DÉCODE le message selon un mot-clef
// Même principe que l'encodage, mais on fait l'inverse!
let decoderTexte = function (messageCode, clef) {

    let resultat = "";
    let distance = decalage(clef);
    let p = 0;

    for (let i = 0; i < messageCode.length; i++) {
        for (let j = 0; j < clef.length; j++) {
            let code = messageCode.charCodeAt(p);

            if ((code >= 32 && code <= 64) || (code >= 91 && code <= 96) || (code >= 123 && code <= 127)) {

                resultat += messageCode.charAt(p);
                p++;
                j--;
            }

            //pour lettre minuscule
            else if (code >= 97 && code <= 122) {
                let car = code - distance[j]; // soustraction de la distance de décalage correspondante au code ASCII du caractère en position p (étape du décodage)

                if (car < 97 || car > 122) {

                    resultat += String.fromCharCode(123 - (97 - car));
                    // (97-car) => de combien le code ASCII dépasse de la limite minimum (= distance de décalage)
                    // 123-(97-car) => point de départ à partir de "Z" 
                } else {
                    resultat += String.fromCharCode(car);
                }

                p++;
            }

            // pour lettre majuscule (mêmes étapes que lettre minuscule)
            else if (code >= 65 && code <= 90) {
                let car = code - distance[j];

                if (car < 97 || car > 122) {

                    resultat += String.fromCharCode(90 - (65 - car)); // inverse. 
                } else {
                    resultat += String.fromCharCode(car);
                }
                p++;
            }

        }
    }

    return resultat;
};