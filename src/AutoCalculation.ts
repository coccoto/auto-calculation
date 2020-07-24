export class AutoCalculation {

    private _sheet: object | null

    public constructor() {

        this._sheet = null
    }

    public set sheet(id: string) {

        this._sheet = SpreadsheetApp.openById(id)
    }

    public main():void {
    }
}