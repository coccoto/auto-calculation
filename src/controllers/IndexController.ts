// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import AssembleModel from '@src/models/AssembleModel'
import ColorManagerModel from '@src/models/ColorManagerModel'
import RefreshModel from '@src/models/RefrachModel'
import TableReferenceModel from '@src/models/TableReferenceModel'
import WorkTableModel from '@src/models/WorkTableModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet

    private readonly assembleModel: AssembleModel
    private readonly colorManagerModel: ColorManagerModel
    private readonly refreshModel: RefreshModel
    private readonly tableReferenceModel: TableReferenceModel
    private readonly workTableModel: WorkTableModel

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.assembleModel = new AssembleModel(this.sheet)
        this.colorManagerModel = new ColorManagerModel(this.sheet)
        this.refreshModel = new RefreshModel(this.sheet)
        this.tableReferenceModel = new TableReferenceModel(this.sheet)
        this.workTableModel = new WorkTableModel(this.sheet)
    }

    public main(): void {

        const fromIniPosition: {[key: string]: number} = this.workTableModel.getFromIniPosition()

        const workTableSize: {[key: string]: number} = this.workTableModel.getWorkTableSize()
        workTableSize.width = workTableSize.width

        this.reflectWorkTable(fromIniPosition.row, fromIniPosition.column, workTableSize.height, workTableSize.width)
    }

    private reflectWorkTable(currentRow: number, currentColumn: number, workTableHeight: number, workTableWidth: number): void {

        const selectedWorkTable: Spreadsheet.Range = this.tableReferenceModel.selectTable(currentRow, currentColumn, workTableHeight, workTableWidth)
        const workValues: {[name: string]: string[][]} = this.tableReferenceModel.tableExtraction(selectedWorkTable)

        if (workValues.values[0][workTableWidth - 1] === '') {
            return
        }
        const isReverseMode: boolean = this.colorManagerModel.isReverseMode(workValues.colors[0][workTableWidth - 1])

        const result: {[name: string]: string[][]} = this.assembleModel.main(workValues, isReverseMode)
        this.workTableModel.setWorkTable(selectedWorkTable, result)

        const nextTableColumn = currentColumn + workTableWidth
        this.reflectWorkTable(currentRow, nextTableColumn, workTableHeight, workTableWidth)
    }
}