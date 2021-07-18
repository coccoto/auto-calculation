// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'

export default class TableReferenceModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.errorHandler)
    }

    public TableExtraction(selected: Spreadsheet.Range): {[name: string]: string[][]} {

        const values: string[][] = selected.getValues()
        const colors: string[][] = selected.getBackgrounds()
        
        return {
            values: values,
            colors: colors,
        }
    }
}