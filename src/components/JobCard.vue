<template>
  <div class="hover-card selectable my-3" :title="job.jobTitle">
    <router-link :to="{ name: 'Job', params: { jobId: job.id } }">
      <div class="text-center text-dark big rounded d-flex justify-content-center"><h4 class="align-self-center">{{job.jobTitle}}</h4></div>
    </router-link>
  </div>
</template>


<script>
import { Job } from '../models/Job.js';
import { jobsService } from '../services/JobsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    job: { type: Job, required: true }
  },
  setup() {
    return {
      editJob(job) {
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
.hover-card {
  transition: all .15s linear;

  &:hover {
    transform: translateY(2px);
    border-radius: 10px;
  }
}

.big {
    height: 100px;
    background-color: rgb(225, 245, 255);
}
</style>