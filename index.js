const autoCalculation = new AutoCalculation()

// 始点
const rowBalance = 2
const columnBalance = 5

// 参照項目数
const tables = 5

const calculation = () => {
    autoCalculation.execute(rowBalance, columnBalance, tables)
}