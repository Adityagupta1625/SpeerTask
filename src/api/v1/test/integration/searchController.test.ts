import request from 'supertest'
import { app, server } from '../../../../index'
import { notesCRUD } from '../../crud'
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

jest.mock('../../crud/notes')

jest.mock('../../middleware/validateToken', () => ({
  validateToken: (req: Request, res: Response, next: NextFunction) => {
    req.query.userId = 'mockUserId'
    next()
  },
}))

describe('Search Controller Integration Test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    server.close()
    mongoose.disconnect()
  })

  const testNote = [
    {
      _id: 'sharedNoteId',
      note: 'Shared Note Content',
      userId: 'mockUserId',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ]

  const mockFindNotes = jest.spyOn(notesCRUD, 'findNotes')

  it('should search notes successfully', async () => {
    mockFindNotes.mockResolvedValue(testNote as any)

    const response = await request(app)
      .get(`/api/search?q=tech`)
      .set('Authorization', 'Bearer Token')
      .expect(200)

    expect(response.body).toEqual(testNote)
  })

  it('should handle the case where the search query is missing', async () => {
    const response = await request(app)
      .get('/api/search?q=')
      .set('Authorization', 'Bearer token')
      .expect(400)

    expect(response.body).toHaveProperty('message', 'Search Query not found!!')
  })

  it('should handle internal server error', async () => {
    mockFindNotes.mockRejectedValue('Internal Server Error')

    const response = await request(app)
      .get('/api/search?q=tech')
      .set('Authorization', 'Bearer token')
      .expect(500)

    expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })
})
