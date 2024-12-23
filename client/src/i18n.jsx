import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        appName: "ToDo App",
      },
      overviewToolbar: {
        create: "create",
        all: "all",
        active: "active",
        archived: "archived",
      },
      itemToolbar: {
        add: "add",
        addmember: "Add a member",
        removemember: "Remove a member",
        removeuser: "Remove yourself",
      },
      user: {
        users: "Members",
        owner: "owner",
        members: "No members",
      },
    },
  },
  cs: {
    translation: {
      navbar: {
        appName: "Aplikační Úkolovník",
      },
      overviewToolbar: {
        create: "vytvořit",
        all: "vše",
        active: "aktivní",
        archived: "archivované",
      },
      itemToolbar: {
        add: "Přidat",
        addmember: "Přidat člena",
        removemember: "Vykopnout člena",
        removeuser: "Vykouknu se sám",
      },
      user: {
        users: "Účastníci",
        owner: "Vlastník",
        members: "Žádné účastníci",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
