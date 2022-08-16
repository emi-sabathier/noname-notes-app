export interface TextDictionary {
    [key: string]: any;
}

export const dictionary: TextDictionary = {
    nav: {},
    screens: {
        searchButton: 'Rechercher',
        searchPlaceholder: 'Rechercher dans les notes',
        titlePlaceholder: 'Titre',
        contentPlaceholder: 'Ecrivez-ici',
    },
    components: {
        screenBottomBar: {
            colorsList: 'Liste des couleurs',
        },
    },
    uiShared: {},
};
