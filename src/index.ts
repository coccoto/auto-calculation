import AutoCalculation from '@src/AutoCalculation'

global.AutoCalculation = (): void => {
    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.main()
}