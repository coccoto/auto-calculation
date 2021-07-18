// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'
import TableMeasureModel from '@src/models/common/TableMeasureModel'

export default class WorkTableModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel
    private readonly tableMeasureModel: TableMeasureModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.errorHandler)
        this.tableMeasureModel = new TableMeasureModel(this.sheet)
    }

    public getFromIniPosition(): {[key: string]: number} {

        const fromRowIniPosition = Number(this.queryModel.getMasterValue('fromRowIniPosition'))
        const fromColumnIniPosition = Number(this.queryModel.getMasterValue('fromColumnIniPosition'))

        return {
            row: fromRowIniPosition,
            column: fromColumnIniPosition,
        }
    }

    public getWorkTable(row: number, column: number): Spreadsheet.Range {

        const workTableSize: {[key: string]: number} = this.getWorkTableSize()
        return this.sheet.getRange(row, column, workTableSize.height, workTableSize.width)
    }

    private getWorkTableSize(): {[key: string]: number} {

        const workTableHeight: number = this.tableMeasureModel.getHeight()
        const workTableWidth: number = this.getWidth() + 1

        return {
            height: workTableHeight,
            width: workTableWidth,
        }
    }

    public getWidth(): number {

        const fromColumnIniPosition: number = Number(this.queryModel.getMasterValue('fromColumnIniPosition'))
        const toColumnIniPosition: number = Number(this.queryModel.getMasterValue('toColumnIniPosition'))
        return (toColumnIniPosition - fromColumnIniPosition)
    }

    public setWorkTable(selected: Spreadsheet.Range, workValues: {[name: string]: string[][]}): void {

        selected.setValues(workValues.values)
    }
}