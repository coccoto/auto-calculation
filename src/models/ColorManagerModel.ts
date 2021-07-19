// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class ColorManagerModel {

    private readonly sheet: Spreadsheet.Sheet

    private mainColor: string

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.mainColor = ''
    }

    public isReverseMode(color: string): boolean {

        if (color !== '#ffffff') {
            return true
        }
        return false
    }

    public isIgnore(expenseColor: string, balanceColor: string): boolean {

        if (expenseColor !== '#ffffff' && balanceColor === this.mainColor) {
            return true
        }
        return false
    }

    public isAddMode(expenseColor: string, balanceColor: string): boolean {

        if (expenseColor !== '#ffffff' && balanceColor !== this.mainColor) {
            return true
        }
        return false
    }

    public setMainColor(colorCode: string): void {

        this.mainColor = colorCode
    }
}