<template>
  <div>
    <div class="header">
      <span style="margin-right: 10px;">搜索用户数</span>
      <svg t="1642930210748" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2160" width="16" height="16"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM512 928c-229.75 0-416-186.25-416-416S282.25 96 512 96s416 186.25 416 416S741.75 928 512 928z" p-id="2161" fill="#8a8a8a" /><path d="M537.64 343.452c47.074 0 83.266-37.528 83.266-78.072 0-32.46-20.832-60.878-62.496-60.878-54.816 0-82.178 44.618-82.178 77.11C475.144 320.132 498.152 343.452 537.64 343.452z" p-id="2162" fill="#8a8a8a" /><path d="M533.162 728.934c-7.648 0-10.914-10.136-3.264-39.55l43.25-166.406c16.386-60.848 10.944-100.398-21.92-100.398-39.456 0-131.458 39.83-211.458 107.798l16.416 27.392c25.246-17.256 67.906-34.762 77.792-34.762 7.648 0 6.56 10.168 0 35.508l-37.746 158.292c-23.008 89.266 1.088 109.538 33.984 109.538 32.864 0 117.808-30.47 195.57-109.632l-18.656-25.34C575.354 716.714 543.05 728.934 533.162 728.934z" p-id="2163" fill="#8a8a8a" /></svg>
    </div>
    <div class="main">
      <span class="title">12321</span>
      <span class="content">17.1<svg v-if="show" t="1642933359385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5977" width="32" height="32"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="5978" /></svg><svg v-else t="1642933237879" style="margin-left: 7px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4944" width="16" height="16"><path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="4945" fill="#d81e06" /></svg></span>
    </div>
    <div class="footer">
      <div ref="charts" class="charts" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      show: true
    }
  },
  mounted() {
    const charts = echarts.init(this.$refs.charts)
    charts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          smooth: 0.6,
          data: [60, 57, 33, 45, 88, 60, 66, 86],
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: '#5470C6'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#5470C6' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ],
      grid: {
        left: -18,
        top: 0,
        right: -20,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
  .charts {
    width: 100%;
    height: 50px;
  }
  .header {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
  }
  .main {
    display: flex;
    align-items: center;
  }
  .main span {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
</style>
