export default class IndexService {

    private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet

    public constructor() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    }

    /**
     * 入力テーブルの区切り (tablePeriodPoint) までの高さを取得する
     * 区切り行の高さは含まれないので注意すること
     */
    public getInputTableHeight(startRow: number): number {
        const tablePeriodPoint = '-'
        const sheetRowList = this.sheet.getRange('A' + String(startRow) + ':A').getValues()

        const inputTableHeight: number = sheetRowList.findIndex((sheetValueList) => {
            if (sheetValueList[0] === tablePeriodPoint) {
                return true
            }
        })
        return inputTableHeight
    }

    /**
     * テーブルの値を再計算して取得する
     */
    public calculateExpenseTracker(inputTableRowList: string[][]): string[][] {
        let currentBalance: number = 0

        inputTableRowList.forEach((valueList, index) => {
            // 収支セルに入力された値を取得する
            const incomeAndExpenseCellValue: string = valueList[valueList.length - 2]
            // 合計セルに入力された値を取得する
            const balanceCellValue: string = valueList[valueList.length - 1]

            // 現在行が１行目の場合
            if (index === 0) {
                currentBalance = Number(balanceCellValue)
                return
            }

            // 収支列に値が入力されている場合
            if (incomeAndExpenseCellValue !== '') {
                // 合計列に計算結果を入力する
                inputTableRowList[index][valueList.length - 1] = String(currentBalance - Number(incomeAndExpenseCellValue))
                currentBalance = Number(inputTableRowList[index][valueList.length - 1])
                return
            }
            // 合計列に値が入力されている場合
            if (balanceCellValue !== '') {
                // 収支列に計算結果を入力する
                inputTableRowList[index][valueList.length - 2] = String(currentBalance - Number(balanceCellValue))
                currentBalance = Number(balanceCellValue)
                return
            }
        })
        return inputTableRowList
    }
}
