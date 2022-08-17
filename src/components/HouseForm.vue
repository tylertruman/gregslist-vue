<template>
  <form @submit.prevent="handleSubmit()" class="house-form">
          <h3 class="text-primary text-center">List Your House</h3>
          <div class="row card-body">
            <div class="col-12 col-md-4">
              <label class="form-label my-1" for="levels">Levels</label>
              <input class="form-control" type="number" id="levels" name="levels" v-model="editable.levels">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label my-1" for="bedrooms">Bedrooms</label>
              <input class="form-control" type="number" id="bedrooms" name="bedrooms" v-model="editable.bedrooms">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label my-1" for="year">Year Built</label>
              <input class="form-control" type="number" id="year" name="year" v-model="editable.year">
            </div>
            <div class="col-12 col-md-6 pt-2">
            <label class="form-label my-1" for="bathrooms">Bathrooms</label>
            <input class="form-control" type="number" min="1" id="bathrooms" name="bathrooms" v-model="editable.bathrooms">
            </div>
            <div class="col-12 col-md-6 pt-2">
            <label class="form-label my-1" for="price">Price</label>
            <input class="form-control" type="number" min="1" id="price" name="price" v-model="editable.price">
            </div>
            <div class="col-12 pt-2">
            <label class="form-label my-1" for="img">Image</label>
            <input class="form-control" type="text" id="img" name="img" v-model="editable.img">
            </div>
            <div class="col-12 pt-2">
            <label class="form-label my-1" for="description">Description</label>
            <textarea class="w-100 form-control" name="description" id="description" rows="5" v-model="editable.description"></textarea>
            </div>
            <div class="col-12">
            <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light">Submit</button>
            </div>
          </div>
        </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    // TODO come back to this in one sec for edits
    watchEffect(() => {
      //               v ... is used to break reference
      if (!AppState.activeHouse) { return } // stop
      editable.value = { ...AppState.activeHouse }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            housesService.editHouse(editable.value)
          } else {
            housesService.createHouse(editable.value)
          }
          editable.value = {} // clears the form
        } catch (error) {
          logger.error('[Creating or Editing House]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>