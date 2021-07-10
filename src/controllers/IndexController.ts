// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// modules
import ErrorHandler from '@src/models/common/ErrorHandler'
import TableMeasureModel from '@src/models/common/TableMeasureModel'
import CalculationModel from '@src/models/CalculationModel'
import RefreshModel from '@src/models/RefrachModel'
import SelectWorkTableModel from '@src/models/SelectWorkTableModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet
    private readonly querySheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly tableMeasureModel: TableMeasureModel
    private readonly calculationModel: CalculationModel
    private readonly refreshModel: RefreshModel
    private readonly selectWorkTableModel: SelectWorkTableModel

    public constructor() {

        this.errorHandler = new ErrorHandler()

        this.sheet = SpreadsheetApp.getActiveSheet()
        this.querySheet = SpreadsheetApp.getActiveSheet()

        this.tableMeasureModel = new TableMeasureModel()
        this.calculationModel = new CalculationModel()
        this.refreshModel = new RefreshModel()
        this.selectWorkTableModel = new SelectWorkTableModel()
    }
}