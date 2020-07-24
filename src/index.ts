import AutoCalculation from '@src/AutoCalculation'

global.main = (): void => {
    const NUM_TABLE = 5

    const autoCalculation: any = new AutoCalculation()
    autoCalculation.main(NUM_TABLE)
}