// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'

export default class TableMeasureModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.errorHandler)
    }

    public getHeight(row: number = 1, column: number = 1): number {

        this.errorHandler.checkLimit(row)

        if (this.isPeriodPoint(row, column)) {
            return (row --)
        }
        row ++
        return this.getHeight(row, column)
    }

    public getWidth(row: number = 1, column: number = 1): number {

        this.errorHandler.checkLimit(column)

        if (this.isPeriodPoint(row, column)) {
            return (column --)
        }
        column ++
        return this.getWidth(row, column)
    }

    private isPeriodPoint(row: number, column: number): boolean {

        const currentPosition: string = this.sheet.getRange(row, column).getValue()
        const periodPoint: string = this.queryModel.getMasterValue('periodPoint')

        if (currentPosition === periodPoint) {
            return true
        }
        return false
    }
}