// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class ColorManagerModel {

    private readonly sheet: Spreadsheet.Sheet

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet
    }

    public isReverseMode(color: string): boolean {

        if (color !== '#ffffff') {
            return true
        }
        return false
    }

    public isIgnore(expenseColor: string, balanceColor: string): boolean {

        if (expenseColor !== '#ffffff' && balanceColor === '#ffffff') {
            return true
        }
        return false
    }

    public isAddMode(expenseColor: string, balanceColor: string): boolean {

        if (expenseColor !== '#ffffff' && balanceColor !== '#ffffff') {
            return true
        }
        return false
    }
}