// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import CalculationModel from '@src/models/CalculationModel'
import RefreshModel from '@src/models/RefrachModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet

    private readonly calculationModel: CalculationModel
    private readonly refreshModel: RefreshModel

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.calculationModel = new CalculationModel(this.sheet)
        this.refreshModel = new RefreshModel(this.sheet)
    }

    public main(): void {

        this.calculationModel.main()
    }
}