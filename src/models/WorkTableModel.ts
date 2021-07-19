// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'

export default class WorkTableModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.errorHandler)
    }

    public getFromIniPosition(): {[key: string]: number} {

        const fromRowIniPosition = Number(this.queryModel.getIniValue('fromRowIniPosition'))
        const fromColumnIniPosition = Number(this.queryModel.getIniValue('fromColumnIniPosition'))

        return {
            row: fromRowIniPosition,
            column: fromColumnIniPosition,
        }
    }

    public getWorkTableSize(): {[key: string]: number} {

        const workTableHeight: number = this.getHeight()
        const workTableWidth: number = this.getWidth()

        return {
            height: workTableHeight,
            width: workTableWidth,
        }
    }

    private getHeight(): number {

        const sheetSize: {[key: string]: number} = this.queryModel.getSheetSize(this.sheet.getSheetName())
        const headerHeight: number = Number(this.queryModel.getIniValue('fromRowIniPosition'))
        const workTableHeight: number = sheetSize.height - headerHeight
        return workTableHeight
    }

    private getWidth(): number {

        const fromColumnIniPosition: number = Number(this.queryModel.getIniValue('fromColumnIniPosition'))
        const toColumnIniPosition: number = Number(this.queryModel.getIniValue('toColumnIniPosition'))

        return (toColumnIniPosition - fromColumnIniPosition + 1)
    }

    public setWorkTable(selected: Spreadsheet.Range, workValues: {[name: string]: string[][]}): void {

        selected.setValues(workValues.values)
    }
}