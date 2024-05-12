const fs = require('fs')
const path = require('path')

main()

function main() {
  const filePath = path.join(__dirname, 'bookmarks.html')
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading the HTML file:', err)
      return
    }

    const groupRegex = /<H3[^>]*>([^<]+)<\/H3>\s*<DL><p>([\s\S]*?)<\/DL>/g
    const linkRegex =
      /<DT><A HREF="([^"]+)" ADD_DATE="([^"]+)" ICON="([^"]+)">([^<]+)<\/A>/g

    let groups = []
    let match

    while ((match = groupRegex.exec(html)) !== null) {
      let groupName = match[1]
      let linksHtml = match[2]
      let children = []

      // 书签栏 -> Tool，so hack
      if (groupName === '书签栏') {
        groupName = 'Tool'
      }

      let linkMatch
      while ((linkMatch = linkRegex.exec(linksHtml)) !== null) {
        children.push({
          name: linkMatch[4],
          icon: linkMatch[3],
          addDate: linkMatch[2],
          href: linkMatch[1],
        })
      }

      groups.push({
        group: groupName,
        children: children,
      })
    }

    const outputFilePath = path.join(__dirname, 'bookmarks.json')
    fs.writeFile(
      outputFilePath,
      JSON.stringify(groups, null, 2),
      'utf8',
      (writeErr) => {
        if (writeErr) {
          console.error('Error writing the JSON file:', writeErr)
        } else {
          console.log('JSON file has been saved.')
        }
      },
    )
  })
}
