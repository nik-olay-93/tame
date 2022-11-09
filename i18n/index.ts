import i18n from "i18next";
import BackendFs from "i18next-fs-backend";

i18n.use(BackendFs).init({
  fallbackLng: "en",
  supportedLngs: ["en"],
  fallbackNS: "common",
  ns: ["common"],
  backend: {
    loadPath: "./i18n/{{lng}}/{{ns}}.json",
  },
  initImmediate: false,
});

export default i18n;
