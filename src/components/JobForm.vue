<template>
  <form @submit.prevent="handleSubmit()" class="job-form">
          <h3 class="text-primary text-center">List Your Job</h3>
          <div class="row card-body">
            <div class="col-12 col-sm-6">
              <label class="form-label my-1" for="jobTitle">Job Title</label>
              <input class="form-control" type="text" id="jobTitle" name="jobTitle" v-model="editable.jobTitle">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label my-1" for="company">Company</label>
              <input class="form-control" type="text" id="company" name="company" v-model="editable.company">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label my-1" for="hours">Hours</label>
              <input class="form-control" type="number" id="hours" name="hours" v-model="editable.hours">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label my-1" for="rate">Hourly Rate</label>
              <input class="form-control" type="number" id="rate" name="rate" v-model="editable.rate">
            </div>
            <div class="col-12">
            <label class="form-label my-1" for="description"> Job Description</label>
            <textarea class="w-100 form-control" name="description" id="description" rows="5" v-model="editable.description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light">Submit</button>
          </div>
        </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { jobsService } from '../services/JobsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    // TODO come back to this in one sec for edits
    watchEffect(() => {
      //               v ... is used to break reference
      if (!AppState.activeJob) { return } // stop
      editable.value = { ...AppState.activeJob }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            jobsService.editJob(editable.value)
          } else {
            jobsService.createJob(editable.value)
          }
          editable.value = {} // clears the form
        } catch (error) {
          logger.error('[Creating or Editing Job]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>