import AutoCalculation from '@src/app/AutoCalculation'

const MASTER_POSITION: {[name: string]: number[]} = {
    INI_POSITION_FROM: [
        2, // row
        3, // column
    ],
    INI_POSITION_TO: [
        2, // row
        4, // column
    ],
}

const run = (): void => {
    const autoCalculation: AutoCalculation = new AutoCalculation()
    autoCalculation.setMaster(MASTER_POSITION)
    autoCalculation.main()
}

const htmlGenerator = (): GoogleAppsScript.HTML.HtmlOutput => {
    const html = HtmlService.createTemplateFromFile('notice')
    return html.evaluate().setTitle('AutoCalculation')
}

global.AutoCalculation = (): void => {
    run()
}

global.doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
    run()
    return htmlGenerator()
}