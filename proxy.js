const proxyPaths = [
  '/dashboard',
  '/requests',
  '/session',
  '/welcome',
  '/assets',
  '/packs'
]

let proxies = {}

for (let path of proxyPaths) {
  proxies[path] = {
    target: `${process.env.API_URL}`,
    changeOrigin: true,
    xfwd: true
  }
}

proxies['/postcodeSearch'] = {
  target: `${process.env.POSTCODE_SEARCH_HOST}`,
  changeOrigin: true,
  pathRewrite (path, req) {
    let newPath = path.replace('/postcodeSearch', '/v1/postcodes')
    newPath += `?api_key=${process.env.POSTCODE_SEARCH_KEY}&filter=line_1,line_2,line_3,post_town,postcode`
    return newPath
  }
}

module.exports = proxies
