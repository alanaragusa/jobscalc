const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get(); 
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        
        // total de horas por dia de cada job em progress //
        let jobTotalHours = 0


        const updatedJobs = jobs.map((job) => {
            //ajustes do job //
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress' // definição do status //

            statusCount[status] += 1; // somando a quantidade de status //
            
            // total de horas por dia de cada job em progress //
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job, // pegou tudo do objeto job lá de cima //
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });
         
        // quantidade de horas que quero trabalhar (profile) - horas/dia de cada job em progress //
        const freeHours = profile["hours-per-day"] - jobTotalHours;


        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    },
};