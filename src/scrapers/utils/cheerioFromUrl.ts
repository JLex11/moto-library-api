import * as cheerio from 'cheerio'

export const cheerioFromUrl = async (url: string) => {
  console.log(`Fetching ${url}`)

  const html = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      Referer: 'https://www.example.com/',
      Cookie: 'session_id=abc123; user_pref=es'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
      }
      return res.text()
    })
    .catch(error => {
      console.error(`Error fetching ${url} => ${error}`)
      return ''
    })

  return cheerio.load(html)
}
