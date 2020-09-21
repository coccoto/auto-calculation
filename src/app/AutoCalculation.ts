import Calculator from '@src/app/Calculator'
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

    private calculate(tables: {[name: string]: string[][]}, baranceValue: number, addFlag: boolean): {[name: string]: string[][]} {

        this.calculator.switchAdd(addFlag)
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

    /**
     * アクティブシートを取得する
     */
    public getSheetName(): string {

        return this.sheet.getName()
    }

    public main(rowBalance: number = 2, columnBalance: number = 5): void {

        // 残高セルから残高を取得する。
        let cellBarance: Spreadsheet.Range = this.sheet.getRange(rowBalance, columnBalance)
        let baranceValue: string = cellBarance.getValue()

        // 残高セルが空欄の時、全ての処理を終了する。
        if (baranceValue === '') {
            return
        }
        // テーブルの縦幅を取得する。
        const tableLength: number = this.tableLength()
        // 残高セルから下の情報をテーブルの縦幅分取得する。
        const selected: Spreadsheet.Range = this.select(rowBalance, columnBalance, tableLength)
        // 計算処理に用いる情報を二次元配列で取得する。
        const tables: {[name: string]: string[][]} = this.tableRegister(selected)
        // 計算処理を決定する。計算処理のフラグは背景色が白以外の時、true となる。
        const cellAddSwitch: Spreadsheet.Range = this.sheet.getRange(rowBalance, columnBalance - 1)
        const addFlag: boolean = cellAddSwitch.getBackground() !== '#ffffff'

        const result: {[name: string]: string[][]} = this.calculate(tables, Number(baranceValue), addFlag)
        this.refresh(selected, result)

        this.main(rowBalance, columnBalance + 3)
    }
}