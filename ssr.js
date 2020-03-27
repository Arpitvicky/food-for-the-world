const fs = require('fs')
const foodbanks = fs.readFileSync('food-donation.tsv', 'utf8')
  .split('\r\n')
  .map(line => line.split('\t'))
  .map(([name, city, country, location, link]) => ({
    name,
    city,
    country,
    link,
  })).slice(1)

const html = fs.readFileSync('index.html', 'utf8')

const htmlWithTable = appendInTable(html, foodbanks.map(createTableRowString).join('\n'))
const htmlWithTableAndScript = addArrayToWindow(htmlWithTable, JSON.stringify(foodbanks))
fs.writeFileSync(
  'temp.html',
  htmlWithTableAndScript,
  'utf8',
)

function addArrayToWindow (html, data) {
  const headIndex = html.indexOf('</head>')

  if (!headIndex) {
    return html
  }

  return insertAtIndex(html, headIndex, createArrayDeclarationString(data))
}

function createArrayDeclarationString(data) {
  return `<script>window.data = ${data}</script>`
}
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

  return insertAtIndex(html, tbodyIndex, rows)
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

function insertAtIndex(target, index, text) {
  return target.slice(0, index) + text + target.slice(index)
}
