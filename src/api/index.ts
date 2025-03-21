// I chose centralized API structure because the Shop platform involves a large amount of content.
// Even though this is a small test project, this structure ensures scalability and maintainability.
import * as categoriesService from './categoriesService'
import * as productsService from './productsService'

export { categoriesService, productsService }
