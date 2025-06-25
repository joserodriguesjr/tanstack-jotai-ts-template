import {
  createStartHandler,
  // defaultStreamHandler,
  defaultRenderHandler
} from '@tanstack/react-start/server'
import { createRouter } from './router'

export default createStartHandler({
  createRouter,
})(defaultRenderHandler)