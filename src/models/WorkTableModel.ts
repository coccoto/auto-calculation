// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type QueryModel from '@src/models/common/QueryModel'

export default class WorkTableModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet, queryModel: QueryModel) {

        this.sheet = sheet

        this.queryModel = queryModel
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

        const sheetSize: {[key: string]: number} = this.queryModel.getSheetSize()
        const headerHeight: number = Number(this.queryModel.getIniValue('fromRowIniPosition'))
        return sheetSize.height - headerHeight
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