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
        this.run(fromIniPosition.row, fromIniPosition.column)
    }

    private run(currentRow: number, currentColumn: number): void {

        const selectedWorkTable: Spreadsheet.Range = this.workTableModel.getWorkTable(currentRow, currentColumn)
        const workValues: {[name: string]: string[][]} = this.tableReferenceModel.TableExtraction(selectedWorkTable)

        const workTableWidth: number = this.workTableModel.getWidth()

        if (workValues.values[0][workTableWidth] === '') {
            return
        }
        const isReverseMode: boolean = this.colorManagerModel.isReverseMode(workValues.values[0][workTableWidth - 1])

        const result: {[name: string]: string[][]} = this.assembleModel.main(workValues, isReverseMode)
    }
}