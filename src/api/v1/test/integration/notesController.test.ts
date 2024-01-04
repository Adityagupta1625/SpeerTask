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

describe('Notes Controller Integration Test', () => {
  const addTestNote = {
    note: 'Test',
  }

  const testNote = {
    _id: 'sharedNoteId',
    note: 'Shared Note Content',
    userId: 'mockUserId',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const mockAddData = jest.spyOn(notesCRUD, 'addData')
  const mockFindAll = jest.spyOn(notesCRUD, 'findAll')
  const mockFindbyId = jest.spyOn(notesCRUD, 'findbyId')
  const mockUpdate = jest.spyOn(notesCRUD, 'update')
  const mockDelete = jest.spyOn(notesCRUD, 'delete')

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    server.close()
    mongoose.disconnect()
  })

  describe('POST /api/notes', () => {
    it('should add a new note', async () => {
      mockAddData.mockResolvedValue(testNote as any)

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer token`)
        .send(addTestNote)
        .expect(201)

      expect(response.body).toHaveProperty(
        'message',
        'Data added successfully!!'
      )
    })

    it('should handle bad request on invalid input', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer token`)
        .send({ invalidProperty: 'Invalid Value' })
        .expect(400)

      expect(response.body).toHaveProperty('message')
    })

    it('should handle internal server error', async () => {
      mockAddData.mockRejectedValue('Internal Server Error')

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer token`)
        .send(testNote)
        .expect(500)

      expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
  })

  describe('GET /api/notes', () => {
    it('should get all notes', async () => {
      mockFindAll.mockResolvedValue([testNote,testNote,testNote] as any)

      const response = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer token`)
        .expect(200)

      expect(response.body).toEqual([testNote,testNote,testNote])
    })

    it('should handle internal server error', async () => {
      mockFindAll.mockRejectedValue('Internal Server Error')

      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer token`)
        .send(testNote)
        .expect(500)

      expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
  })

  describe('GET /api/notes/{id}', () => {
    it('should get a note by ID', async () => {
      mockFindbyId.mockResolvedValue(testNote as any)

      const response = await request(app)
        .get(`/api/notes/123`)
        .set('Authorization', `Bearer token`)
        .expect(200)

      expect(response.body).toEqual(testNote)
    })

    it('should handle internal server error', async () => {
      mockFindbyId.mockRejectedValue('Internal Server Error')

      const response = await request(app)
        .get('/api/notes/123')
        .set('Authorization', `Bearer token`)
        .send(testNote)
        .expect(500)

      expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
  })

  describe('PUT /api/notes/{id}', () => {
    it('should update a note by ID', async () => {
      mockUpdate.mockResolvedValue(testNote as any)

      const response = await request(app)
        .put(`/api/notes/123`)
        .set('Authorization', `Bearer token`)
        .send({ note: 'Updated Note' })
        .expect(200)

      expect(response.body).toEqual(testNote)
    })

    it('should handle not found on invalid ID', async () => {
      const response = await request(app)
        .put('/api/notes/')
        .set('Authorization', `Bearer token`)
        .expect(404)
    })

    it('should handle bad request on invalid input', async () => {
      const response = await request(app)
        .put(`/api/notes/123`)
        .set('Authorization', `Bearer token`)
        .send({ invalidProperty: 'Invalid Value' })
        .expect(400)

      expect(response.body).toHaveProperty('message')
    })

    it('should handle internal server error', async () => {
      mockUpdate.mockRejectedValue('Internal Server Error')

      const response = await request(app)
        .put('/api/notes/123')
        .set('Authorization', `Bearer token`)
        .send(testNote)
        .expect(500)

      expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
  })

  describe('DELETE /api/notes/{id}', () => {
    it('should delete a note by ID', async () => {
      mockDelete.mockReturnValue('deleted' as never)

      const response = await request(app)
        .delete(`/api/notes/123`)
        .set('Authorization', `Bearer token`)
        .expect(204)
    })

    it('should handle not found on invalid ID', async () => {
      const response = await request(app)
        .delete('/api/notes/')
        .set('Authorization', `Bearer token`)
        .expect(404)
    })

    it('should handle internal server error', async () => {
      mockDelete.mockRejectedValue('Internal Server Error')

      const response = await request(app)
        .put('/api/notes/123')
        .set('Authorization', `Bearer token`)
        .send(testNote)
        .expect(500)

      expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
  })

  it('should share a note by ID', async () => {
    mockFindbyId.mockResolvedValue(testNote as any)

    const response = await request(app)
      .post(`/api/notes/123/share`)
      .set('Authorization', 'Bearer token')
      .expect(200);

    expect(response.body).toEqual(testNote);
    
  });

  it('should handle internal server error', async () => {
    mockFindbyId.mockRejectedValue('Internal Server Error')

    const response = await request(app)
      .post('/api/notes/123/share')
      .set('Authorization', `Bearer token`)
      .expect(500)

    expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })

})
