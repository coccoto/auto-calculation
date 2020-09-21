import AutoCalculation from '@src/app/AutoCalculation'

global.doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.main()
    return HtmlService.createHtmlOutputFromFile('notice')
}