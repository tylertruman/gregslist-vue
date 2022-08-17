<template>
  <div class="job-page" v-if="job">
    <div class="my-3" :title="job.jobTitle">
      <div class="p-2">
        <h4 class="text-center">Company: {{job.company}} <br> Hours: {{job.hours}} <br> Rate: ${{job.rate}}</h4>
        <p>{{job.description}}</p>
        <section class="row">
            <div class="col-6 text-center">
                <button class="btn btn-primary px-4" @click="adjustJob(job)" data-bs-toggle="modal" data-bs-target="#job-form">Edit</button>
            </div>
            <div class="col-6 text-center">
                <button class="btn btn-danger" @click="deleteJob(job)">Delete</button>
            </div>
        </section>
      </div>
    </div>
    <Modal id="job-form">
      <JobForm />
    </Modal>
  </div>
  <div v-else>
    Loading Job...
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { jobsService } from '../services/JobsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute()

    async function getJobById() {
      try {
        //                                        v magic string
        await jobsService.getJobById(route.params.jobId)
      } catch (error) {
        logger.error('[Get Job By Id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getJobById()
    })

    return {
      job: computed(() => AppState.activeJob),
      adjustJob(job) {
        jobsService.setActiveJob(job)
      },
      async deleteJob(job) {
        try {
          const yes = await Pop.confirm('Delete the job?')
          if (!yes) { return }
          await jobsService.deleteJob(job.id)
        } catch (error) {
          logger.error('[Deleting Job]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>