import { Hono } from 'hono'
import { cache } from 'hono/cache'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/*', cache({ cacheName: 'motorcycles', cacheControl: 'max-age=3600' }))

app.get('/', async c => {
  // const allMotorcycles = await getAllMotorcycles()
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM Motorcycle').all()
    return c.json(results)
  } catch (error) {
    return c.json({ error }, 500)
  }
})

export default app
