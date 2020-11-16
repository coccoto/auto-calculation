export default class Calculator {

    private minusMethod(firstValue: number, secondValue: number): string {

        return String(firstValue - secondValue)
    }

    private plusMethod(firstValue: number, secondValue: number): string {

        return String(firstValue + secondValue)
    }

    /**
     * @param {number} firstBalance
     * @param {number} secondBalance
     * @return {string} 演算結果
     */
    private opposite(firstBalance: number, secondBalance: number): string {

        return String (Math.abs (Number (this.minusMethod(firstBalance, secondBalance))))
    }

    /**
     * @param {number} targetValue 
     * @param {number} balanceValue 残高
     * @param {string} color カラーコード
     * @param {boolean} isAdd
     * @return {string} 演算結果
     */
    private caluclate(targetValue: number, balanceValue: number, color: string, isAdd: boolean): string {

        // 背景色で計算処理を変更
        if (color === '#ffffff') {
            if (isAdd) {
                return this.plusMethod(balanceValue, targetValue)
            } else {
                return this.minusMethod(balanceValue, targetValue)
            }
        } else {
            if (isAdd) {
                return this.minusMethod(balanceValue, targetValue)
            } else {
                return this.plusMethod(balanceValue, targetValue)
            }
        }
    }

    public main(lastIndex: number, workValues: {[name: string]: string[][]}, balanceValue: number, isAdd: boolean): {[name: string]: string[][]} {

        // 初回以降フラグ
        let isAfter: boolean = false
        // 逆演算フラグ
        let isOpposite: boolean = false

        for (let index in workValues.values) {
            // 演算を実行
            if (workValues.values[index][lastIndex - 1] !== '') {
                workValues.values[index][lastIndex] = this.caluclate(
                    Number(workValues.values[index][lastIndex - 1]), balanceValue, workValues.colors[index][lastIndex - 1], isAdd
                )
            } else {
                isOpposite = true
            }

            // 値を最新に更新
            if (workValues.values[index][lastIndex] !== '' && isAfter) {
                if (isOpposite) {
                    // 逆演算を実行
                    workValues.values[index][lastIndex - 1]　= this.opposite(balanceValue, Number(workValues.values[index][lastIndex]))
                }
                balanceValue = Number(workValues.values[index][lastIndex])
            }
            isOpposite = false
            if (! isAfter) { isAfter = true }
        }
        return workValues
    }
}