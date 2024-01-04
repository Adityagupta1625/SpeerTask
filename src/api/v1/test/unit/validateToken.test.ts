import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validateToken } from '../../middleware/validateToken';
import { userCRUD } from '../../crud';
import HttpException from '../../../../utils/http-exception';


jest.mock('../../crud');


describe('validateToken Middleware', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
        headers: {
          authorization: 'Bearer mockToken',
        },
        query: {},
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockJwtVerify=jest.spyOn(jwt,'verify')
  const mockFindById= jest.spyOn(userCRUD,'findbyId')


  it('should handle token not found', async () => {
    req.headers.authorization = undefined;

    validateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle invalid token', async () => {

    validateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle user not found', async () => {
   
    mockFindById.mockResolvedValueOnce(null);

    validateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle an exception during token validation', async () => {
    
    mockJwtVerify.mockImplementation(()=>{
        throw new HttpException(500,'Something went wrong!!')
    })

    validateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({"message":'Something went wrong!!'});
  });

  
});
