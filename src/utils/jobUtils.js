module.exports = {
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
    
        // restam x dias //
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}