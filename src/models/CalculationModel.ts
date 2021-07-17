// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'
import WorkTableModel from '@src/models/WorkTableModel'

export default class CalculationModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel
    private readonly workTableModel: WorkTableModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.errorHandler)
        this.workTableModel = new WorkTableModel(this.sheet)
    }

    public main(): void {

        const fromRowIniPosition = Number(this.queryModel.getMasterValue('fromRowIniPosition'))
        const fromColumnIniPosition = Number(this.queryModel.getMasterValue('fromColumnIniPosition'))

        this.assemble(fromRowIniPosition, fromColumnIniPosition)
    }

    private assemble(currentRow: number, currentColumn: number,): void {

        this.workTableModel.getWorkTable(currentRow, currentColumn)
    }
}