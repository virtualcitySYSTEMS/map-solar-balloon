import { PluginConfigEditor, VcsUiApp } from '@vcmap/ui';
import { Component } from 'vue';
import SolarBalloonConfigEditor from './ui/SolarFeatureInfoConfigEditor.vue';
import { name, version, mapVersion } from '../package.json';
import SolarFeatureInfo from './solarFeatureInfo.js';
import de from './i18n/de.json';
import en from './i18n/en.json';
import { SolarFeatureInfoPlugin } from './types.js';

export default function solarFeatureInfo(): SolarFeatureInfoPlugin {
  let app: VcsUiApp;
  return {
    get name(): string {
      return name;
    },
    get version(): string {
      return version;
    },
    get mapVersion(): string {
      return mapVersion;
    },
    initialize: (vcsUiApp: VcsUiApp): void => {
      app = vcsUiApp;
      app.featureInfoClassRegistry.registerClass(
        app.dynamicModuleId,
        SolarFeatureInfo.className,
        SolarFeatureInfo,
      );
    },
    getConfigEditors(): PluginConfigEditor<object>[] {
      return [
        {
          component: SolarBalloonConfigEditor as Component,
          title: 'vcsSolarBalloon.editor.editorTitle',
          collectionName: 'featureInfo',
          itemName: SolarFeatureInfo.className,
        },
      ];
    },
    destroy(): void {
      app.featureInfoClassRegistry.unregisterClass(
        app.dynamicModuleId,
        SolarFeatureInfo.className,
      );
    },
    i18n: {
      en,
      de,
    },
  };
}
