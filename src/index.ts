import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { getAllMotorcycles } from './scrapers'

const app = new Hono()

app.get('/*', cache({ cacheName: 'motorcycles', cacheControl: 'max-age=3600' }))

app.get('/', async c => {
  const allMotorcycles = await getAllMotorcycles()
  return c.json(allMotorcycles)
})

export default app
