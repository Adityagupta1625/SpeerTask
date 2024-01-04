import { notesCRUD } from '../../crud'
import { NotesModel } from '../../models'
import HttpException from '../../../../utils/http-exception'

jest.mock('../../models/notes')

describe('NotesCRUD', () => {
  const createMock = jest.spyOn(NotesModel, 'create')
  const findByIdMock = jest.spyOn(NotesModel, 'findById')
  const findMock = jest.spyOn(NotesModel, 'find')
  const updateMock = jest.spyOn(NotesModel, 'findByIdAndUpdate')
  const deleteMock = jest.spyOn(NotesModel, 'findByIdAndDelete')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('addData', () => {
    it('should add data to the database', async () => {
      createMock.mockResolvedValueOnce({
        _id: '123',
        note: 'Test Note',
      } as never)

      const result = await notesCRUD.addData({ note: 'Test Note' })

      expect(result).toEqual({ _id: '123', note: 'Test Note' })
    })

    it('should throw HttpException with 500 status when an error occurs during addData', async () => {
      createMock.mockRejectedValueOnce(
        new HttpException(500, 'Internal Server Error') as never
      )

      await expect(async () => {
        await notesCRUD.addData({ note: 'Test Note' })
      }).rejects.toThrowErrorMatchingSnapshot('Internal Server Error')
    })
  })

  describe('findById', () => {
    it('should find a note by its ID', async () => {
      findByIdMock.mockResolvedValueOnce({
        _id: '123',
        note: 'Test Note',
      })

      const result = await notesCRUD.findbyId('123')

      expect(result).toEqual({ _id: '123', note: 'Test Note' })
    })

    it('should throw HttpException with 400 status when an invalid ID is provided', async () => {
      await expect(async () => {
        await notesCRUD.findbyId('')
      }).rejects.toThrowErrorMatchingSnapshot('Invalid ID')
    })

    it('should throw HttpException with 500 status when an error occurs during findById', async () => {
      findByIdMock.mockRejectedValueOnce(new Error('Some error'))

      await expect(async () => {
        await notesCRUD.findbyId('123')
      }).rejects.toThrowErrorMatchingSnapshot('Invalid ID')
    })
  })

  describe('findAll', () => {
    it('should find all notes in the collection', async () => {
      findMock.mockResolvedValueOnce([
        { _id: '123', note: 'Note 1' },
        { _id: '456', note: 'Note 2' },
      ])

      const result = await notesCRUD.findAll()

      expect(result).toEqual([
        { _id: '123', note: 'Note 1' },
        { _id: '456', note: 'Note 2' },
      ])
    })

    it('should throw HttpException with 500 status when an error occurs during findAll', async () => {
      findMock.mockRejectedValueOnce(
        new HttpException(500, 'Internal Server Error')
      )

      await expect(async () => {
        await notesCRUD.findAll()
      }).rejects.toThrowErrorMatchingSnapshot('Internal Server Error')
    })
  })

  describe('update', () => {
    it('should update a note by its ID', async () => {
      updateMock.mockResolvedValueOnce({
        _id: '123',
        note: 'Updated Note',
      } as never)

      const result = await notesCRUD.update('123', { note: 'Updated Note' })

      expect(result).toEqual({ _id: '123', note: 'Updated Note' })
    })

    it('should throw HttpException with 400 status when an invalid ID is provided during update', async () => {
      await expect(async () => {
        await notesCRUD.update('', { note: 'Updated Note' })
      }).rejects.toThrowErrorMatchingSnapshot('Invalid ID')
    })

    it('should throw HttpException with 500 status when an error occurs during update', async () => {
      updateMock.mockRejectedValueOnce(
        new HttpException(500, 'Internal Server Error')
      )

      await expect(async () => {
        await notesCRUD.update('123', { note: 'Updated Note' })
      }).rejects.toThrowErrorMatchingSnapshot('Internal Server Error')
    })
  })

  describe('delete', () => {
    it('should delete a note by its ID', async () => {
      await notesCRUD.delete('123')

      expect(deleteMock).toHaveBeenCalledWith('123')
    })

    it('should throw HttpException with 400 status when an invalid ID is provided during delete', async () => {
      await expect(async () => {
        await notesCRUD.delete('')
      }).rejects.toThrowErrorMatchingSnapshot('Invalid ID')
    })

    it('should throw HttpException with 500 status when an error occurs during delete', async () => {
      deleteMock.mockRejectedValueOnce(
        new HttpException(500, 'Internal Sever Error')
      )

      await expect(async () => {
        await notesCRUD.delete('123')
      }).rejects.toThrowErrorMatchingSnapshot('Internal Sever Error')
    })
  })
})
