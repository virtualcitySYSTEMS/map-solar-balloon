<template>
  <AbstractConfigEditor @submit="apply" v-bind="{ ...$attrs, ...$props }">
    <div class="ma-5">
      <h2>{{ $t('solarInfo.editorHeader1') }}</h2>
      <v-row no-gutters class="mb-2">
        <v-col cols="8">
          <VcsLabel html-for="selectInput" dense>
            {{ $t('solarInfo.graphType') }}
          </VcsLabel>
        </v-col>
        <v-col cols="4">
          <VcsSelect
            id="selectInput"
            :items="selectOptions"
            :item-text="(item) => item.i18n"
            dense
            v-model="selected"
            @change="createChart"
          />
        </v-col>
      </v-row>
      <v-row no-gutters class="d-flex justify-end">
        <v-col cols="8">
          <VcsLabel html-for="selectInput" dense>
            {{ $t('solarInfo.showDataTable') }}
          </VcsLabel>
        </v-col>
        <v-col cols="4">
          <VcsCheckbox
            id="solarInfo-dataTable"
            label=""
            :true-value="true"
            :false-value="false"
            v-model="showDataTable"
          />
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-2">
        <v-col cols="8">
          <VcsLabel html-for="selectInput" dense>
            {{ $t('solarInfo.colors') }}
          </VcsLabel>
        </v-col>
        <v-col cols="4">
          <!--v-select-->
          <VcsSelect
            id="selectColor"
            :items="availableColorScaleNames"
            :item-text="(item) => item.i18n"
            dense
            v-model="selectedColorScheme"
            :height="24"
            append-icon="mdi-chevron-down"
            class="py-1 primary--placeholder"
          >
            <template #item="{ item }">
              <div
                :style="`background: linear-gradient(90deg, ${getColorPalette(item.value)});`"
                class="mr-1 color-preview-box"
              />
              <span>{{ $t(item.i18n) }} </span>
            </template>
            <!--template #prepend>
              <div
                :style="`background: linear-gradient(90deg, ${previewColorScale});`"
                class="color-preview-box"
              />
            </template-->
          </VcsSelect>
        </v-col>
      </v-row>
      <v-divider class="mt-2 mb-2" style="border-top: 2px solid #bbb" />
      <h6>
        <small class="black--text">{{ $t('solarInfo.colorsIndiv') }}</small>
      </h6>
      <VcsFormSection
        :heading="$t('solarInfo.editorHeader1_1')"
        expandable
        class="ma-0"
      >
        <!--VcsFillSelector v-model="styleOptions.fill" /-->
        <h6>
          <small class="red--text">{{ $t('solarInfo.editorHint1') }}</small>
        </h6>
        <v-container fluid class="px-2">
          <v-row no-gutters class="mb-2">
            <v-col cols="8" align-self="center">
              {{ $t('solarInfo.globalRadMonths') }}
            </v-col>
            <v-col cols="4">
              <v-text-field
                :label="globalRad"
                hide-details
                class="ma-0 pb-1 pt-1"
                v-model="globalRad"
                @mouseleave="createChart"
              />
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="8" align-self="center">
              {{ $t('solarInfo.diffuseRadMonths') }}
            </v-col>
            <v-col cols="4">
              <v-text-field
                :label="diffuseRad"
                hide-details
                class="ma-0 pb-1 pt-1"
                v-model="diffuseRad"
                @mouseleave="createChart"
            /></v-col>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="8" align-self="center">
              {{ $t('solarInfo.directRadMonths') }}
            </v-col>
            <v-col cols="4">
              <v-text-field
                :label="directRad"
                hide-details
                class="ma-0 pb-1 pt-1"
                v-model="directRad"
                @mouseleave="createChart"
            /></v-col>
          </v-row>
        </v-container>
      </VcsFormSection>
      <VcsFormSection
        :heading="$t('solarInfo.editorHeader1_2')"
        expandable
        class="ma-0"
      >
        <h6>
          <small class="red--text">{{ $t('solarInfo.editorHint1') }}</small>
        </h6>
        <v-row no-gutters class="ma-2">
          <v-col cols="8" align-self="center">
            {{ $t('solarInfo.globalRadWallsMonths') }}
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="globalWallRad"
              hide-details
              class="ma-0 pb-1 pt-1"
              v-model="globalWallRad"
              @mouseleave="createChart"
          /></v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="8" align-self="center">
            {{ $t('solarInfo.diffuseRadWallsMonths') }}
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="diffuseWallRad"
              hide-details
              class="ma-0 pb-1 pt-1"
              v-model="diffuseWallRad"
              @mouseleave="createChart"
          /></v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="8" align-self="center">
            {{ $t('solarInfo.directRadWallsMonths') }}
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="directWallRad"
              hide-details
              class="ma-0 pb-1 pt-1"
              v-model="directWallRad"
              @mouseleave="createChart"
          /></v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="8" align-self="center">
            {{ $t('solarInfo.globalRadRoofsMonths') }}
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="globalRoofRad"
              hide-details
              class="ma-0 pb-1 pt-1"
              v-model="globalRoofRad"
              @mouseleave="createChart"
          /></v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="8" align-self="center">
            {{ $t('solarInfo.diffuseRadRoofsMonths') }}
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="diffuseRoofRad"
              hide-details
              class="ma-0 pb-1 pt-1"
              v-model="diffuseRoofRad"
              @mouseleave="createChart"
          /></v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="8" align-self="center">
            {{ $t('solarInfo.directRadRoofsMonths') }}
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="directRoofRad"
              hide-details
              class="ma-0 pb-1 pt-1"
              v-model="directRoofRad"
              @mouseleave="createChart"
          /></v-col>
        </v-row>
      </VcsFormSection>
      <v-divider class="mt-2 mb-2" style="border-top: 2px solid #bbb" />
    </div>

    <div class="ma-5">
      <h2>{{ $t('solarInfo.editorHeader2') }}</h2>
      <div id="solarPreview"></div>
    </div>
  </AbstractConfigEditor>
