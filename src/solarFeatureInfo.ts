import {
  AbstractFeatureInfoView,
  FeatureInfoEvent,
  FeatureInfoProps,
  VcsUiApp,
  WindowComponentOptions,
} from '@vcmap/ui';
import { Layer } from '@vcmap/core';
import { Cesium3DTileFeature } from '@vcmap-cesium/engine';
import { Component } from 'vue';
import SolarInfoComponent from './ui/SolarFeatureInfoComponent.vue';
import {
  ChartType,
  ColorValueHex,
  SolarFeatureInfoComponentAttributes,
  SolarFeatureInfoConfig,
  SolarFeatureInfoViewProps,
} from './types.js';

class SolarFeatureInfo extends AbstractFeatureInfoView {
  private defaultOptions: SolarFeatureInfoConfig;

  private readonly directColor: ColorValueHex | undefined;

  private readonly diffuseColor: ColorValueHex | undefined;

  private readonly globalColor: ColorValueHex | undefined;

  private readonly chartType: ChartType | undefined;

  private readonly showDataTable: boolean | undefined;

  static get className(): string {
    return 'SolarFeatureInfo';
  }

  static getDefaultOptions(): SolarFeatureInfoConfig {
    return {
      ...super.getDefaultOptions(),
      globalColor: '#FF7F50',
      diffuseColor: '#00FFFF',
      directColor: '#B8860B',
      chartType: 'line',
      showDataTable: true,
    };
  }

  constructor(options: SolarFeatureInfoConfig) {
    super(
      options,
      SolarInfoComponent as Component<FeatureInfoProps, unknown, unknown>,
    );
    this.defaultOptions = SolarFeatureInfo.getDefaultOptions();

    this.globalColor =
      options.globalColor !== undefined
        ? options.globalColor
        : this.defaultOptions.globalColor;
    this.diffuseColor =
      options.diffuseColor !== undefined
        ? options.diffuseColor
        : this.defaultOptions.diffuseColor;
    this.directColor =
      options.directColor !== undefined
        ? options.directColor
        : this.defaultOptions.directColor;
    this.chartType =
      options.chartType !== undefined
        ? options.chartType
        : this.defaultOptions.chartType;
    this.showDataTable =
      options.showDataTable !== undefined
        ? options.showDataTable
        : this.defaultOptions.showDataTable;
  }

  getAttributes(
    feature: Cesium3DTileFeature,
  ): SolarFeatureInfoComponentAttributes {
    const featureAttributes = super.getAttributes(feature) as Record<
      string,
      unknown
    >;
    const diffuseRadMonth: number[] = [];
    const directRadMonth: number[] = [];
    const globalRadMonth: number[] = [];

    for (let month = 1; month <= 12; month++) {
      const diffuseKey = `diffuseRadMonths_${month}`;
      const directKey = `directRadMonths_${month}`;
      const globalKey = `globalRadMonths_${month}`;

      if (diffuseKey in featureAttributes) {
        const diffuseValue = Number(featureAttributes[diffuseKey]);
        if (!Number.isNaN(diffuseValue)) {
          diffuseRadMonth.push(diffuseValue);
        }
      }

      if (directKey in featureAttributes) {
        const directValue = Number(featureAttributes[directKey]);
        if (!Number.isNaN(directValue)) {
          directRadMonth.push(directValue);
        }
      }

      if (globalKey in featureAttributes) {
        const globalValue = Number(featureAttributes[globalKey]);
        if (!Number.isNaN(globalValue)) {
          globalRadMonth.push(globalValue);
        }
      }
    }

    return {
      diffuseRadMonth,
      directRadMonth,
      globalRadMonth,
    };
  }

  getProperties(
    { feature }: FeatureInfoEvent,
    layer: Layer,
  ): SolarFeatureInfoViewProps {
    const properties = super.getProperties({ feature }, layer);
    return {
      ...properties,
      globalColor: this.globalColor,
      directColor: this.directColor,
      diffuseColor: this.diffuseColor,
      showDataTable: this.showDataTable,
      chartType: this.chartType,
    };
  }

  getWindowComponentOptions(
    app: VcsUiApp,
    featureInfo: FeatureInfoEvent,
    layer: Layer,
  ): WindowComponentOptions {
    const options = super.getWindowComponentOptions(app, featureInfo, layer);
    options.position = { width: '500px' };
    return options;
  }

  toJSON(): SolarFeatureInfoConfig {
    const config: SolarFeatureInfoConfig = super.toJSON();
    if (this.globalColor !== this.defaultOptions.globalColor) {
      config.globalColor = this.globalColor;
    }
    if (this.diffuseColor !== this.defaultOptions.diffuseColor) {
      config.diffuseColor = this.diffuseColor;
    }
    if (this.directColor !== this.defaultOptions.directColor) {
      config.directColor = this.directColor;
    }
    if (this.chartType !== this.defaultOptions.chartType) {
      config.chartType = this.chartType;
    }
    if (this.showDataTable !== this.defaultOptions.showDataTable) {
      config.showDataTable = this.showDataTable;
    }
    return config;
  }
}

export default SolarFeatureInfo;
