import AutoCalculation from '@src/AutoCalculation'

global.main = (): void => {
    const NUM_TABLES = 5

    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.main(NUM_TABLES)
}