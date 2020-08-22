export default class Calculator {

    private addFlag: boolean

    public constructor() {

        this.addFlag = false
    }

    /**
     * 背景色が白の時は残高をマイナス、白以外の時はプラスする。
     * addFlag が true の時は上記と逆処理を実行する。
     */
    private push(values: string[], colors: string[], baranceValue: number): string {

        if (colors[0] === '#ffffff') {
            if (this.addFlag) {
                return values[1] = String(baranceValue + Number(values[0]))
            } else {
                return values[1] = String(baranceValue - Number(values[0]))
            }
        } else {
            if (this.addFlag) {
                return values[1] = String(baranceValue - Number(values[0]))
            } else {
                return values[1] = String(baranceValue + Number(values[0]))
            }
        }
    }

    private calculate(tables: {[name: string]: string[][]}, baranceValue: number): {[name: string]: string[][]} {

        for (let index in tables.values) {
            // テーブルに値が存在していれば計算処理を実行する。
            if (tables.values[index][0] !== '') {
                tables.values[index][1] = this.push(tables.values[index], tables.colors[index], baranceValue)
            }
            //　テーブルに値が存在していれば残高を更新する。
            if (tables.values[index][1] !== '') {
                baranceValue = Number(tables.values[index][1])
            }
        }
        return tables
    }

    /**
     * 計算の処理方法を決定する。
     */
    public switchAdd(addFlag: boolean): void {

        this.addFlag = addFlag
    }

    public main(tables: {[name: string]: string[][]}, baranceValue: number): {[name: string]: string[][]} {

        return this.calculate(tables, baranceValue)
    }
}