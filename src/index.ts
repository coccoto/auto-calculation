// controllers
import IndexController from '@src/controllers/IndexController'

global.AutoCalculation = (): void => {
    const indexController: IndexController = new IndexController()
    indexController.main()
}