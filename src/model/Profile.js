// variável é um let para ser alterada/atualizada //
let data = {
    name: "Alana",
    avatar: "https://github.com/alanaragusa.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
};

// objeto habilitado para exportar os dados do profile para profilecontroller //
module.exports = {
    get() {
        return data;
    },
    update(newData){
        data = newData;
    }
}