</template>

<script>
  import { VContainer, VRow, VCol, VTextField, VDivider } from 'vuetify/lib';
  import {
    AbstractConfigEditor,
    VcsFormSection,
    VcsSelect,
    VcsLabel,
    VcsCheckbox,
  } from '@vcmap/ui';
  import { getLogger } from '@vcsuite/logger';
  import { ref, inject, computed, watch } from 'vue';
  import ApexCharts from 'apexcharts';
  import { name } from '../../package.json';
  // import { name } from '../../package.json';
  import getDefaultOptions from '../js/defaultOptions.js';
  import colorPalette from '../js/colorPalettes.js';

  export default {
    name: 'SolarBalloonConfigEditor',
    title: 'Solar Balloon Editor',
    components: {
      VContainer,
      VRow,
      VCol,
      AbstractConfigEditor,
      VcsFormSection,
      VTextField,
      VcsSelect,
      VcsLabel,
      VcsCheckbox,
      VDivider,
    },
    props: {
      getConfig: {
        type: Function,
        required: true,
      },
      setConfig: {
        type: Function,
        required: true,
      },
    },

    setup(props) {
      /** @type { import("@vcmap/ui").VcsUiApp } */
      const app = inject('vcsApp');
      const localConfig = ref(undefined);

      //  const plugin = app.plugins.getByKey(name);
      //  const { config } = plugin;
      // console.log(config);
      const defaultOptions = getDefaultOptions();

      const globalRad = ref(defaultOptions.globalColor);
      const diffuseRad = ref(defaultOptions.diffuseColor);
      const directRad = ref(defaultOptions.directColor);
      const globalWallRad = ref(defaultOptions.globalWallColor);
      const diffuseWallRad = ref(defaultOptions.diffuseWallColor);
      const directWallRad = ref(defaultOptions.directWallColor);
      const globalRoofRad = ref(defaultOptions.globalRoofColor);
      const diffuseRoofRad = ref(defaultOptions.diffuseRoofColor);
      const directRoofRad = ref(defaultOptions.directRoofColor);
      const selected = ref(defaultOptions.chartType);
      const showDataTable = ref(defaultOptions.showDataTable);
      const colorScaleNameRef = ref('colorblind');
      const selectedColorScheme = ref(colorScaleNameRef);

      function createChart() {
        // console.log(selected.value);
        let chart = document.getElementById('solarPreview');
        if (chart) {
          chart.innerHTML = '';
        }
        const xAxis = ['Jan', '...', '...', '...', 'Dec'];
        let options;
        if (selected.value === 'Line') {
          options = {
            series: [
              {
                name: app.vueI18n.t('solarInfo.globalRadMonths'), // 'glob. Rad. / Monat', //typmap.get(elm),
                data: [10, 23, 45, 8, 26],
              },
              {
                name: app.vueI18n.t('solarInfo.diffuseRadMonths'), // 'diff. Rad. / Monat', //typmap.get(elm),
                data: [1, 45, 2, 6, 23],
              },
              {
                name: app.vueI18n.t('solarInfo.directRadMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [6, 13, 3, 32, 7],
              },
              {
                name: app.vueI18n.t('solarInfo.globalRadWallsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [20, 20, 20, 20, 20],
              },
              {
                name: app.vueI18n.t('solarInfo.globalRadRoofsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [15, 15, 15, 15, 15],
              },
              {
                name: app.vueI18n.t('solarInfo.diffuseRadWallsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [12, 12, 12, 12, 12],
              },
              {
                name: app.vueI18n.t('solarInfo.diffuseRadRoofsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [10, 10, 10, 10, 10],
              },
              {
                name: app.vueI18n.t('solarInfo.directRadWallsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [30, 30, 30, 30, 30],
              },
              {
                name: app.vueI18n.t('solarInfo.directRadRoofsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [25, 25, 25, 25, 25],
              },
            ],
            colors: [
              globalRad.value,
              diffuseRad.value,
              directRad.value,
              globalWallRad.value,
              globalRoofRad.value,
              diffuseWallRad.value,
              diffuseRoofRad.value,
              directWallRad.value,
              directRoofRad.value,
            ],
            chart: {
              foreColor: '#ccc',
              height: 300,

              type: 'line',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 400,
                animateGradually: {
                  enabled: true,
                  delay: 50,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },
              dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 1,
              },
              zoom: {
                enabled: false,
              },
            },
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
              text: app.vueI18n.t('solarInfo.chartTitle'),
              align: 'left',
            },
            tooltip: {
              theme: 'dark',
            },
            grid: {
              borderColor: '#ccc',
              row2: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: xAxis,
            },
          };
        } else if (selected.value === 'Bar') {
          options = {
            series: [
              {
                name: app.vueI18n.t('solarInfo.globalRadMonths'), // 'glob. Rad. / Monat', //typmap.get(elm),
                data: [10, 23, 45, 8, 26],
              },
              {
                name: app.vueI18n.t('solarInfo.diffuseRadMonths'), // 'diff. Rad. / Monat', //typmap.get(elm),
                data: [1, 45, 2, 6, 23],
              },
              {
                name: app.vueI18n.t('solarInfo.directRadMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [6, 13, 3, 32, 7],
              },
              {
                name: app.vueI18n.t('solarInfo.globalRadWallsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [20, 20, 20, 20, 20],
              },
              {
                name: app.vueI18n.t('solarInfo.globalRadRoofsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [15, 15, 15, 15, 15],
              },
              {
                name: app.vueI18n.t('solarInfo.diffuseRadWallsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [12, 12, 12, 12, 12],
              },
              {
                name: app.vueI18n.t('solarInfo.diffuseRadRoofsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [10, 10, 10, 10, 10],
              },
              {
                name: app.vueI18n.t('solarInfo.directRadWallsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [30, 30, 30, 30, 30],
              },
              {
                name: app.vueI18n.t('solarInfo.directRadRoofsMonths'), // 'direct Rad. / Monat', //typmap.get(elm),
                data: [25, 25, 25, 25, 25],
              },
            ],
            colors: [
              globalRad.value,
              diffuseRad.value,
              directRad.value,
              globalWallRad.value,
              globalRoofRad.value,
              diffuseWallRad.value,
              diffuseRoofRad.value,
              directWallRad.value,
              directRoofRad.value,
            ],
            chart: {
              foreColor: '#ccc',
              height: 300,
              stacked: true,
              type: 'bar',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 400,
                animateGradually: {
                  enabled: true,
                  delay: 50,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },
              zoom: {
                enabled: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '35%',
              },
            },
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
              text: app.vueI18n.t('solarInfo.chartTitle'),
              align: 'left',
            },
            tooltip: {
              theme: 'dark',
            },
            grid: {
              borderColor: '#ccc',
            },
            xaxis: {
              categories: xAxis,
            },
          };
        }

        /*         globalArray.month.forEach((elm) => {
          var data = [10,12,15,14,13,18,55,60,23,88,45,26];
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadMonths'), //'glob. Rad / Monat', //typmap.get(elm),
            data: [10,12,15,14,13,18,55,60,23,88,45,26],
          });
          options.colors.push((globalRad.value));
        });
        globalArray.walls.forEach((elm) => {
          var data = [9,15,15,12,17,2,90,13,5,4,6];
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadWallsMonths'), //'glob. Rad der Wand / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#ffa500')) {
            options.colors.push('#ffa500');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        globalArray.roofs.forEach((elm) => {
          var data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              globalSumRoof += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadRoofsMonths'), //'glob. Rad des Daches / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#ff6e4a')) {
            options.colors.push('#ff6e4a');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.month.forEach((elm) => {
          var data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              diffuseSum += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.diffuseRadMonths'), //'diff. Rad / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes(config.diffuseColor)) {
            options.colors.push(config.diffuseColor);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.walls.forEach((elm) => {
          var data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              diffuseSumWalls += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.diffuseRadWallsMonths'), //'diff. Rad der Wand / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#00fa00')) {
            options.colors.push('#00fa00');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.roofs.forEach((elm) => {
          var data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              diffuseSumRoof += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.diffuseRadRoofsMonths'), //'diff. Rad des Daches / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#ceff00')) {
            options.colors.push('#ceff00');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.month.forEach((elm) => {
          var data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              directSum += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.directRadMonths'), //'dir. Rad / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes(config.directColor)) {
            options.colors.push(config.directColor);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.walls.forEach((elm) => {
          var data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              directSumWalls += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.directRadWallsMonths'), //'dir. Rad der Wand / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#7a7aff')) {
            options.colors.push('#7a7aff');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.roofs.forEach((elm) => {
          var data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              directSumRoof += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.directRadRoofsMonths'), //'dir. Rad des Daches / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#80daeb')) {
            options.colors.push('#80daeb');
          } else {
            options.colors.push(getRandomColor());
          }
        }); */

        chart = new ApexCharts(
          document.getElementById('solarPreview'),
          options,
        );
        chart.render();
      }
      function getColorPalette(scaleName) {
        return colorPalette[scaleName];
      }
      app.localeChanged.addEventListener(() => {
        // console.log('Locale changed', locale);
        createChart();
      });
      watch(
        selectedColorScheme,
        () => {
          // console.log(selectedColorScheme.value);
          const colors = getColorPalette(selectedColorScheme.value);
          globalRad.value = colors[0];
          diffuseRad.value = colors[1];
          directRad.value = colors[2];
          globalWallRad.value = colors[3];
          diffuseWallRad.value = colors[4];
          directWallRad.value = colors[5];
          globalRoofRad.value = colors[6];
          diffuseRoofRad.value = colors[7];
          directRoofRad.value = colors[8];
          setTimeout(() => {
            createChart();
          }, 1);
        },
        { immediate: true },
      );
      props
        .getConfig()
        .then((config) => {
          localConfig.value = { ...config, ...defaultOptions };
          globalRad.value = localConfig.value.globalColor;
          diffuseRad.value = localConfig.value.diffuseColor;
          directRad.value = localConfig.value.directColor;
          globalWallRad.value = localConfig.value.globalWallColor;
          diffuseWallRad.value = localConfig.value.diffuseWallColor;
          directWallRad.value = localConfig.value.directWallColor;
          globalRoofRad.value = localConfig.value.globalRoofColor;
          diffuseRoofRad.value = localConfig.value.diffuseRoofColor;
          directRoofRad.value = localConfig.value.directRoofColor;
          selected.value = localConfig.value.chartType;
          showDataTable.value = localConfig.value.showDataTable;
          createChart();
        })
        .catch((err) => getLogger(name).error(err));
      setTimeout(() => {
        createChart();
      }, 1);

      const apply = async () => {
        // const configuration = await props.getConfig();
        localConfig.value.globalColor = globalRad.value;
        localConfig.value.diffuseColor = diffuseRad.value;
        localConfig.value.directColor = directRad.value;
        localConfig.value.globalWallColor = globalWallRad.value;
        localConfig.value.diffuseWallColor = diffuseWallRad.value;
        localConfig.value.directWallColor = directWallRad.value;
        localConfig.value.globalRoofColor = globalRoofRad.value;
        localConfig.value.diffuseRoofColor = diffuseRoofRad.value;
        localConfig.value.directRoofColor = directRoofRad.value;
        localConfig.value.chartType = selected.value;
        localConfig.value.showDataTable = showDataTable.value;
        await props.setConfig(localConfig.value);
      };

      return {
        // localConfig,
        availableColorScaleNames: Object.keys(colorPalette).map((el) => {
          return { value: el, i18n: `solarInfo.colorNames.${el}` };
        }),
        colorScaleName: computed({
          get: () => colorScaleNameRef.value,
          set(value) {
            colorScaleNameRef.value = value;
          },
        }),
        previewColorScale: computed(() =>
          getColorPalette(selectedColorScheme.value),
        ),
        showDataTable,
        getColorPalette,
        apply,
        globalRad,
        directRad,
        diffuseRad,
        globalWallRad,
        directWallRad,
        diffuseWallRad,
        globalRoofRad,
        directRoofRad,
        diffuseRoofRad,
        selected,
        selectedColorScheme,
        createChart,
        selectOptions: [
          { value: 'Line', i18n: 'solarInfo.charts.Line' },
          { value: 'Bar', i18n: 'solarInfo.charts.Bar' },
        ], // ['Line', 'Bar'],
      };
    },
  };
</script>

<style scoped>
  .color-preview-box {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    box-sizing: content-box;
  }
</style>
