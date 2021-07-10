// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'
import TableMeasureModel from '@src/models/common/TableMeasureModel'
import CalculationModel from '@src/models/CalculationModel'
import RefreshModel from '@src/models/RefrachModel'
import SelectWorkTableModel from '@src/models/SelectWorkTableModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel
    private readonly tableMeasureModel: TableMeasureModel
    private readonly calculationModel: CalculationModel
    private readonly refreshModel: RefreshModel
    private readonly selectWorkTableModel: SelectWorkTableModel

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.errorHandler)
        this.tableMeasureModel = new TableMeasureModel()
        this.calculationModel = new CalculationModel()
        this.refreshModel = new RefreshModel()
        this.selectWorkTableModel = new SelectWorkTableModel()
    }
}