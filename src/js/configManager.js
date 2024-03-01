export function getConfig(pluginOptions, defaultOptions) {
  const globalColor = pluginOptions.globalColor || defaultOptions.globalColor;
  const diffuseColor =
    pluginOptions.diffuseColor || defaultOptions.diffuseColor;
  const directColor = pluginOptions.directColor || defaultOptions.directColor;
  const chartType = pluginOptions.chartType || defaultOptions.chartType;
  const globalWallColor =
    pluginOptions.globalWallColor || defaultOptions.globalWallColor;
  const diffuseWallColor =
    pluginOptions.diffuseWallColor || defaultOptions.diffuseWallColor;
  const directWallColor =
    pluginOptions.directWallColor || defaultOptions.directWallColor;
  const globalRoofColor =
    pluginOptions.globalRoofColor || defaultOptions.globalRoofColor;
  const diffuseRoofColor =
    pluginOptions.diffuseRoofColor || defaultOptions.diffuseRoofColor;
  const directRoofColor =
    pluginOptions.directRoofColor || defaultOptions.directRoofColor;
  return {
    pluginConfig: {
      globalColor,
      diffuseColor,
      directColor,
      globalWallColor,
      diffuseWallColor,
      directWallColor,
      globalRoofColor,
      diffuseRoofColor,
      directRoofColor,
      chartType,
    },
  };
}
