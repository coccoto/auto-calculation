// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class CalculationModel {

    private readonly sheet: Spreadsheet.Sheet

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet
    }

    public getBalanceValue(expenseValue: number, balanceValue: number, isAddMode: boolean, isReverseMode: boolean): string {

        if (! isAddMode) {
            return this.calculateOrder(expenseValue, balanceValue, isReverseMode)
        } else {
            return this.calculateOrder(expenseValue, balanceValue, ! isReverseMode)
        }
    }

    private calculateOrder(expenseValue: number, balanceValue: number, isReverseMode: boolean): string {

        if (! isReverseMode) {
            return String(balanceValue - expenseValue)
        } else {
            return String(balanceValue + expenseValue)
        }
    }

    public getExpenseValue(lastBalanceValue: number, currentBalanceValue: number): string {

        if (lastBalanceValue >= currentBalanceValue) {
            return String(lastBalanceValue - currentBalanceValue)
        } else {
            return String(currentBalanceValue - lastBalanceValue)
        }
    }
}