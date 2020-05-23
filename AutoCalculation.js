class AutoCalculation {

    constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    /**
     * 計算を実行する。
     * 
     * @param {number} rowBalance
     * @param {number} columnBalance
     * @param {object} cellBalance
     * @param {number} rowEnd
     * @return {void}
     */
    calculation(rowBalance, columnBalance, cellBalance, rowEnd) {

        let cellSum = null
        let cellMinus = null
        let cellPlus = null

        for (let i = rowBalance + 1; i < rowEnd; i ++) {
            cellSum = this.sheet.getRange(i, columnBalance)
            cellMinus = this.sheet.getRange(i, columnBalance - 1)
            cellPlus = this.sheet.getRange(i, columnBalance - 2)

            if (! cellMinus.isBlank()) {
                cellSum.setValue(cellBalance.getValue() - cellMinus.getValue())
                cellBalance = cellSum

            } else if (! cellPlus.isBlank()) {
                cellSum.setValue(cellBalance.getValue() + cellPlus.getValue())
                cellBalance = cellSum
            }
        }
    }

    /**
     * 表の長さを取得する。
     * 
     * @return {number}
     */
    rowEnd() {

        let value = null
        let row = 1

        while (value !== '-') {
            value = this.sheet.getRange(row, 1).getValue()
            row ++
        }
        return (row - 1)
    }

    /**
     * 残高セルを取得する。
     */
    setCellBalance(rowBalance, columnBalance) {

        return this.sheet.getRange(rowBalance, columnBalance)
    }

    /**
     * エントリーポイント
     * 
     * @param {number} rowBalance
     * @param {number} columnBalance
     * @param {number} tables
     * @return {void}
     */
    execute(rowBalance, columnBalance, tables) {

        let cellBalance = this.setCellBalance(rowBalance, columnBalance)
        let rowEnd = this.rowEnd()

        let addColumnBalance = columnBalance - 1

        for (let i = 0; i < tables; i ++) {
            this.calculation(rowBalance, columnBalance, cellBalance, rowEnd)

            columnBalance = columnBalance + addColumnBalance
            cellBalance = this.setCellBalance(rowBalance, columnBalance)
        }
    }
}