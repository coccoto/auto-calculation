// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'
import CalculationModel from '@src/models/CalculationModel'
import ColorManagerModel from '@src/models/ColorManagerModel'
import WorkTableModel from '@src/models/WorkTableModel'

export default class AssembleModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly calculationModel: CalculationModel
    private readonly colorManagerModel: ColorManagerModel

    private lastBalanceValue: number

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.calculationModel = new CalculationModel(this.sheet)
        this.colorManagerModel = new ColorManagerModel(this.sheet)

        this.lastBalanceValue = 0
    }

    public main(workValues: {[name: string]: string[][]}, isReverseMode: boolean): {[name: string]: string[][]} {

        this.lastBalanceValue = 0

        for (let index in workValues.values) {
            workValues = this.assemble(workValues, Number(index), isReverseMode)
        }
        return workValues
    }

    private assemble(workValues: {[name: string]: string[][]}, index: number, isReverseMode: boolean): {[name: string]: string[][]} {

        const lastIndex: number = 0

        const expenseColor: string = workValues.colors[index][lastIndex - 1]
        const balanceColor: string = workValues.colors[index][lastIndex]

        let expenseValue: string = workValues.values[index][lastIndex - 1]
        let balanceValue: string = workValues.values[index][lastIndex]

        if (this.isContinue(index, Number(balanceValue), expenseColor, balanceColor)) {
            return workValues
        }

        const isAddMode: boolean = this.colorManagerModel.isAddMode(expenseColor, balanceColor)

        if (expenseValue !== '') {
            workValues.values[index][lastIndex]　= this.calculationModel.getBalanceValue(Number(expenseValue), Number(balanceValue), isAddMode, isReverseMode)
            balanceValue = workValues.values[index][lastIndex]

        } else if (balanceValue !== '') {
            workValues.values[index][lastIndex - 1] = this.calculationModel.getExpenseValue(this.lastBalanceValue, Number(balanceValue))
            expenseValue = workValues.values[index][lastIndex - 1]
        }

        if (balanceValue !== '') {
            this.lastBalanceValue = Number(workValues.values[index][lastIndex])
        }
        return workValues
    }

    private isContinue(index: number, balanceValue: number, expenseColor: string, balanceColor: string): boolean {

        if (index === 0) {
            this.lastBalanceValue = balanceValue
            return true
        }

        if (this.colorManagerModel.isIgnore(expenseColor, balanceColor)) {
            return true
        }
        return false
    }
}