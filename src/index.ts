import { Hono } from 'hono'
import { getAllMotorcycles } from './scrapers'

const app = new Hono()

app.get('/', async c => {
  const allMotorcycles = await getAllMotorcycles()
  return c.json(allMotorcycles)
})

export default app
