const express = require("express");
const routes = express.Router()

const Profile = {
    data: {
    name: "Alana",
    avatar: "https://github.com/alanaragusa.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render("profile", {profile: Profile.data })
        },

        update(req, res) {
            // req.body para pegar os dados // 
            const data = req.body

            // definir quantas semanas tem em um ano - 52 //
            const weeksPerYear = 52

            // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês //
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] )/ 12

            // total de horas trabalhadas na semana //
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // total de horas trabalhadas no mês //
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            // valor da hora //
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour

            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
    {
        id:  1,
        name: "Pizzaria Guloso",
        "daily-hours": 2 ,
        "total-hours": 1 ,
        created_at: Date.now(),
    },
    {
        id:  2,
        name: "OneTwo Project",
        "daily-hours": 3 ,
        "total-hours": 47 ,
        created_at: Date.now(),
    }
    ],

    controllers: {
        index(req, res) {
            
            const updatedJobs = Job.data.map((job) => {
                //ajustes do job //
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
            
                return {
                    ...job, // pegou tudo do objeto job lá de cima //
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })
            
               
            return res.render("index", {jobs: updatedJobs})
            
        },

        create(req, res){
           return res.render("job")
        },

        save(req, res) {
            // req.body = { name: 'job', 'daily-hours': '3', 'total-hours': '3' } //
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atibuindo data de hoje //
            })

            return res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render("job-edit", { job })
        },

        update(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job =>{

                if(Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job){
            //dias para fazer o job //
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // toFixed arredonda o numero //
        
            // data da criaçao do job //
            const createdDate = new Date(job.created_at)
        
            // dias para a entrega do job //
            const dueDay = createdDate.getDate() + Number(remainingDays)
        
            // data exata da entrega do job //
            const dueDateInMs = createdDate.setDate(dueDay)
        
            // calculo dos dias restantes em ms = milisegundo //
            const timeDiffInMs = dueDateInMs - Date.now()
            const dayInMs = 1000 * 60 * 60 * 24
        
            // calculo de dias restantes //
            const dayDiff = Math.floor(timeDiffInMs/dayInMs) // Math.floor arredonda para menos //
        
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

// request and reponse //
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;