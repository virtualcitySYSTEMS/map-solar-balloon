import { name, version, mapVersion } from '../package.json';
import SolarBalloonConfigEditor from './ui/solarBalloonConfigEditor.vue';
import solarFeatureInfo from './js/solarFeatureInfo.js';
import getDefaultOptions from './js/defaultOptions.js';
import de from './i18n/de.json';
import en from './i18n/en.json';

/**
 * @typedef {Object} PluginState
 * @property {any} prop
 */

/**
 * Implementation of VcsPlugin interface. This function should not throw! Put exceptions in initialize instead.
 * @param {T} options - the configuration of this plugin instance, passed in from the app.
 * @param {string} baseUrl - the absolute URL from which the plugin was loaded (without filename, ending on /)
 * @returns {import("@vcmap/ui/src/vcsUiApp").VcsPlugin<T, PluginState>}
 * @template {Object} T
 */
export default function plugin(options, baseUrl) {
  const defaultOptions = getDefaultOptions();
  const config = { ...defaultOptions, ...options };
  // eslint-disable-next-line no-console
  console.log(config, baseUrl);
  return {
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
      // eslint-disable-next-line no-console
      vcsUiApp.featureInfoClassRegistry.registerClass(
        name,
        solarFeatureInfo.className,
        solarFeatureInfo,
      );

      // eslint-disable-next-line no-console
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
      if (this.config.globalColor !== defaultOptions.globalColor) {
        options.globalColor = this.config.globalColor;
      }
      if (this.config.diffuseColor !== defaultOptions.diffuseColor) {
        options.diffuseColor = this.config.diffuseColor;
      }
      if (this.config.directColor !== defaultOptions.directColor) {
        options.directColor = this.config.directColor;
      }
      if (this.config.globalWallColor !== defaultOptions.globalWallColor) {
        options.globalWallColor = this.config.globalWallColor;
      }
      if (this.config.diffuseWallColor !== defaultOptions.diffuseWallColor) {
        options.diffuseWallColor = this.config.diffuseWallColor;
      }
      if (this.config.globalRoofColor !== defaultOptions.globalRoofColor) {
        options.globalRoofColor = this.config.globalRoofColor;
      }
      if (this.config.directWallColor !== defaultOptions.directWallColor) {
        options.directWallColor = this.config.directWallColor;
      }
      if (this.config.diffuseRoofColor !== defaultOptions.diffuseRoofColor) {
        options.diffuseRoofColor = this.config.diffuseRoofColor;
      }
      if (this.config.directRoofColor !== defaultOptions.directRoofColor) {
        options.directRoofColor = this.config.directRoofColor;
      }
      if (this.config.chartType !== defaultOptions.chartType) {
        options.chartType = this.config.chartType;
      }
      if (this.config.showDataTable !== defaultOptions.showDataTable) {
        options.showDataTable = this.config.showDataTable;
      }
      return options;
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
    i18n: { en, de },
    /**
     * components for configuring the plugin and/ or custom items defined by the plugin
     * @returns {Array<import("@vcmap/ui").PluginConfigEditor>}
     */
    getConfigEditors() {
      return [
        {
          component: SolarBalloonConfigEditor,
          collectionName: 'featureInfo',
          itemName: solarFeatureInfo.className,
        },
      ];
    },
    destroy() {
      // eslint-disable-next-line no-console
      console.log('hook to cleanup');
    },
  };
}
