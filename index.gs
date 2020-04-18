const autoCalculation = new AutoCalculation(2)

const tables = 5

const calculation = () => {
    let i = 0
    let column = 5

    while (i < tables) {
        autoCalculation.execute(column)

        i ++
        column = column + 4
    }
}