// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type ErrorHandler from '@src/models/common/ErrorHandler'

export default class QueryModel {

    private readonly querySheet: Spreadsheet.Sheet
    private readonly errorHandler: ErrorHandler

    public constructor(errorHandler: ErrorHandler) {

        this.errorHandler = errorHandler
        this.querySheet = SpreadsheetApp.getActiveSheet()
    }
}