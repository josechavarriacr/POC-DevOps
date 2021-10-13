/* eslint-disable no-undef */
import { ApiToolsDeleteFn, ApiToolsLoadAxios } from './api-utils'

describe('Testing Utils Component', () => {
    it('Function ApiToolsLoadAxios', async () => {
        const response = await ApiToolsLoadAxios()
        expect(response).not.toBeNull()
        expect(typeof response).toBe('array')
        expect(Array.isArray(response)).toBe(true)
    })
    it('Function  ApiToolsDeleteFn', () => {
        const numbers = [{ id: 1}, { id: 2 }, { id: 3 }]
        const resultNumber = [{ id: 2 }, { id: 3 }]
        const response = ApiToolsDeleteFn(1, numbers)
        expect(response).toStrictEqual(resultNumber)
    })
})
