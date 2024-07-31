import { AbstractFeatureInfoView } from '@vcmap/ui';
import SolarInfoComponent from '../ui/solarInfoComponent.vue';
import defaultOptions from './defaultOptions.js';

export default class solarFeatureInfo extends AbstractFeatureInfoView {
  static get className() {
    return 'SolarFeatureInfo';
  }

  /*   constructor(options) {
    super(
      { name: 'SolarFeatureInfo', title: 'solarInfo.balloonHeader' },
      options,
      SolarInfoComponent,
    );
    this._window.position = { width: '500px' };
  } */

  // { name: 'SolarFeatureInfo', title: 'solarInfo.balloonHeader' },
  constructor(options) {
    super(options, SolarInfoComponent);
    this.chartType = options.chartType || defaultOptions.chartType;
    this.showDataTable = options.showDataTable || defaultOptions.showDataTable;
    this.globalColor = options.globalColor || defaultOptions.globalColor;
    this.diffuseColor = options.diffuseColor || defaultOptions.diffuseColor;
    this.directColor = options.directColor || defaultOptions.directColor;
    this.globalWallColor =
      options.globalWallColor || defaultOptions.globalWallColor;
    this.diffuseWallColor =
      options.diffuseWallColor || defaultOptions.diffuseWallColor;
    this.directWallColor =
      options.directWallColor || defaultOptions.directWallColor;
    this.globalRoofColor =
      options.globalRoofColor || defaultOptions.globalRoofColor;
    this.diffuseRoofColor =
      options.diffuseRoofColor || defaultOptions.diffuseRoofColor;
    this.directRoofColor =
      options.directRoofColor || defaultOptions.directRoofColor;

    this._window.position = { width: '500px' };
  }

  getProperties({ feature }, layer) {
    const props = super.getProperties({ feature }, layer);
    // const options = super.toJSON();
    return {
      ...props,
      chartType: this.chartType, // 'chartType',
      showDataTable: this.showDataTable,
      globalColor: this.globalColor, // 'globalColor',
      diffuseColor: this.diffuseColor, // 'diffuseColor',
      directColor: this.directColor, // 'directColor',
      globalWallColor: this.globalWallColor, // 'globalWallColor',
      diffuseWallColor: this.diffuseWallColor, // 'diffuseWallColor',
      directWallColor: this.directWallColor, // 'directWallColor',
      globalRoofColor: this.globalRoofColor, // 'globalRoofColor',
      diffuseRoofColor: this.diffuseRoofColor, // 'diffuseRoofColor',
      directRoofColor: this.directRoofColor, // 'directRoofColor',
    };
  }

  toJSON() {
    const options = super.toJSON();
    if (this.chartType !== defaultOptions.chartType) {
      options.chartType = this.chartType;
    }
    if (this.showDataTable !== defaultOptions.showDataTable) {
      options.showDataTable = this.showDataTable;
    }
    if (this.globalColor !== defaultOptions.globalColor) {
      options.globalColor = this.globalColor;
    }
    if (this.diffuseColor !== defaultOptions.diffuseColor) {
      options.diffuseColor = this.diffuseColor;
    }
    if (this.directColor !== defaultOptions.directColor) {
      options.directColor = this.directColor;
    }
    if (this.globalWallColor !== defaultOptions.globalWallColor) {
      options.globalWallColor = this.globalWallColor;
    }
    if (this.diffuseWallColor !== defaultOptions.diffuseWallColor) {
      options.diffuseWallColor = this.diffuseWallColor;
    }
    if (this.globalRoofColor !== defaultOptions.globalRoofColor) {
      options.globalRoofColor = this.globalRoofColor;
    }
    if (this.directWallColor !== defaultOptions.directWallColor) {
      options.directWallColor = this.directWallColor;
    }
    if (this.diffuseRoofColor !== defaultOptions.diffuseRoofColor) {
      options.diffuseRoofColor = this.diffuseRoofColor;
    }
    if (this.directRoofColor !== defaultOptions.directRoofColor) {
      options.directRoofColor = this.directRoofColor;
    }
    return options;
  }
}
