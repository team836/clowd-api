import { Request, Response, NextFunction } from 'express'

export type CldRequest = Request
export type CldResponse = Response
export type CldNextFunction = NextFunction

export type SimpleHandler = (req: CldRequest, res: CldResponse) => void
export type NextHandler = (
  req: CldRequest,
  res: CldResponse,
  next: CldNextFunction
) => void
export type ErrorHandler = (
  err: Error,
  req: CldRequest,
  res: CldResponse,
  next: CldNextFunction
) => void

export type RequestHandler = SimpleHandler | NextHandler | ErrorHandler
