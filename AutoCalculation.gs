class AutoCalculation {

    /**
     * @param {integer} rowBalance 残高セルの横位置
     */
    constructor(rowBalance) {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.rowBalance = rowBalance
        this.rowTable = rowBalance + 1
        this.num = this.length(this.rowTable)
    }

    /**
     * 表の長さを取得する。
     * 
     * @return {integer}
     */
    length(rowTable) {

        let value = null
        let row = rowTable

        while (value !== '-') {
            value = this.sheet.getRange(row, 1).getValue()
            row ++
        }

        return row = row - 1
    }

    /**
     * セルの初期位置を設定する。
     * 
     * @param {integer} columnBalance 残高セルの縦位置
     * @return {void}
     */
    setCellBalance(columnBalance) {

        this.cellBalance = this.sheet.getRange(this.rowBalance, columnBalance)
    }

    /**
     * セルに情報を書き込む。
     * 
     * @return {void}
     */
    calculation(columnBalance) {

        let cellSum = null
        let cellMinus = null
        let cellPlus = null

        for (let i = this.rowTable; i < this.num; i ++) {

            cellSum = this.sheet.getRange(i, columnBalance)
            cellMinus = this.sheet.getRange(i, columnBalance - 1)
            cellPlus = this.sheet.getRange(i, columnBalance - 2)

            if (! cellPlus.isBlank()) {
                cellSum.setValue(this.cellBalance.getValue() + cellPlus.getValue())
                this.cellBalance = cellSum

            } else if (! cellMinus.isBlank()) {
                cellSum.setValue(this.cellBalance.getValue() - cellMinus.getValue())
                this.cellBalance = cellSum
            }
        }
    }

    /**
     * エントリーポイント
     * 
     * @param {integer} columnBalance 残高セルの縦位置
     * @return {void}
     */
    execute(columnBalance) {

        this.setCellBalance(columnBalance)
        this.calculation(columnBalance)
    }
}