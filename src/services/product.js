import apiFeiraKit from './ApiFeiraKit'
import { useSelector } from 'react-redux'
import { storage } from '../../firebaseConfig.js'
export class Product {
  jwt = useSelector((state) => state.AuthReducers.authToken)
  async getAllProducts(page, limit, sort) {
    return await apiFeiraKit.get(
      `products?page=${page}&limit=${limit}&sort=${sort}`
    )
  }

  async getProductsByName(name) {
    return await apiFeiraKit.get(`/products/byname/${name}`)
  }

  async getProductsByIdUsuario(id) {
    return await apiFeiraKit.get(`/products/by-id-usuario/${id}`)
  }

  async createProduct(product) {
    return await apiFeiraKit.post('/products', product, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
  }

  async updateProduct(product) {
    return await apiFeiraKit.put('/products', product, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
  }

  async getUnites() {
    return await apiFeiraKit.get(`/products/units`)
  }

  async getCities() {
    return await apiFeiraKit.get('/products/get_cities', {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
  }

  async deleteProduct(product) {
    return await apiFeiraKit.delete('/products', {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
      data: product,
    })
  }
}
