export default class Calculator {

    /**
     * @param {string} targetValue 
     * @param {string} balanceValue 残高
     * @param {string} color カラーコード
     * @param {boolean} addFlag
     * @return {string} 演算結果
     */
    private caluclatePush(targetValue: string, balanceValue: number, color: string, addFlag: boolean): string {

        // 背景色で計算処理を変更
        if (color === '#ffffff') {
            if (addFlag) {
                return String(balanceValue + Number(targetValue))
            } else {
                return String(balanceValue - Number(targetValue))
            }
        } else {
            if (addFlag) {
                return String(balanceValue - Number(targetValue))
            } else {
                return String(balanceValue + Number(targetValue))
            }
        }
    }

    public main(lastIndex: number, workValues: {[name: string]: string[][]}, balanceValue: number, isAdd: boolean): {[name: string]: string[][]} {

        for (let index in workValues.values) {
            if (workValues.values[index][lastIndex - 1] !== '') {
                workValues.values[index][lastIndex] = this.caluclatePush(
                    workValues.values[index][lastIndex - 1], balanceValue, workValues.colors[index][lastIndex - 1], isAdd
                )
            }
            // 残高を更新
            if (workValues.values[index][lastIndex] !== '') {
                balanceValue = Number(workValues.values[index][lastIndex])
            }
        }
        return workValues
    }
}