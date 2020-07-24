import AutoCalculation from '@src/AutoCalculation'

global.main = (): void => {
    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.main()
}