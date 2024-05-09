import * as cheerio from 'cheerio'

export const cheerioFromUrl = async (url: string) => {
  const html = await fetch(url)
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
