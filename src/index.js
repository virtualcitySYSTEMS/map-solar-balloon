import { name, version, mapVersion } from '../package.json';
import SolarBalloonConfigEditor from './ui/solarBalloonConfigEditor.vue';
import solarFeatureInfo from './js/solarFeatureInfo.js';
import getDefaultOptions from './js/defaultOptions.js';
import { getConfig } from './js/configManager.js';
import deepEqual from 'fast-deep-equal';

/**
 * @typedef {Object} PluginState
 * @property {any} prop
 */

/**
 * Implementation of VcsPlugin interface. This function should not throw! Put exceptions in initialize instead.
 * @param {T} config - the configuration of this plugin instance, passed in from the app.
 * @param {string} baseUrl - the absolute URL from which the plugin was loaded (without filename, ending on /)
 * @returns {import("@vcmap/ui/src/vcsUiApp").VcsPlugin<T, PluginState>}
 * @template {Object} T
 */
export default function plugin(config, baseUrl) {
  // eslint-disable-next-line no-console
  console.log(config, baseUrl);
  return {
    //config,
    /** @returns {import("./configManager").pluginConfig} */
    get config() {
      return config;
    },

    get name() {
      return name;
    },
    get version() {
      return version;
    },
    get mapVersion() {
      return mapVersion;
    },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     * @param {PluginState=} state
     * @returns {Promise<void>}
     */
    initialize: async (vcsUiApp, state) => {
      const { pluginConfig } = getConfig(config, getDefaultOptions());
      config = pluginConfig;

      // eslint-disable-next-line no-console
      vcsUiApp.featureInfoClassRegistry.registerClass(
        name,
        solarFeatureInfo.className,
        solarFeatureInfo,
      );

      console.log(
        'Called before loading the rest of the current context. Passed in the containing Vcs UI App ',
        vcsUiApp,
        state,
      );
    },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     * @returns {Promise<void>}
     */
    onVcsAppMounted: async (vcsUiApp) => {
      // eslint-disable-next-line no-console
      console.log(
        'Called when the root UI component is mounted and managers are ready to accept components',
        vcsUiApp,
      );
    },
    /**
     * should return all default values of the configuration
     * @returns {T}
     */
    getDefaultOptions,
    /**
     * should return the plugin's serialization excluding all default values
     * @returns {T}
     */
    toJSON() {
      // eslint-disable-next-line no-console
      console.log('Called when serializing this plugin instance');
      const defaultOptions = getDefaultOptions();
      const flatConfig = {
        globalColor: config.globalColor,
        diffuseColor: config.diffuseColor,
        directColor: config.directColor,
      };
      const customOptions = Object.keys(flatConfig).reduce((acc, key) => {
        if (!deepEqual(defaultOptions[key], flatConfig[key])) {
          acc[key] = flatConfig[key];
        }
        return acc;
      }, {});

      return flatConfig;
    },
    /**
     * should return the plugins state
     * @param {boolean} forUrl
     * @returns {PluginState}
     */
    getState(forUrl) {
      // eslint-disable-next-line no-console
      console.log('Called when collecting state, e.g. for create link', forUrl);
      return {
        prop: '*',
      };
    },
    i18n: {
      en: {
        solarInfo: {
          editorHeader1: 'Settings of graph representatiom',
          editorHint1:
            'Please type in here HEX-colors, like #FF7F50 (max. 6 digits)',
          editorHeader2: 'Graph preview',
          editorHeader1_1: 'Setting of sum values (global, direct, diffuse)',
          editorHeader1_2: 'color settings for themat. surfaces',
          graphType: 'graph type',
          balloonTitle: 'Solar data',
          chartTitle: 'Solar irradiation / Month [kWh]',
          tableTitle: 'Overview of yearly values',
          tableCol1: 'name',
          tableCol2: 'value',
          globalRadMonths: 'glob. Rad / Month',
          globalRadWallsMonths: 'glob. Rad on Wall / Month',
          globalRadRoofsMonths: 'glob. Rad on Roof / Month',
          diffuseRadMonths: 'diff. Rad / Month',
          diffuseRadWallsMonths: 'diff. Rad on Wall / Month',
          diffuseRadRoofsMonths: 'diff. Rad on Roof / Month',
          directRadMonths: 'dir. Rad / Month',
          directRadWallsMonths: 'dir. Rad on Wall / Month',
          directRadRoofsMonths: 'dir. Rad on Roof / Month',
          globSum: 'Sum global radiation [kwh]',
          directSum: 'Sum direct radiation [kwh]',
          diffuseSum: 'Sum diffuse radiation [kwh]',
          svfMax: 'maximum Skyview-Factor [%]',
          svfMean: 'mean Skyview-Factor [%]',
          svfMin: 'minimum Skyview-Factor [%]',
        },
      },
      de: {
        solarInfo: {
          editorHeader1: 'Einstellung für die Graphdarstellung',
          editorHint1:
            'Bitte tragen sie hier nur HEX-Farben ein, im Stil #FF7F50 (max. 6 Zeichen)',
          editorHeader2: 'Graphvorschau',
          graphType: 'Graphtyp',
          editorHeader1_1:
            'Einstellungen für Summenwerte (global, direct, diffuse)',
          editorHeader1_2: 'Farbeinstellungen für themat. Flächen',
          balloonTitle: 'Solardaten',
          chartTitle: 'Solare Einstrahlung / Monat [kWh]',
          tableTitle: 'Jahreswerte im Überblick',
          tableCol1: 'Name',
          tableCol2: 'Wert',
          globalRadMonths: 'glob. Rad / Monat',
          globalRadWallsMonths: 'glob. Rad der Wand / Monat',
          globalRadRoofsMonths: 'glob. Rad des Daches / Monat',
          diffuseRadMonths: 'diff. Rad / Monat',
          diffuseRadWallsMonths: 'diff. Rad der Wand / Monat',
          diffuseRadRoofsMonths: 'diff. Rad des Daches / Monat',
          directRadMonths: 'dir. Rad / Monat',
          directRadWallsMonths: 'dir. Rad der Wand / Monat',
          directRadRoofsMonths: 'dir. Rad des Daches / Monat',
          globSum: 'Summe der globalen Einstrahlung [kwh]',
          directSum: 'Summe der direkten Einstrahlung [kwh]',
          diffuseSum: 'Summe der diffusen Einstrahlung [kwh]',
          svfMax: 'maximaler Skyview-Faktor [%]',
          svfMean: 'durchschnttl. Skyview-Faktor [%]',
          svfMin: 'minimaler Skyview-Faktor [%]',
        },
      },
    },
    /**
     * components for configuring the plugin and/ or custom items defined by the plugin
     * @returns {Array<import("@vcmap/ui").PluginConfigEditor>}
     */
    getConfigEditors() {
      return [{ component: SolarBalloonConfigEditor }];
    },
    destroy() {
      // eslint-disable-next-line no-console
      console.log('hook to cleanup');
    },
  };
}
