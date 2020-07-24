import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class AutoCalculation {

    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    private calculation(ROW_BALANCE: number, columnBalance: number, cellBalanceValue: number , tableLength: number): void {

        const rowStart: number = ROW_BALANCE + 1
        const columnStart: number = columnBalance - 1
        const numItems: number = 2
        const selectRagen: Spreadsheet.Range = this.sheet.getRange(rowStart, columnStart, tableLength, numItems)

        const values: string[][] = selectRagen.getValues()
        const colors: string[][] = selectRagen.getBackgrounds()

        for (let index in values) {
            if (values[index][0] !== '') {
                if (colors[index][0] === '#ffffff') {
                    values[index][1] = String(cellBalanceValue - Number(values[index][0]))
                } else {
                    values[index][1] = String(cellBalanceValue + Number(values[index][0]))
                }
            }
            if (values[index][1] !== '') {
                cellBalanceValue = Number(values[index][1])
            }
        }

        selectRagen.setValues(values)
    }

    private tableLength(i: number): number {

        let endPoint: string = this.sheet.getRange(i, 1).getValue()

        if (endPoint === '-') {
            return (i - 2 - 1)
        }
        i ++
        return this.tableLength(i)
    }

    public main(NUM_TABLE: number):void {

        const ROW_BALANCE: number = 2
        let columnBalance: number = 5
        let cellBarance: Spreadsheet.Range = this.sheet.getRange(ROW_BALANCE, columnBalance)
        let cellBaranceValue: number = cellBarance.getValue()

        const tableLength: number = this.tableLength(3)

        let i: number = 1

        while (i <= NUM_TABLE) {
            this.calculation(ROW_BALANCE, columnBalance, cellBaranceValue, tableLength)

            columnBalance = columnBalance + 3
            cellBaranceValue = this.sheet.getRange(ROW_BALANCE, columnBalance).getValue()

            i ++
        }
    }
}