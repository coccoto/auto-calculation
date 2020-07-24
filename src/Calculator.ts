export default class Calculator {

    private push(values: string[], colors: string[], baranceValue: number): string {

        if (colors[0] === '#ffffff') {
            return values[1] = String(baranceValue - Number(values[0]))
        } else {
            return values[1] = String(baranceValue + Number(values[0]))
        }
    }

    private calculate(tables: {[name: string]: string[][]}, baranceValue: number): {[name: string]: string[][]} {

        for (let index in tables.values) {
            if (tables.values[index][0] !== '') {
                tables.values[index][1] = this.push(tables.values[index], tables.colors[index], baranceValue)
            }
            if (tables.values[index][1] !== '') {
                baranceValue = Number(tables.values[index][1])
            }
        }
        return tables
    }

    public main(tables: {[name: string]: string[][]}, baranceValue: number): {[name: string]: string[][]} {

        return this.calculate(tables, baranceValue)
    }
}