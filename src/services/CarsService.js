import { AppState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { api } from "./AxiosService.js";



// NOTE service is export as a singleton
class CarsService{
  async editCar(carData) {
    let res = await api.put(`/api/cars/${carData.id}`, carData)
    let car = new Car(res.data)
    let carIndex = AppState.cars.findIndex(c => c.id == carData.id)
    AppState.cars.splice(carIndex, 1, car)
  }

  async getCars() {
    let res = await api.get('/api/cars')
    AppState.cars = res.data.map(c => new Car(c))
  }

  async createCar(carFormData) {
    let res = await api.post('/api/cars', carFormData)
    let car = new Car(res.data)
    AppState.cars = [...AppState.cars, car]
  }

  async deleteCar(carId) {
    let url = `/api/cars/${carId}`
    await api.delete(url)
    AppState.cars = AppState.cars.filter(c => c.id != carId)
  }

  setActiveCar(car){
    AppState.activeCar = car
  }

  async getCarById(carId){
    const res = await api.get(`api/cars/${carId}`)
    AppState.activeCar = new Car(res.data)
  }

}

export const carsService = new CarsService()