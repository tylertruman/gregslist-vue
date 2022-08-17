import { AppState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { api } from "./AxiosService.js";

class JobsService{
    async editJob(jobData) {
        let res = await api.put(`/api/jobs/${jobData.id}`, jobData)
        let job = new Job(res.data)
        let jobIndex = AppState.jobs.findIndex(j => j.id == jobData.id)
        AppState.jobs.splice(jobIndex, 1, job)
    }

    async getJobs() {
        let res = await api.get('/api/jobs')
        AppState.jobs = res.data.map(j => new Job(j))
    }

    async createJob(jobFormData){
        let res = await api.post('/api/jobs', jobFormData)
        let job = new Job(res.data)
        AppState.jobs = [...AppState.jobs, job]
    }

    async deleteJob(jobId){
        let url = `/api/jobs/${jobId}`
        await api.delete(url)
        AppState.jobs = AppState.jobs.filter(j => j.id != id)
    }

    setActiveJob(job){
        AppState.activeJob = job
    }

    async getJobById(jobId){
        const res = await api.get(`/api/jobs/${jobId}`)
        AppState.activeJob = new Job(res.data)
    }
}

export const jobsService = new JobsService()