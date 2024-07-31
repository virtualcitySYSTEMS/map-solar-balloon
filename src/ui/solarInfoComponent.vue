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
    <div
      style="margin-left: 1rem; margin-right: 1rem; margin-bottom: 1rem"
      v-if="showDataTable"
    >
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
  import { VSheet, VSimpleTable } from 'vuetify/lib';
  import ApexCharts from 'apexcharts';
  // import { name } from '../../package.json';
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
      chartType: {
        type: String,
        required: true,
      },
      globalColor: {
        type: String,
        required: true,
      },
      diffuseColor: {
        type: String,
        required: true,
      },
      directColor: {
        type: String,
        required: true,
      },
      globalWallColor: {
        type: String,
        required: true,
      },
      diffuseWallColor: {
        type: String,
        required: true,
      },
      globalRoofColor: {
        type: String,
        required: true,
      },
      directWallColor: {
        type: String,
        required: true,
      },
      diffuseRoofColor: {
        type: String,
        required: true,
      },
      directRoofColor: {
        type: String,
        required: true,
      },

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
      VSimpleTable,
    },

    setup(props) {
      /** @type { import("@vcmap/ui").VcsUiApp } */
      const app = inject('vcsApp');
      /*       const plugin = app.plugins.getByKey(name);
      const { config } = plugin;
      console.log(config); */
      const tableAttr = ref([]);
      const theme = ref('light');
      const lightColor = '#535A6C';
      const darkColor = '#ccc';
      const currentColor = ref(lightColor);
      const chartType = ref(props.chartType);
      const showDataTable = ref(props.showDataTable);
      const globalColor = ref(props.globalColor);
      const diffuseColor = ref(props.diffuseColor);
      const directColor = ref(props.directColor);
      const globalWallColor = ref(props.globalWallColor);
      const diffuseWallColor = ref(props.diffuseWallColor);
      const globalRoofColor = ref(props.globalRoofColor);
      const directWallColor = ref(props.directWallColor);
      const diffuseRoofColor = ref(props.diffuseRoofColor);
      const directRoofColor = ref(props.directRoofColor);
      /*       let globalRad = {};
      let diffuseRad = {};
      let directRad = {};
      let globalArray = [];
      let diffuseArray = [];
      let directArray = []; */
      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      function createChart(
        globalRad,
        diffuseRad,
        directRad,
        globalArray,
        diffuseArray,
        directArray,
      ) {
        let globalSum = 0;
        let diffuseSum = 0;
        let directSum = 0;
        let globalSumRoof = 0;
        let diffuseSumRoof = 0;
        let directSumRoof = 0;
        let globalSumWalls = 0;
        let diffuseSumWalls = 0;
        let directSumWalls = 0;

        const xAxis = [
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
    }, */
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
          const data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              globalSum += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadMonths'), // 'glob. Rad / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(globalColor.value)) {
            options.colors.push(globalColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        globalArray.walls.forEach((elm) => {
          const data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              globalSumWalls += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadWallsMonths'), // 'glob. Rad der Wand / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(globalWallColor.value)) {
            options.colors.push(globalWallColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        globalArray.roofs.forEach((elm) => {
          const data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              globalSumRoof += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.globalRadRoofsMonths'), // 'glob. Rad des Daches / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(globalRoofColor.value)) {
            options.colors.push(globalRoofColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.month.forEach((elm) => {
          const data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              diffuseSum += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.diffuseRadMonths'), // 'diff. Rad / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(diffuseColor.value)) {
            options.colors.push(diffuseColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.walls.forEach((elm) => {
          const data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              diffuseSumWalls += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.diffuseRadWallsMonths'), // 'diff. Rad der Wand / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(diffuseWallColor.value)) {
            options.colors.push(diffuseWallColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.roofs.forEach((elm) => {
          const data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              diffuseSumRoof += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.diffuseRadRoofsMonths'), // 'diff. Rad des Daches / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(diffuseRoofColor.value)) {
            options.colors.push(diffuseRoofColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.month.forEach((elm) => {
          const data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              directSum += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.directRadMonths'), // 'dir. Rad / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(directColor.value)) {
            options.colors.push(directColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.walls.forEach((elm) => {
          const data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              directSumWalls += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.directRadWallsMonths'), // 'dir. Rad der Wand / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(directWallColor.value)) {
            options.colors.push(directWallColor.value);
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.roofs.forEach((elm) => {
          const data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              // console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] =
                Math.round(value * 100) / 100;
              directSumRoof += value;
            }
          });
          options.series.push({
            name: app.vueI18n.t('solarInfo.directRadRoofsMonths'), // 'dir. Rad des Daches / Monat', //typmap.get(elm),
            data,
          });
          if (!options.colors.includes(directRoofColor.value)) {
            options.colors.push(directRoofColor.value);
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
          { globalSumRoof },
          { globalSumWalls },
          { diffuseSum },
          { diffuseSumRoof },
          { diffuseSumWalls },
          { directSum },
          { directSumRoof },
          { directSumWalls },
        ];
      }
      function splitSolarAttr(array) {
        const month = array.filter((el) => el.includes('RadMonth'));
        const walls = array.filter(
          (el) => el.includes('RadWalls') && !el.includes('Year'),
        );
        const roofs = array.filter(
          (el) => el.includes('RadRoofs') && !el.includes('Year'),
        );
        const year = array.filter((el) => el.includes('Year'));
        return { month, walls, roofs, year };
      }

      function scanForSolar(globalRad, diffuseRad, directRad, skyview) {
        const uniqueGlobalRadKeys = [
          ...new Set(Object.keys(globalRad).map((el) => el.split('_')[0])),
        ];
        const uniqueDiffuseRadKeys = [
          ...new Set(Object.keys(diffuseRad).map((el) => el.split('_')[0])),
        ];
        const uniqueDirectRadKeys = [
          ...new Set(Object.keys(directRad).map((el) => el.split('_')[0])),
        ];

        const globalArray = splitSolarAttr(uniqueGlobalRadKeys);
        const diffuseArray = splitSolarAttr(uniqueDiffuseRadKeys);
        const directArray = splitSolarAttr(uniqueDirectRadKeys);
        const properties = createChart(
          globalRad,
          diffuseRad,
          directRad,
          globalArray,
          diffuseArray,
          directArray,
        );

        tableAttr.value = properties.concat(skyview);
      }
      function setup() {
        const raw = props.attributes;
        const globalRad = Object.keys(raw)
          .filter((key) => key.includes('globalRad'))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        const diffuseRad = Object.keys(raw)
          .filter((key) => key.includes('diffuseRad'))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        const directRad = Object.keys(raw)
          .filter((key) => key.includes('directRad'))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        const svfMax = raw.SVF_max || 0;
        const svfMin = raw.SVF_min || 0;
        const svfMean = raw.SVF_med || 0;
        const skyview = [
          { svfMax: svfMax * 100 },
          { svfMin: svfMin * 100 },
          { svfMean: svfMean * 100 },
        ];
        setTimeout(() => {
          const chart = document.getElementById('solarWerte');
          if (chart) {
            chart.innerHTML = '';
          }
          scanForSolar(globalRad, diffuseRad, directRad, skyview);
        }, 1);
        // scanForSolar(globalRad, diffuseRad, directRad, skyview);
      }
      app.localeChanged.addEventListener(() => {
        // console.log('Locale changed', locale);
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
      return {
        showDataTable,
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
