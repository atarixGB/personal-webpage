// -------- Vigenere Cipher source code ----------
// Note: comments are in French

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const tailleAlphabet = 26;

// Convertit un caractère en son code ASCII correspondant
let ascii = function (char) {
    let resultat = char.charCodeAt(0);
    return resultat;
};

// Vérifie si le caractère est valide (alphabet)
let estValide = function (char) {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

// Calcule la distance de décalage par rapport à la première lettre de l'alphabet
let obtenirDistanceDecalage = function (char) {
    let resultat = '';

    let isLowerCase = ascii(char) >= ascii('a') && ascii(char) <= ascii('z');
    let isUpperCase = ascii(char) >= ascii('A') && ascii(char) <= ascii('Z');

    if (isLowerCase) {
        resultat = ascii(char) - ascii('a');
    } else if (isUpperCase) {
        resultat = ascii(char) - ascii('A');
    }
    return resultat;
}

// Pour obtenir l'index de la lettre dans l'alphabet
let obtenirIndexDansAlphabet = function (lettre) {
    let codeAscii = ascii(lettre);

    // si majuscule, on convertit en minuscule
    if (codeAscii >= ascii('A') && codeAscii <= ascii('Z')) {
        codeAscii += 32;
    }

    return alphabet.search(String.fromCharCode(codeAscii));
}

// Encode le message avec la clef de cryptage donnée en paramètre
let encoderMessage = function (message, clef) {

    let resultat = "";
    let distance = 0;
    let positionLettre = '';
    let positionNouvelleLettre = '';
    let j = 0;

    for (let i = 0; i < message.length; i++) {

        // si la lettre est majuscule ou minuscule
        if (estValide(message.charAt(i)) ) {

            if (estValide(clef.charAt(j)) ) {

                // chiffrage de la lettre
                distance = obtenirDistanceDecalage(clef.charAt(j++));
                positionLettre = obtenirIndexDansAlphabet(message.charAt(i));
                positionNouvelleLettre = (distance + positionLettre) % tailleAlphabet;
                resultat += alphabet[positionNouvelleLettre];

                if (j >= clef.length) { j = 0; }
            }

        } else { // tout autre caractère est recopié tel quel
            resultat += message.charAt(i);
        }
    }

    return resultat;
}

// Décode le message avec la clef de cryptage donnée en paramètre
let decoderMessage = function (message, clef) {

    let resultat = "";
    let distance = 0;
    let positionNouvelleLettre = 0;
    let positionAncienneLettre = 0;
    let j = 0;

    for (let i = 0; i < message.length; i++) {

        // si la lettre est majuscule ou minuscule
        if (estValide(message.charAt(i)) ) {
            if (estValide(clef.charAt(j)) ) {

                // déchiffrage de la lettre
                distance = obtenirDistanceDecalage(clef.charAt(j++));
                positionNouvelleLettre = obtenirIndexDansAlphabet(message.charAt(i));
                positionAncienneLettre = positionNouvelleLettre - distance;

                if (positionAncienneLettre < 0) {
                    resultat += alphabet[tailleAlphabet + positionAncienneLettre];
                } else {
                    resultat += alphabet[positionAncienneLettre];
                }

                if (j >= clef.length) { 
                    j = 0; 
                }
            }

        } else { // tout autre caractère est recopié tel quel
            resultat += message.charAt(i);
        }
    }
    return resultat;
}