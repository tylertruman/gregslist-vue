<template>
  <div class="houses-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="h in houses" :key="h.id">
          <HouseCard :house="h" />
        </div>
      </div>
    </div>
    <button class="btn btn-fab btn-primary" title="Add House" data-bs-toggle="modal" data-bs-target="#house-form"
      @click="setActiveHouse()"><i class="mdi mdi-plus f-18 text-white"></i></button>
  </div>
  <Modal id="house-form">
    <HouseForm />
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getHouses() {
      try {
        await housesService.getHouses()
      } catch (error) {
        logger.error('[Getting Houses]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getHouses()
    })

    return {
      houses: computed(() => AppState.houses),
      setActiveHouse() {
        housesService.setActiveHouse({})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-fab {
  position: fixed;
  border-radius: 50%;
  bottom: 3rem;
  right: 2rem;
}
</style>
