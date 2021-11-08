const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
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

        // pedindo para o update do model atualizar os dados //
        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
}