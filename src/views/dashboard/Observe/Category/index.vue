<template>
  <div>
    <el-card class="clearfix">
      <div slot="header" class="header">
        <span>销售额类别比</span>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="上海" />
          <el-radio-button label="北京" />
          <el-radio-button label="广州" />
          <el-radio-button label="深圳" />
        </el-radio-group>
      </div>
      <div ref="charts" class="charts" />
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      radio: '上海'
    }
  },
  mounted() {
    const charts = echarts.init(this.$refs.charts)
    charts.setOption({
      title: {
        text: '视频',
        subtext: 1048,
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          itemStyle: {
            // borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: '视频' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    charts.on('mouseover', function(params) {
      // console.log(params)
      const { name, value } = params.data
      this.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>
<style scoped>
  .charts {
    width: 100%;
    height: 300px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /* .clearfix /deep/ .el-card__header {
    padding: 10px 20px;
  } */
</style>
