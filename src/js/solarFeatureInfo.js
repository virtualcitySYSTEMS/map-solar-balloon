import { AbstractFeatureInfoView } from '@vcmap/ui';
import SolarInfoComponent from '../ui/solarInfoComponent.vue';

export default class solarFeatureInfo extends AbstractFeatureInfoView {
  static get className() {
    return 'SolarFeatureInfo';
  }

  constructor() {
    super(
      { name: 'SolarFeatureInfo', title: 'solarInfo.balloonHeader' },
      SolarInfoComponent,
    );
    this._window.position = { width: '500px' };
  }
}
