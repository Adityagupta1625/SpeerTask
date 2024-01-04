import { userCRUD } from '../../crud'
import { UserModel } from '../../models'
import HttpException from '../../../../utils/http-exception'

jest.mock('../../models/user')

describe('UserCRUD', () => {
  const createMock = jest.spyOn(UserModel, 'create')
  const findByIdMock = jest.spyOn(UserModel, 'findById')
  const findOneMock = jest.spyOn(UserModel, 'findOne')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('addData', () => {
    it('should add user data to the database', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
      }

      createMock.mockResolvedValueOnce(mockUserData as never)

      const result = await userCRUD.addData(mockUserData)

      expect(result).toEqual(mockUserData)
    })

    it('should throw HttpException with 500 status when an unexpected error occurs during data addition', async () => {
      createMock.mockRejectedValue('Internal Server Error' as never)

      await expect(async () => {
        await userCRUD.addData({})
      }).rejects.toThrow(new HttpException(500, 'Internal Server Error'))
    })
  })

  describe('findbyId', () => {
    it('should find a user by ID', async () => {
      const mockUser = { _id: 'mockUserId', email: 'test@example.com' }

      findByIdMock.mockResolvedValueOnce(mockUser)

      const result = await userCRUD.findbyId('mockUserId')

      expect(result).toEqual(mockUser)
    })

    it('should throw HttpException with 400 status when an invalid ID is provided', async () => {
      await expect(async () => {
        await userCRUD.findbyId('')
      }).rejects.toThrowErrorMatchingSnapshot('Invalid ID')
    })

    it('should throw HttpException with 500 status when an unexpected error occurs during ID lookup', async () => {
      findByIdMock.mockRejectedValue('Internal Server Error')

      await expect(async () => {
        await userCRUD.findbyId('mockUserId')
      }).rejects.toThrow(new HttpException(500, 'Internal Server Error'))
    })
  })

  describe('getUserByEmail', () => {
    it('should return the user when email is provided and user is found', async () => {
      const mockUser = { email: 'test@example.com' }

      findOneMock.mockResolvedValueOnce(mockUser)

      const result = await userCRUD.getUserByEmail('test@example.com')

      expect(result).toEqual(mockUser)
    })

    it('should throw HttpException with 400 status when email is not provided', async () => {
      await expect(async () => {
        await userCRUD.getUserByEmail('')
      }).rejects.toThrowErrorMatchingSnapshot('email not provided')
    })

    it('should throw HttpException with 500 status when an unexpected error occurs', async () => {
      findOneMock.mockRejectedValue('Internal Server Error')

      await expect(async () => {
        await userCRUD.getUserByEmail('test@example.com')
      }).rejects.toThrow(new HttpException(500, 'Internal Server Error'))
    })
  })
})
