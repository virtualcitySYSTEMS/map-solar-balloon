import { FeatureInfoProps, FeatureInfoViewOptions, VcsPlugin } from '@vcmap/ui';

export type ColorValueHex = `#${string}`;

export type ChartType = 'bar' | 'line';

export type SolarFeatureInfoProps = {
  chartType?: ChartType;
  showDataTable?: boolean;
  globalColor?: ColorValueHex;
  diffuseColor?: ColorValueHex;
  directColor?: ColorValueHex;
};

export type SolarFeatureInfoConfig = FeatureInfoViewOptions &
  SolarFeatureInfoProps;
export type SolarFeatureInfoViewProps = SolarFeatureInfoProps &
  FeatureInfoProps;

export type SolarFeatureInfoComponentAttributes = {
  diffuseRadMonth: number[];
  directRadMonth: number[];
  globalRadMonth: number[];
};

export type PluginState = Record<never, never>;
export type PluginConfig = Record<never, never>;
export type SolarFeatureInfoPlugin = VcsPlugin<PluginConfig, PluginState>;
