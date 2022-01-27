<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName">
        <el-tab-pane label="销售额" name="sale" />
        <el-tab-pane label="访问量" name="visite" />
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="data"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        />
      </div>
    </div>
    <div style="margin-top: -40px">
      <el-row :gutter="10">
        <el-col :span="18">
          <div ref="charts" class="charts" />
        </el-col>
        <el-col :span="6">
          <h3>门店{{ activeName === 'sale' ? '销售额' : '访问量' }}排名</h3>
          <ul>
            <li>
              <div class="left">
                <span class="rindex">1</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span class="rindex">2</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span class="rindex">3</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span>4</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span>5</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span>6</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span>7</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
            <li>
              <div class="left">
                <span>8</span>
                <span>肯德基</span>
              </div>
              <span class="value">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeName: 'sale',
      charts: null,
      date: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
    ...mapState({
      listData: state => state.home.list
    })
  },
  watch: {
    listData() {
      this.charts.setOption({
        title: {
          text: '销售额趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.listData.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.listData.orderFullYear
          }
        ]
      })
    },
    activeName(newVal) {
      console.log(this.activeName === 'sale' ? this.listData.orderFullYearAxis : this.listData.orderFullYear)
      this.charts.setOption({
        title: {
          text: this.title + '趋势'
        },
        xAxis: [
          {
            data: this.activeName === 'sale' ? this.listData.orderFullYearAxis : this.listData.userFullYearAxis
          }
        ],
        series: [
          {
            data: this.activeName === 'sale' ? this.listData.orderFullYear : this.listData.userFullYear
          }
        ]
      })
    }
  },
  mounted() {
    // 初始化echarts实例
    this.charts = echarts.init(this.$refs.charts)
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style scoped>
  .left {
    display: flex;
  }
  ul > li {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .rindex {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    list-style: none;
    width: 100%;
    height: 400px;
    padding: 0;
  }
  .charts {
    width: 100%;
    height: 400px;
  }
  .data {
    width: 250px;
  }
  .right {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 24px;
  }
  .el-tabs {
    width: 100%;
    margin-top: -10px;
  }
  span {
    margin-right: 20px;
  }
  .clearfix {
    /* margin: 10px; */
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .clearfix:after {
    display: none;
  }
  .box-card {
    position: relative;
  }
  .box-card /deep/ .el-card__header {
    /* padding: 0; */
    border-bottom: none;
  }
 /* .box-card /deep/ .el-card__header::after {
    border-bottom: none;
    content: "";
    position: absolute;
    left: 0;
    bottom: 73px;
    width: 100%;
    height: 1px;
    background-color: #E4E7ED;
    z-index: 1;
  } */
  .box-card /deep/ .el-tabs__nav-wrap::after {
    height: 1px;
  }
</style>
