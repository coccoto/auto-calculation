// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// modules
import Calculator from '@src/app/Calculator'
// helper
import TableMeasure from '@src/app/helper/TableMeasure'

export default class AutoCalculation {

    private sheet: Spreadsheet.Sheet

    private calculator: Calculator
    private tableMeasure: TableMeasure

    private master: {[name: string]: number[]}

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.calculator = new Calculator()
        this.tableMeasure = new TableMeasure(this.sheet)

        this.master = {}
    }

    private setWorkTable(selected: Spreadsheet.Range, result: {[name: string]: string[][]}): void {

        const values: string[][] = []

        for (let value of result.values) {
            values.push(value)
        }
        selected.setValues(values)
    }

    private extraction(selected: Spreadsheet.Range): {[name: string]: string[][]} {

        const values: string[][] = selected.getValues()
        const colors: string[][] = selected.getBackgrounds()

        return {
            values: values,
            colors: colors,
        }
    }

    private selectWorkTable(row: number, column: number, numRows: number, numColumns: number): Spreadsheet.Range {

        return this.sheet.getRange(row, column, numRows, numColumns + 1)
    }

    /**
     * @再帰処理
     */
    private assemble(height: number, width: number, row: number = this.master.INI_POSITION_FROM[0], column: number = this.master.INI_POSITION_FROM[1]): void {

        // ワークテーブルを選択し値を取り出す
        const selectedWorkTable: Spreadsheet.Range = this.selectWorkTable(row, column, height, width)
        const workValues: {[name: string]: string[][]} = this.extraction(selectedWorkTable)

        // 残高が空白の場合、処理を終了
        if (workValues.values[0][width] === '') {
            return
        }

        // 背景色が白以外の場合、プラスモードに変更
        const isAdd: boolean = workValues.colors[0][width - 1] !== '#ffffff'
        // 残高を取得
        const baranchCell: Spreadsheet.Range = this.sheet.getRange(row, column + row)
        const balanceValue: number = baranchCell.getValue()

        // 計算を実行
        const result: {[name: string]: string[][]} = this.calculator.main(width, workValues, balanceValue, isAdd)
        // 処理結果をテーブルに反映
        this.setWorkTable(selectedWorkTable, result)

        // 次のテーブルに移動
        const nextTableColumn = column + width + 1

        const nextPositionFrom = [
            this.master.INI_POSITION_FROM[0],
            nextTableColumn,
        ]
        // 再帰処理
        this.assemble(height, width, nextPositionFrom[0], nextPositionFrom[1])
    }

    public main(): void {

        // 縦幅、横幅を取得
        const workHeight: number = this.tableMeasure.height(this.master.INI_POSITION_FROM[0])
        const workWidth: number = this.master.INI_POSITION_TO[1] - this.master.INI_POSITION_FROM[1]

        this.assemble(workHeight, workWidth)
    }

    public setMaster(master: {[name: string]: number[]}): void {

        this.master = master
    }
}