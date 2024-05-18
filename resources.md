## Resources

- [Cloudflare workers - tutorial](https://www.youtube.com/watch?v=yPrQ7u3gWqk)
- [Github cron jobs - tutorial](https://www.youtube.com/watch?v=2OwLb-aaiBQ)
- [Hono documentation](https://hono.dev/top)
- [Cheerio documentation](https://cheerio.js.org/docs/intro)
- [D1 db documentation](https://developers.cloudflare.com/d1/get-started/)
- [D1 db from hono](https://developers.cloudflare.com/d1/examples/d1-and-hono/)

## D1 db

- Execute schema in local
  `bunx wrangler d1 execute moto-library-db --local --file=./schema.sql`
- Execute schema in remote
  `bunx wrangler d1 execute moto-library-db --remote --file=./schema.sql`
- Execute command in local
  `bunx wrangler d1 execute moto-library-db --local --command="SELECT * FROM Motorcycle"`
- Execute command in remote
  `bunx wrangler d1 execute moto-library-db --remote --command="SELECT * FROM Motorcycle"`
