<template>
  <div class="car-page" v-if="car">
    <div class="my-3" :title="car.make">
      <img class="img-fluid" :src="car.img" alt="">
      <div class="p-2">
        <h4 class="text-center">{{ car.make }} | {{ car.model }} | {{ car.year }}</h4>
        <p>{{ car.description }}</p>
        <p class="text-end text-success m-0">$<b>{{ car.price }}</b></p>
        <section class="row">
            <div class="col-6 text-center">
                <button class="btn btn-primary px-4" @click="editCar(car)" data-bs-toggle="modal" data-bs-target="#car-form">Edit</button>
            </div>
            <div class="col-6 text-center">
                <button class="btn btn-danger" @click="deleteCar(car)">Delete</button>
            </div>
        </section>
      </div>
    </div>
    <Modal id="car-form">
      <CarForm />
    </Modal>
  </div>
  <div v-else>
    Loading Car...
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { carsService } from '../services/CarsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute()

    async function getCarById() {
      try {
        //                                        v magic string
        await carsService.getCarById(route.params.carId)
      } catch (error) {
        logger.error('[Get Car By Id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getCarById()
    })

    return {
      car: computed(() => AppState.activeCar),
      adjustCar(car) {
        carsService.setActiveCar(car)
      },
      async deleteCar(car) {
        try {
          const yes = await Pop.confirm('Delete the car?')
          if (!yes) { return }
          await carsService.deleteCar(car.id)
        } catch (error) {
          logger.error('[Deleting Car]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>