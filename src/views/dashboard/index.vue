<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <Card />
      <Sale style="margin-top: 20px;" />
      <Observe style="margin-top: 20px;" />
    </div>
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Observe
  },
  mounted() {
    this.$store.dispatch('getData')
  }
}
</script>

<style lang="scss" scoped>
</style>
