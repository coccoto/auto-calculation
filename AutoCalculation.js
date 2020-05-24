class AutoCalculation {

    constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    /**
     * 計算し出力する。
     * 
     * @param {number} rowBalance
     * @param {number} columnBalance
     * @param {object} cellBalance
     * @param {number} tableHeight
     */
    calculation(rowBalance, columnBalance, cellBalance, tableHeight) {

        let cellSum = null
        let cellData = null

        let i = rowBalance

        while (i < tableHeight) {
            cellSum = this.sheet.getRange(i, columnBalance)
            cellData = this.sheet.getRange(i, columnBalance - 1)

            if (! cellData.isBlank()) {
                if (cellData.getBackground() === '#ffffff') {
                    cellSum.setValue(cellBalance.getValue() - cellData.getValue())
                    cellBalance = cellSum

                } else {
                    cellSum.setValue(cellBalance.getValue() + cellData.getValue())
                    cellBalance = cellSum
                }
            }
            i ++
        }
    }

    /**
     * テーブルの幅を取得する。
     * 
     * @return {number}
     */
    tableHeight() {

        let point = null
        let i = 1

        while (point !== '-') {
            point = this.sheet.getRange(i, 1).getValue()
            i ++
        }
        return (i - 1)
    }

    /**
     * エントリーポイント
     * 
     * @param {number} table
     * @return {void}
     */
    execute(table) {

        let rowBalance = 2
        let columnBalance = 4
        let cellBalance = this.sheet.getRange(rowBalance, columnBalance)

        const tableHeight = this.tableHeight()

        let i = 0

        while (i < table) {
            this.calculation(rowBalance + 1, columnBalance, cellBalance, tableHeight)

            columnBalance = columnBalance + 2
            cellBalance = this.sheet.getRange(rowBalance, columnBalance)
            i ++
        }
    }
}