import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const installMocks = () => {
  if (!window._mswWorkerInstalled) {
    const worker = setupWorker(...handlers)
    worker.start()
    window._mswWorkerInstalled = 1
  }
}
