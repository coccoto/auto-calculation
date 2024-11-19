// services
import IndexService from '@/services/IndexService'
// utils
import SheetReader from '@/utils/SheetReader'

export default class IndexController {

    private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet
    private readonly config: {[key: string]: string}
    private readonly indexService: IndexService

    public constructor() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
        this.config = SheetReader.getSheetValue('config')
        this.indexService = new IndexService()
    }

    public main(): void {
        this.calculateInputTable()
    }

    /**
     * テーブルに処理対象の年月を入力する
     */
    private calculateInputTable(startColumn: number = 3): void {
        const startRow: number = 2
        // 入力テーブルの高さ
        const inputTableHeight: number = this.indexService.getInputTableHeight(startRow)
        // 入力テーブルの幅
        const inputTableWidth: number = Number(this.config.inputTableWidth)

        // 入力テーブルの情報を連想配列で取得する
        const inputTableRange: GoogleAppsScript.Spreadsheet.Range = this.sheet.getRange(startRow, startColumn, inputTableHeight, inputTableWidth)
        const inputTableRowList: string[][] = inputTableRange.getValues()
    
        // １行目の残高セルに値がない場合、計算処理を終了する
        const firstBalanceCellValue: string = inputTableRowList[0][inputTableRowList[0].length - 1]
        if (firstBalanceCellValue === '') {
            return
        }

        // 値を再計算した結果を入力テーブルに再入力する
        const calculatedInputTableRowList: string[][] = this.indexService.calculateExpenseTracker(inputTableRowList)
        inputTableRange.setValues(calculatedInputTableRowList)

        // 再帰処理
        this.calculateInputTable(startColumn + inputTableWidth)
    }
}
