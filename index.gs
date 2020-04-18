const autoCalculation = new AutoCalculation(2)

const calculation = () => {
    let i = 0
    let column = 5

    while (i < 5) {
        autoCalculation.execute(column)

        i ++
        column = column + 4
    }
}