<template>
  <VSheet
    v-bind="{ ...$attrs }"
    :feature-id="featureId"
    :attributes="attributes"
    :balloon-title="attributes.name"
    :balloon-subtitle="attributes.name"
  >
    <div id="solarWerte"></div>
    <!--div id="tableSolar"></div-->
    <div style="margin-left: 1rem; margin-right: 1rem; margin-bottom: 1rem">
      <h2>{{ $t('solarInfo.tableTitle') }}</h2>
      <v-simple-table
        dense
        height="250px"
        width="100%"
        style="margin-top: 1rem"
      >
        <thead>
          <tr>
            <th class="text-left font-weight-bold">
              {{ $t('solarInfo.tableCol1') }}
            </th>
            <th class="text-left font-weight-bold">
              {{ $t('solarInfo.tableCol2') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableAttr" :key="index">
            <td v-if="Object.values(item)[0] !== 0">
              {{ $t('solarInfo.' + [Object.keys(item)[0]]) }}
            </td>
            <td v-if="Object.values(item)[0] !== 0" class="font-weight-bold">
              {{ Object.values(item)[0].toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <!--v-container fluid class="px-2">
      <v-row no-gutters class="mb-2">
        <v-col> featureId: </v-col>
        <v-col>
          {{ featureId }}
        </v-col>
      </v-row>
    </v-container-->
  </VSheet>
</template>

<script>
  import { defineComponent, inject, ref, watch } from 'vue';
  import {
    BalloonComponent,
    VcsButton,
    VcsFormButton,
    VcsFormSection,
    VcsSelect,
    VcsLabel,
  } from '@vcmap/ui';
  import {
    VSheet,
    VCol,
    VContainer,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VRow,
    VIcon,
    VListItemAvatar,
    VSimpleTable,
  } from 'vuetify/lib';
  import ApexCharts from 'apexcharts';
  import { name } from '../../package.json';
  /*   var typMapping = [
    ['globalRadMonths', 'glob. Rad / Monat'],
    ['globalRadWallsMonths', 'glob. Rad on Wall / Month'],
    ['globalRadRoofsMonths', 'glob. Rad on Roof / Month'],
    ['diffuseRadMonths', 'diff. Rad / Monat'],
    ['diffuseRadWallsMonths', 'diff. Rad on Wall / Month'],
    ['diffuseRadRoofsMonths', 'diff. Rad on Roof / Month'],
    ['directRadMonths', 'dir. Rad / Monat'],
    ['directRadWallsMonths', 'dir. Rad on Wall / Month'],
    ['directRadRoofsMonths', 'dir. Rad on Roof / Month'],
  ];
  const typmap = new Map(typMapping); */

  export default defineComponent({
    name: 'SolarInfoComponent',
    props: {
      featureId: {
        type: String,
        required: true,
      },
      attributes: {
        type: Object,
        required: true,
      },
    },
    components: {
      VSheet,
      VCol,
      VRow,
      VContainer,
      VListItemAvatar,
      VIcon,
      VcsButton,
      VcsFormButton,
      VcsFormSection,
      VcsSelect,
      VcsLabel,
      VListItemTitle,
      VListItemContent,
      VListItem,
      BalloonComponent,
      VSimpleTable,
    },

    setup(props) {
      /** @type { import("@vcmap/ui").VcsUiApp } */
      const app = inject('vcsApp');
      const plugin = app.plugins.getByKey(name);
      const { config } = plugin;
      console.log(config);
      const tableAttr = ref([]);
      const theme = ref('light');
      const lightColor = '#535A6C';
      const darkColor = '#ccc';
      const currentColor = ref(lightColor);
      const chartType = ref(config.chartType);
      let globalRad = {};
      let diffuseRad = {};
      let directRad = {};
      let globalArray = [];
      let diffuseArray = [];
      let directArray = [];
      app.localeChanged.addEventListener((locale) => {
        //console.log('Locale changed', locale);
        setup();
      });
      app.themeChanged.addEventListener(() => {
        if (theme.value === 'light') {
          theme.value = 'dark';
          currentColor.value = darkColor;
        } else {
          theme.value = 'light';
          currentColor.value = lightColor;
        }
        setup();
      });

      watch(props, setup, { immediate: true });
      function createChart(
        globalRad,
        diffuseRad,
        directRad,
        globalArray,
        diffuseArray,
        directArray,
      ) {
        var globalSum = 0;
        var diffuseSum = 0;
        var directSum = 0;
        var globalSumRoof = 0;
        var diffuseSumRoof = 0;
        var directSumRoof = 0;
        var globalSumWalls = 0;
        var diffuseSumWalls = 0;
        var directSumWalls = 0;

        var xAxis = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        let options;
        if (chartType.value === 'Line') {
          options = {
            series: [],
            chart: {
              foreColor: currentColor.value,
              height: 400,
              width: 490,
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
            colors: [],
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
            /*    subtitle: {
      text: 'Solare Einstrahlung / Monat [kWh]',
      align: 'left'
    },*/
            title: {
              text: app.vueI18n.t('solarInfo.chartTitle'),
              align: 'left',
            },
            tooltip: {
              theme: 'dark',
            },
            grid: {
              borderColor: currentColor.value,
              row2: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: xAxis,
            },
          };
        } else if (chartType.value === 'Bar') {
          options = {
            series: [],
            chart: {
              foreColor: currentColor.value,
              height: 400,
              width: 490,
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
            colors: [],
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
              borderColor: currentColor.value,
            },
            xaxis: {
              categories: xAxis,
            },
          };
        }

        globalArray.month.forEach((elm) => {
          var data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              globalSum += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadMonths'), //'glob. Rad / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes(config.globalColor)) {
            options.colors.push(config.globalColor);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        globalArray.walls.forEach((elm) => {
          var data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              globalSumWalls += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadWallsMonths'), //'glob. Rad der Wand / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes(config.globaWallColor)) {
            options.colors.push(config.globaWallColor);
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
          if (!options.colors.includes(config.globaRoofColor)) {
            options.colors.push(config.globaRoofColor);
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
          if (!options.colors.includes(config.diffuseWallColor)) {
            options.colors.push(config.diffuseWallColor);
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
          if (!options.colors.includes(config.diffuseRoofColor)) {
            options.colors.push(config.diffuseRoofColor);
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
          if (!options.colors.includes(config.directWallColor)) {
            options.colors.push(config.directWallColor);
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
          if (!options.colors.includes(config.directRoofColor)) {
            options.colors.push(config.directRoofColor);
          } else {
            options.colors.push(getRandomColor());
          }
        });

        const chart = new ApexCharts(
          document.getElementById('solarWerte'),
          options,
        );
        chart.render();
        return [
          { globSum: globalSum },
          { globalSumRoof: globalSumRoof },
          { globalSumWalls: globalSumWalls },
          { diffuseSum: diffuseSum },
          { diffuseSumRoof: diffuseSumRoof },
          { diffuseSumWalls: diffuseSumWalls },
          { directSum: directSum },
          { directSumRoof: directSumRoof },
          { directSumWalls: directSumWalls },
        ];
      }
      function splitSolarAttr(array) {
        var month = array.filter((el) => el.includes('RadMonth'));
        var walls = array.filter(
          (el) => el.includes('RadWalls') && !el.includes('Year'),
        );
        var roofs = array.filter(
          (el) => el.includes('RadRoofs') && !el.includes('Year'),
        );
        var year = array.filter((el) => el.includes('Year'));
        return { month: month, walls: walls, roofs: roofs, year: year };
      }
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      function scanForSolar(globalRad, diffuseRad, directRad, skyview) {
        var uniqueGlobalRadKeys = [
          ...new Set(Object.keys(globalRad).map((el) => el.split('_')[0])),
        ];
        var uniqueDiffuseRadKeys = [
          ...new Set(Object.keys(diffuseRad).map((el) => el.split('_')[0])),
        ];
        var uniqueDirectRadKeys = [
          ...new Set(Object.keys(directRad).map((el) => el.split('_')[0])),
        ];

        globalArray = splitSolarAttr(uniqueGlobalRadKeys);
        diffuseArray = splitSolarAttr(uniqueDiffuseRadKeys);
        directArray = splitSolarAttr(uniqueDirectRadKeys);
        var props = createChart(
          globalRad,
          diffuseRad,
          directRad,
          globalArray,
          diffuseArray,
          directArray,
        );

        tableAttr.value = props.concat(skyview);
      }
      function setup() {
        const raw = props.attributes;
        globalRad = Object.keys(raw)
          .filter((key) => key.includes('globalRad'))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        diffuseRad = Object.keys(raw)
          .filter((key) => key.includes('diffuseRad'))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        directRad = Object.keys(raw)
          .filter((key) => key.includes('directRad'))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        var svfMax = raw.SVF_max || 0;
        var svfMin = raw.SVF_min || 0;
        var svfMean = raw.SVF_med || 0;
        var skyview = [
          { svfMax: svfMax * 100 },
          { svfMin: svfMin * 100 },
          { svfMean: svfMean * 100 },
        ];
        setTimeout(function () {
          var chart = document.getElementById('solarWerte');
          if (chart) {
            chart.innerHTML = '';
          }
          scanForSolar(globalRad, diffuseRad, directRad, skyview);
        }, 1);
        //scanForSolar(globalRad, diffuseRad, directRad, skyview);
      }

      return {
        toggle() {
          active.value = !active.value;
        },
        tableAttr,
      };
    },
  });
</script>

<style scoped>
  table {
    width: 100%;
  }
  th,
  td {
    border: 1px solid;
    padding: 5px;
    text-align: left;
  }
</style>
