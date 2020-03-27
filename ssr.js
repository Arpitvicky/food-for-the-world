const fs = require('fs')
const foodbanks = fs.readFileSync('food-donation.tsv', 'utf8')
  .split('\r\n')
  .map(line => line.split('\t'))
  .map(([name, city, country, location, link]) => ({
    name,
    city,
    country,
    link,
  }))

const html = fs.readFileSync('index.html', 'utf8')

fs.writeFileSync(
  'temp.html',
  appendInTable(html, foodbanks.map(createTableRowString).join('\n')),
  'utf8',
)

/**
 * Finds the closing body tag and appends the rows before it
 * Super hacky, don't really need anything more for this though
 * @param {string} html 
 * @param {string} rows 
 */
function appendInTable(html, rows) {
  const tbodyIndex = html.indexOf('</tbody>')

  if (!tbodyIndex) {
    return html
  }

  return html.slice(0, tbodyIndex) + rows + html.slice(tbodyIndex)
}

/**
 *
 * @param {{ name: string, city: string, country: string, link: string}} param0 
 */
function createTableRowString ({ name, city, country, link }) {
  return `
    <tr>
      <td><a href="${link}">${name}</a></td>
      <td>${city}</td>
      <td>${country}</td>
    </tr>`
}
