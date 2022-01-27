<template>
  <div class="card-content">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail count="126506" title="总销售额">
            <template slot="charts">
              <span style="margin-right: 10px;">周同比&nbsp;56.7%&nbsp;<svg t="1642933359385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5977" width="32" height="32"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="5978" /></svg></span>
              <span>日同比&nbsp;19.96%&nbsp;<svg t="1642933237879" style="margin-left: 7px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4944" width="16" height="16"><path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="4945" fill="#d81e06" /></svg></span>
            </template>
            <template slot="footer">
              <span>日销售额 ¥123456</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail count="88460" title="访问量">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 ¥123456</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail count="88460" title="支付笔数">
            <template slot="charts">
              <barCharts />
            </template>
            <template slot="footer">
              <span>转化率 64%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail count="78%" title="运营活动效果" class="footer">
            <template slot="charts">
              <progressCharts />
            </template>
            <template slot="footer">
              <span style="margin-right: 10px;">周同比&nbsp;56.7%&nbsp;<svg t="1642933359385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5977" width="32" height="32"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="5978" /></svg></span>
              <span>日同比&nbsp;19.96%&nbsp;<svg t="1642933237879" style="margin-left: 7px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4944" width="16" height="16"><path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="4945" fill="#d81e06" /></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
  components: {
    Detail,
    LineChart,
    barCharts,
    progressCharts
  }
}
</script>

<style scoped>
  .card-content >>> .card-charts span, .card-content >>> .card-charts {
    display: flex;
    align-items: center;
  }
  .footer >>> .card-footer span, .footer >>> .card-footer {
    display: flex;
    align-items: center;
  }

   .footer /deep/ .card-footer {
     padding-top: 5px;
   }
</style>
