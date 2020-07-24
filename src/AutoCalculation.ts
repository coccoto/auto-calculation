import Calculator from '@src/Calculator'
// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class AutoCalculation {

    private calculator: Calculator
    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.calculator = new Calculator()
        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    private calculate(tables: object, baranceValue: number) {

        this.calculator.main(tables, baranceValue)
    }

    private tableRegister(selected: Spreadsheet.Range): object {

        const values: string[][] = selected.getValues()
        const colors: string[][] = selected.getBackgrounds()

        return {
            values: values,
            colors: colors,
        }
    }

    private select(rowBalance: number, columnBalance: number, tableLength: number): Spreadsheet.Range {

        const rowFrom: number = rowBalance + 1
        const rowTo: number = tableLength
        const columnFrom: number = columnBalance - 1
        const columnTo: number = 2
        return this.sheet.getRange(rowFrom, columnFrom, columnTo, rowTo)
    }

    private tableLength(i: number = 3): number {

        let endPoint: string = this.sheet.getRange(i, 1).getValue()

        if (endPoint === '-') {
            return (i - 2 - 1)
        }
        i ++
        return this.tableLength(i)
    }

    public main(rowBalance: number = 2, columnBalance: number = 5): void {

        let cellBarance: Spreadsheet.Range = this.sheet.getRange(rowBalance, columnBalance)
        let baranceValue: string = cellBarance.getValue()

        if (baranceValue === '') {
            console.log('END')
            return
        }
        console.log('CONTINUE')
        const tableLength: number = this.tableLength()
        const selected: Spreadsheet.Range = this.select(rowBalance, columnBalance, tableLength)
        const tables: object = this.tableRegister(selected)

        this.calculate(tables, Number(baranceValue))
        this.main(rowBalance, columnBalance + 3)
    }
}