<template>
  <v-sheet>
    <v-container class="px-2">
      <VueApexCharts
        :key="chartKey"
        :options="options"
        :series="series"
        :height="graphHeight"
      />
      <v-table v-if="props.showDataTable" density="compact">
        <thead>
          <tr>
            <th>
              <b>{{ $st('vcsSolarBalloon.balloon.tableCol1') }}</b>
            </th>
            <th>
              <b>{{ $st('vcsSolarBalloon.balloon.tableCol2') }}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableSums" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.sum }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
  import { VSheet, VContainer, VTable } from 'vuetify/components';
  import VueApexCharts from 'vue3-apexcharts';
  import { computed, getCurrentInstance, PropType, ref, watch } from 'vue';
  import { useTheme } from 'vuetify';
  import {
    ChartType,
    ColorValueHex,
    SolarFeatureInfoComponentAttributes,
  } from '../types.js';

  const props = defineProps({
    chartType: {
      type: String as PropType<ChartType>,
      required: true,
    },
    showDataTable: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    directColor: {
      type: String as PropType<ColorValueHex>,
      required: true,
    },
    diffuseColor: {
      type: String as PropType<ColorValueHex>,
      required: true,
    },
    globalColor: {
      type: String as PropType<ColorValueHex>,
      required: true,
    },
    attributes: {
      type: Object as PropType<SolarFeatureInfoComponentAttributes>,
      required: true,
    },
    graphHeight: {
      type: Number as PropType<number>,
      default: 500,
    },
  });
  const vm = getCurrentInstance()?.proxy;
  const theme = useTheme();
  const chartKey = ref(0);

  const xAxis = [
    vm?.$st('vcsSolarBalloon.balloon.months.jan'),
    vm?.$st('vcsSolarBalloon.balloon.months.feb'),
    vm?.$st('vcsSolarBalloon.balloon.months.mar'),
    vm?.$st('vcsSolarBalloon.balloon.months.apr'),
    vm?.$st('vcsSolarBalloon.balloon.months.may'),
    vm?.$st('vcsSolarBalloon.balloon.months.jun'),
    vm?.$st('vcsSolarBalloon.balloon.months.jul'),
    vm?.$st('vcsSolarBalloon.balloon.months.aug'),
    vm?.$st('vcsSolarBalloon.balloon.months.sep'),
    vm?.$st('vcsSolarBalloon.balloon.months.oct'),
    vm?.$st('vcsSolarBalloon.balloon.months.nov'),
    vm?.$st('vcsSolarBalloon.balloon.months.dec'),
  ];

  const options = computed(() => {
    return {
      chart: {
        id: 'SolarFeatureInfoGraph',
        type: props.chartType,
        stacked: true,
        animations: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: [props.directColor, props.diffuseColor, props.globalColor],
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        strokeWidth: 0,
        hover: {
          size: 6,
        },
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      title: {
        text: vm?.$st('vcsSolarBalloon.balloon.chartTitle'),
        align: 'left',
      },
      theme: {
        mode: theme.global.name.value,
      },
      xaxis: {
        categories: xAxis,
      },
    };
  });

  const series = computed(() => {
    return [
      {
        name: vm?.$st('vcsSolarBalloon.balloon.directRad'),
        data: props.attributes?.directRadMonth,
      },
      {
        name: vm?.$st('vcsSolarBalloon.balloon.diffuseRad'),
        data: props.attributes?.diffuseRadMonth,
      },
      {
        name: vm?.$st('vcsSolarBalloon.balloon.globalRad'),
        data: props.attributes?.globalRadMonth,
      },
    ];
  });

  const tableSums = computed(() => [
    {
      name: vm?.$st('vcsSolarBalloon.balloon.directRad'),
      sum: Math.round(
        props.attributes.directRadMonth.reduce((acc, val) => acc + val, 0),
      ),
    },
    {
      name: vm?.$st('vcsSolarBalloon.balloon.diffuseRad'),
      sum: Math.round(
        props.attributes.diffuseRadMonth.reduce((acc, val) => acc + val, 0),
      ),
    },
    {
      name: vm?.$st('vcsSolarBalloon.balloon.globalRad'),
      sum: Math.round(
        props.attributes.globalRadMonth.reduce((acc, val) => acc + val, 0),
      ),
    },
  ]);

  watch(
    () => [series.value, options.value],
    () => {
      chartKey.value += 1;
    },
    { deep: true },
  );
</script>

<style scoped></style>
