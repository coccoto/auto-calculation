import AutoCalculation from '@src/app/AutoCalculation'

const htmlGenerator = (autoCalculation: AutoCalculation) => {
    const html = HtmlService.createTemplateFromFile('notice')
    html.sheetName = autoCalculation.getSheetName()
    return html.evaluate().setTitle('AutoCalculation')
}

global.doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.main()
    return htmlGenerator(autoCalculation)
}

global.AutoCalculation = (): void => {
    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.main()
}