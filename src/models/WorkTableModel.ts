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

        const fromWorkRowPosition = Number(this.queryModel.getIniValue('fromWorkRowPosition'))
        const fromWorkColumnPosition = Number(this.queryModel.getIniValue('fromWorkColumnPosition'))

        return {
            row: fromWorkRowPosition,
            column: fromWorkColumnPosition,
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
        const headerHeight: number = Number(this.queryModel.getIniValue('fromWorkRowPosition'))
        return sheetSize.height - headerHeight
    }

    private getWidth(): number {

        const fromWorkColumnPosition: number = Number(this.queryModel.getIniValue('fromWorkColumnPosition'))
        const toWorkColumnPosition: number = Number(this.queryModel.getIniValue('toWorkColumnPosition'))
        return (toWorkColumnPosition - fromWorkColumnPosition + 1)
    }

    public setWorkTable(selected: Spreadsheet.Range, workValues: {[name: string]: string[][]}): void {

        selected.setValues(workValues.values)
    }
}