const locationInput = document.getElementById('location-search')
const tbody = document.getElementsByTagName('tbody')[0]

locationInput.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase()

  const filteredData = window.data && window.data.filter(row => row.city.toLowerCase().indexOf(value) > -1 || row.country.toLowerCase().indexOf(value) > -1)
  const newRows = generateTableRows(filteredData)
  tbody.innerHTML = ''
  newRows.forEach(r => tbody.appendChild(r))
})

/**
 * @param { name: string, city: string, country: string, link: string}[] data
 */
function generateTableRows(data) {
  let rows = []
  for (const row of data) {
    const tr = document.createElement('tr')

    const name = document.createElement('td')
    const city = document.createElement('td')
    const country = document.createElement('td')

    const donationLink = document.createElement('a')
    donationLink.setAttribute('href', row.link)
    donationLink.innerHTML = row.name
    city.innerHTML = row.city
    country.innerHTML = row.country

    name.appendChild(donationLink)
    tr.appendChild(name)
    tr.appendChild(city)
    tr.appendChild(country)

    rows.push(tr)
  }

  return rows
}