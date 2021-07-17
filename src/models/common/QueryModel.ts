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

    public getMasterValue(itemName: string): string {

        this.query.setValue('=QUERY(query!A:B, "SELECT B WHERE A = ' + itemName + '"')
        return this.query.getValue()
    }
}