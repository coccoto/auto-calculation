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

    private refresh(selected:Spreadsheet.Range, result: {[name: string]: string[][]}): void {

        const values: string[][] = []

        for (let value of result.values) {
            values.push(value)
        }
        selected.setValues(values)
    }

    private calculate(tables: {[name: string]: string[][]}, baranceValue: number): {[name: string]: string[][]} {

        return this.calculator.main(tables, baranceValue)
    }

    private tableRegister(selected: Spreadsheet.Range): {[name: string]: string[][]} {

        const values: string[][] = selected.getValues()
        const colors: string[][] = selected.getBackgrounds()

        return {
            values: values,
            colors: colors,
        }
    }

    private select(rowBalance: number, columnBalance: number, tableLength: number): Spreadsheet.Range {

        const rowFrom: number = rowBalance + 1
        const columnFrom: number = columnBalance - 1
        const rowTo: number = tableLength
        const columnTo: number = 2

        return this.sheet.getRange(rowFrom, columnFrom, rowTo, columnTo)
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
            return
        }
        const tableLength: number = this.tableLength()
        const selected: Spreadsheet.Range = this.select(rowBalance, columnBalance, tableLength)
        const tables: {[name: string]: string[][]} = this.tableRegister(selected)

        const result: {[name: string]: string[][]} = this.calculate(tables, Number(baranceValue))
        this.refresh(selected, result)

        this.main(rowBalance, columnBalance + 3)
    }
}