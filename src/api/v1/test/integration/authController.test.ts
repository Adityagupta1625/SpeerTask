import request from 'supertest'
import { app, server } from '../../../../index'
import bcrypt from "bcrypt";
import { userCRUD } from '../../crud'
import mongoose from 'mongoose'

jest.mock('../../crud/user')

describe('AuthController Integration Test', () => {
  const mockAddData = jest.spyOn(userCRUD, 'addData')
  const mockGetUserByEmail = jest.spyOn(userCRUD, 'getUserByEmail')
  const mockBcrypt=jest.spyOn(bcrypt,'compareSync')

  const testUser = {
    email: 'test@example.com',
    password: 'testpassword',
    _id: 'randomId',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    server.close()
    mongoose.disconnect()
  })

  it('should sign up a new user and return a token', async () => {
    mockAddData.mockResolvedValue(testUser as never)
    mockGetUserByEmail.mockResolvedValue(null)

    const response = await request(app)
      .post('/api/auth/signup')
      .send(testUser)
      .expect(201)

    expect(response.body).toHaveProperty('token')
  })

  it('should not sign up an existing user', async () => {
    mockGetUserByEmail.mockResolvedValue(testUser as any)

    const response = await request(app)
      .post('/api/auth/signup')
      .send(testUser)
      .expect(400)

    expect(response.body).toHaveProperty('message', 'user already exists!!')
  })

  it('should give 500 status when an error occurs during signup', async () => {
    mockGetUserByEmail.mockResolvedValue(null)
    mockAddData.mockRejectedValue('Internal Server Error')

    const response = await request(app)
      .post('/api/auth/signup')
      .send(testUser)
      .expect(500)

    expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })

  it('should log in an existing user and return a token', async () => {
    mockGetUserByEmail.mockResolvedValue(testUser as never)
    mockBcrypt.mockResolvedValue(true as never)

    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser)
      .expect(200)

    expect(response.body).toHaveProperty('token')
  })

  it('should return user not found', async () => {
    mockGetUserByEmail.mockResolvedValue(null)

    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser)
      .expect(404)

    expect(response.body).toHaveProperty('message','User does not Exist!!')
  })

  it('should return incorrect password', async () => {
    mockGetUserByEmail.mockResolvedValue(testUser as never) 
    mockBcrypt.mockReturnValueOnce(false)

    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser)
      .expect(403)

    expect(response.body).toHaveProperty('message','Enter Correct Password!!')
  })

  it('should return internal server error', async () => {
    mockGetUserByEmail.mockRejectedValue('Internal Server Error')

    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser)
      .expect(500)

      expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })


})
