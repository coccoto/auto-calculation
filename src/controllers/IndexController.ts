// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'
import AssembleModel from '@src/models/AssembleModel'
import ColorManagerModel from '@src/models/ColorManagerModel'
import TableReferenceModel from '@src/models/TableReferenceModel'
import WorkTableModel from '@src/models/WorkTableModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel
    private readonly assembleModel: AssembleModel
    private readonly colorManagerModel: ColorManagerModel
    private readonly tableReferenceModel: TableReferenceModel
    private readonly workTableModel: WorkTableModel

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.sheet, this.errorHandler)
        this.assembleModel = new AssembleModel(this.sheet)
        this.colorManagerModel = new ColorManagerModel(this.sheet)
        this.tableReferenceModel = new TableReferenceModel(this.sheet)
        this.workTableModel = new WorkTableModel(this.sheet, this.queryModel)
    }

    public main(): void {

        const fromIniPosition: Associative = this.workTableModel.getFromIniPosition()
        const workTableSize: Associative = this.workTableModel.getWorkTableSize()

        this.reflectWorkTable(fromIniPosition.row, fromIniPosition.column, workTableSize.height, workTableSize.width)
    }

    private reflectWorkTable(currentRow: number, currentColumn: number, workTableHeight: number, workTableWidth: number): void {

        const selectedWorkTable: Spreadsheet.Range = this.tableReferenceModel.selectTable(currentRow, currentColumn, workTableHeight, workTableWidth)
        const workValues: {[name: string]: string[][]} = this.tableReferenceModel.tableExtraction(selectedWorkTable)

        const lastIndex: number = workValues.values[0].length - 1

        if (workValues.values[0][lastIndex] === '') {
            return
        }
        const isReverseMode: boolean = this.colorManagerModel.isReverseMode(workValues.colors[0][lastIndex - 1])

        const result: {[name: string]: string[][]} = this.assembleModel.main(workValues, lastIndex, isReverseMode)
        this.workTableModel.setWorkTable(selectedWorkTable, result)

        const nextTableColumn = currentColumn + workTableWidth
        this.reflectWorkTable(currentRow, nextTableColumn, workTableHeight, workTableWidth)
    }
}