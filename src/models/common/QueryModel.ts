// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type ErrorHandler from '@src/models/common/ErrorHandler'

export default class QueryModel {

    private readonly query: Spreadsheet.Range

    private readonly errorHandler: ErrorHandler

    public constructor(errorHandler: ErrorHandler) {

        this.errorHandler = errorHandler

        this.query = this.getQuery()
    }

    private getQuery(): Spreadsheet.Range {

        const querySheet: Spreadsheet.Sheet = this.errorHandler.checkSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('query'))
        return querySheet.getRange(1, 1)
    }

    public getIniValue(itemName: string): string {

        this.query.setValue('=QUERY(ini!A:B, "SELECT B WHERE A = ' + "'" + itemName + "'" + '")')
        return this.query.getValue()
    }

    public getSheetSize(sheetName: string): {[key: string]: number} {

        const periodPoint = this.getIniValue('periodPoint')

        const sheetHeight: number = Number(this.getMatchValue(periodPoint, sheetName, 'A:A'))
        const sheetWidth: number = Number(this.getMatchValue(periodPoint, sheetName, '1:1'))

        return {
            height: sheetHeight,
            width: sheetWidth,
        }
    }

    private getMatchValue(periodPoint: string, sheetName: string, direction: string) {

        this.query.setValue('=MATCH("' + periodPoint + '", ' + sheetName + '!' + direction + ')')
        return this.query.getValue()
    }
}