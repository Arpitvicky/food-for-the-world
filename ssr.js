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

fs.writeFileSync('temp.html', appendInTable(html, foodbanks.map(createTableRowString).join('\n')), 'utf8')

function appendInTable(html, rows) {
  const tbodyIndex = html.indexOf('</tbody>')

  if (!tbodyIndex) {
    return html
  }

  return html.slice(0, tbodyIndex) + rows + html.slice(tbodyIndex)
}

function createTableRowString ({ name, city, country, link }) {
  return `
    <tr>
      <td><a href="${link}">${name}</a></td>
      <td>${city}</td>
      <td>${country}</td>
    </tr>`
}
