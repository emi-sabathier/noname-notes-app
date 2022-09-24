export interface TextDictionary {
    [key: string]: any;
}

export const dictionary: TextDictionary = {
    nav: {},
    screens: {
        searchButton: 'Rechercher dans les notes et tags',
        searchPlaceholder: 'Rechercher dans les notes',
        titlePlaceholder: 'Titre',
        contentPlaceholder: 'Ecrivez-ici',
        newTag: 'Nouveau libellé',
        tagName: 'Ecrire ici',
    },
    components: {
        screenBottomBar: {
            colorsModalTitle: 'Liste des couleurs',
            tagsModalTitle: 'Ajouter un tag',
        },
    },
    uiShared: {},
};
