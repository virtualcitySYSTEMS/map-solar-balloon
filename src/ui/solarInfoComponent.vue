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
      <h2>Jahreswerte im Überblick</h2>
      <v-simple-table
        dense
        height="250px"
        width="100%"
        style="margin-top: 1rem"
      >
        <thead>
          <tr>
            <th class="text-left font-weight-bold">Name</th>
            <th class="text-left font-weight-bold">Wert</th>
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
      const plugin = app.plugins.getByKey('@vcmap/vcs-solar-balloon');
      const { config } = plugin;
      const tableAttr = ref([]);
      watch(props, setup, { immediate: true });
      function createChart(
        globalRad,
        diffuseRad,
        directRad,
        globalArray,
        diffuseArray,
        directArray,
      ) {
        var typMapping = [
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
        const typmap = new Map(typMapping);
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
          'Okt',
          'Nov',
          'Dec',
        ];
        let options = {
          series: [],
          chart: {
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
            zoom: {
              enabled: false,
            },
          },
          colors: [],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },
          /*    subtitle: {
      text: 'Solare Einstrahlung / Monat [kWh]',
      align: 'left'
    },*/
          title: {
            text: 'Solare Einstrahlung / Monat [kWh]',
            align: 'left',
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: xAxis,
          },
        };

        globalArray.month.forEach((elm) => {
          var data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] = value;
              globalSum += value;
            }
          });
          options.series.push({
            name: 'glob. Rad / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#940000')) {
            options.colors.push('#940000');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        globalArray.walls.forEach((elm) => {
          var data = [];
          Object.entries(globalRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              data[Number(key.split('_')[1]) - 1] = value;
              globalSumWalls += value;
            }
          });
          options.series.push({
            name: 'glob. Rad der Wand / Monat', //typmap.get(elm),
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
              data[Number(key.split('_')[1]) - 1] = value;
              globalSumRoof += value;
            }
          });
          options.series.push({
            name: 'glob. Rad des Daches / Monat', //typmap.get(elm),
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
              data[Number(key.split('_')[1]) - 1] = value;
              diffuseSum += value;
            }
          });
          options.series.push({
            name: 'diff. Rad / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#009400')) {
            options.colors.push('#009400');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        diffuseArray.walls.forEach((elm) => {
          var data = [];
          Object.entries(diffuseRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] = value;
              diffuseSumWalls += value;
            }
          });
          options.series.push({
            name: 'diff. Rad der Wand / Monat', //typmap.get(elm),
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
              data[Number(key.split('_')[1]) - 1] = value;
              diffuseSumRoof += value;
            }
          });
          options.series.push({
            name: 'diff. Rad des Daches / Monat', //typmap.get(elm),
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
              data[Number(key.split('_')[1]) - 1] = value;
              directSum += value;
            }
          });
          options.series.push({
            name: 'dir. Rad / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#0000b3')) {
            options.colors.push('#0000b3');
          } else {
            options.colors.push(getRandomColor());
          }
        });
        directArray.walls.forEach((elm) => {
          var data = [];
          Object.entries(directRad).forEach(([key, value]) => {
            if (key.includes(elm)) {
              //console.log(Number(key.split('_')[1])+' :'+value);
              data[Number(key.split('_')[1]) - 1] = value;
              directSumWalls += value;
            }
          });
          options.series.push({
            name: 'dir. Rad der Wand / Monat', //typmap.get(elm),
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
              data[Number(key.split('_')[1]) - 1] = value;
              directSumRoof += value;
            }
          });
          options.series.push({
            name: 'dir. Rad des Daches / Monat', //typmap.get(elm),
            data: data,
          });
          if (!options.colors.includes('#80daeb')) {
            options.colors.push('#80daeb');
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

        var globalArray = splitSolarAttr(uniqueGlobalRadKeys);
        var diffuseArray = splitSolarAttr(uniqueDiffuseRadKeys);
        var directArray = splitSolarAttr(uniqueDirectRadKeys);
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
        var svfMax = raw.SVF_max || 0;
        var svfMin = raw.SVF_min || 0;
        var svfMean = raw.SVF_med || 0;
        var skyview = [
          { svfMax: svfMax * 100 },
          { svfMin: svfMin * 100 },
          { svfMean: svfMean * 100 },
        ];
        setTimeout(function () {
          var chart = document.getElementById('SolarWerte');
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
