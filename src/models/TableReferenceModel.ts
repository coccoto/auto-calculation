// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class TableReferenceModel {

    private readonly sheet: Spreadsheet.Sheet

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet
    }

    public selectTable(row: number, column: number, height: number, width: number): Spreadsheet.Range {

        return this.sheet.getRange(row, column, height, width)
    }

    public tableExtraction(selected: Spreadsheet.Range): {[name: string]: string[][]} {

        const values: string[][] = selected.getValues()
        const colors: string[][] = selected.getBackgrounds()
        
        return {
            values: values,
            colors: colors,
        }
    }
}