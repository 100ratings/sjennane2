/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
import "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js";
CookieConsent.run({
  categories: {
    necessary: {
      enabled: true, // this category is enabled by default
      readOnly: true, // this category cannot be disabled
    },
    analytics: {},
  },

  language: {
    default: "fr",
    translations: {
      fr: {
        consentModal: {
          title: "Nous utilisons des cookies",
          description: "Cookies",
          acceptAllBtn: "Accepter tout",
          acceptNecessaryBtn: "Rejeter tout",
          showPreferencesBtn: "Gérer les cookies",
        },
        preferencesModal: {
          title: "Cookies",
          acceptAllBtn: "Accepter tout",
          acceptNecessaryBtn: "Rejeter tout",
          savePreferencesBtn: "Accepter la sélection",
          closeIconLabel: "Fermer",
          sections: [
            {
              title: "Que sont les cookies ?",
              description:
                "Les cookies sont de petits fichiers stockés sur votre appareil (ordinateur, smartphone, tablette) lorsque vous naviguez sur un site web. Ils permettent, entre autres, d’analyser la manière dont les visiteurs interagissent avec un site.",
            },
            {
              title: "Cookies indispensables",
              description:
                "Ces cookies assurent le bon fonctionnement du site et ne peuvent pas être désactivés. Ils permettent, par exemple, la gestion des préférences utilisateur et la sécurisation des connexions.",

              //this field will generate a toggle linked to the 'necessary' category
              linkedCategory: "necessary",
            },
            {
              title: "Mesures de performance",
              description:
                "Ces cookies collectent des données anonymes sur la navigation des utilisateurs afin d'évaluer et d'améliorer les performances du site. Ils nous aident à comprendre quelles pages sont les plus consultées et à optimiser l’expérience utilisateur.",
              linkedCategory: "analytics",
            },
            {
              title: "Plus d’information",
              description:
                "Pour plus d’informations sur la gestion des données par Google Analytics, vous pouvez consulter la politique de confidentialité de Google : https://policies.google.com/privacy",
            },
          ],
        },
      },
    },
  },
});
