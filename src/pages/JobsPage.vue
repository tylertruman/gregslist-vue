<template>
  <div class="jobs-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="j in jobs" :key="j.id">
          <JobCard :job="j" />
        </div>
      </div>
    </div>
    <button class="btn btn-fab btn-primary" title="Add Job" data-bs-toggle="modal" data-bs-target="#job-form"
      @click="setActiveJob()"><i class="mdi mdi-plus f-18 text-white"></i></button>
  </div>
  <Modal id="job-form">
    <JobForm />
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { jobsService } from '../services/JobsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getJobs() {
      try {
        await jobsService.getJobs()
      } catch (error) {
        logger.error('[Getting Jobs]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getJobs()
    })

    return {
      jobs: computed(() => AppState.jobs),
      setActiveJob() {
        jobsService.setActiveJob({})
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