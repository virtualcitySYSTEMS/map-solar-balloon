<template>
  <AbstractConfigEditor @submit="apply" v-bind="{ ...$attrs, ...$props }">
    <VcsFormSection
      :heading="$st('vcsSolarBalloon.editor.formSection1')"
      expandable
      :start-open="true"
    >
      <v-row no-gutters>
        <v-col>
          <VcsLabel>
            {{
              `${$st('vcsSolarBalloon.balloon.directRad')} ${$st('vcsSolarBalloon.editor.color')}`
            }}
          </VcsLabel>
        </v-col>
        <v-col class="pr-1">
          <VcsHexColorPicker
            v-model="localConfig.directColor"
            :tooltip="$st('vcsSolarBalloon.editor.colorTooltip')"
            :name="`${$st('vcsSolarBalloon.balloon.directRad')} ${$st('vcsSolarBalloon.editor.color')}`"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <VcsLabel>
            {{
              `${$st('vcsSolarBalloon.balloon.diffuseRad')} ${$st('vcsSolarBalloon.editor.color')}`
            }}
          </VcsLabel>
        </v-col>
        <v-col class="pr-1">
          <VcsHexColorPicker
            v-model="localConfig.diffuseColor"
            :tooltip="$st('vcsSolarBalloon.editor.colorTooltip')"
            :name="`${$st('vcsSolarBalloon.balloon.diffuseRad')} ${$st('vcsSolarBalloon.editor.color')}`"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <VcsLabel>
            {{
              `${$st('vcsSolarBalloon.balloon.globalRad')} ${$st('vcsSolarBalloon.editor.color')}`
            }}
          </VcsLabel>
        </v-col>
        <v-col class="pr-1">
          <VcsHexColorPicker
            v-model="localConfig.globalColor"
            :tooltip="$st('vcsSolarBalloon.editor.colorTooltip')"
            :name="`${$st('vcsSolarBalloon.balloon.globalRad')} ${$st('vcsSolarBalloon.editor.color')}`"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <VcsLabel>
            {{ $st('vcsSolarBalloon.editor.graphType') }}
          </VcsLabel>
        </v-col>
        <v-col class="pr-1">
          <VcsSelect
            :items="graphTypes"
            item-title="title"
            item-value="key"
            v-model="localConfig.chartType"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <VcsLabel>
            {{ $st('vcsSolarBalloon.editor.showDataTable') }}
          </VcsLabel>
        </v-col>
        <v-col class="pr-1">
          <VcsCheckbox v-model="localConfig.showDataTable" />
        </v-col>
      </v-row>
    </VcsFormSection>
    <VcsFormSection
      :heading="$st('vcsSolarBalloon.editor.formSection2')"
      expandable
      :start-open="true"
    >
      <solar-info-component
        :attributes="randomAttributes"
        :show-data-table="localConfig.showDataTable"
        :direct-color="localConfig.directColor"
        :diffuse-color="localConfig.diffuseColor"
        :global-color="localConfig.globalColor"
        :chart-type="localConfig.chartType"
        :graph-height="200"
      />
    </VcsFormSection>
    <v-divider />
  </AbstractConfigEditor>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance, PropType, Ref, ref, toRaw } from 'vue';
  import { VCol, VRow, VDivider } from 'vuetify/components';
  import {
    AbstractConfigEditor,
    VcsCheckbox,
    VcsFormSection,
    VcsLabel,
    VcsSelect,
  } from '@vcmap/ui';
  import {
    SolarFeatureInfoComponentAttributes,
    SolarFeatureInfoConfig,
  } from '../types';
  import solarFeatureInfo from '../solarFeatureInfo';
  import SolarInfoComponent from './SolarFeatureInfoComponent.vue';
  import VcsHexColorPicker from './VcsHexColorPicker.vue';

  const vm = getCurrentInstance()?.proxy;

  const props = defineProps({
    getConfig: {
      type: Function as PropType<() => SolarFeatureInfoConfig>,
      required: true,
    },
    setConfig: {
      type: Function,
      required: true,
    },
  });
  const localConfig: Ref<Required<SolarFeatureInfoConfig>> = ref({
    ...solarFeatureInfo.getDefaultOptions(),
    ...props.getConfig(),
  } as Required<SolarFeatureInfoConfig>);

  const randomArray = (): number[] =>
    Array.from({ length: 12 }, () => Math.floor(Math.random() * 30) + 1);

  const randomAttributes: SolarFeatureInfoComponentAttributes = {
    directRadMonth: randomArray(),
    diffuseRadMonth: randomArray(),
    globalRadMonth: randomArray(),
  };

  const graphTypes = computed(() => [
    {
      key: 'line',
      title: vm?.$st('vcsSolarBalloon.editor.line'),
    },
    {
      key: 'bar',
      title: vm?.$st('vcsSolarBalloon.editor.bar'),
    },
  ]);

  const apply = (): void => {
    props.setConfig(structuredClone(toRaw(localConfig.value)));
  };
</script>

<style scoped></style>
