const template = require('../template.json')

function getFile(data: string, filename: string) {
  const anchor = document.createElement('a')
  const file = new Blob([data], {
    type: 'text/x.typescript',
  })
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, name)
  } else {
    const url = URL.createObjectURL(file)
    anchor.href = url
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    setTimeout(() => {
      document.body.removeChild(anchor)
      window.URL.revokeObjectURL(url)
    })
  }
}

const themeExport = (theme: Stage.Theme) => {
  let fileDataRaw = ''

  for (let row of template) {
    if (fileDataRaw) {
      fileDataRaw += '\n'
    }
    if (row.match('~NAME~')) {
      row = `\t\tname: 'custom',`
    }
    if (row.match('~COLOR~')) {
      row = ''
      for (const key of Object.keys(theme.color)) {
        if (key === 'palette') {
          continue
        }
        if (row) {
          row += '\n'
        }
        row += `\t\t\t${key}: [${theme.color[key].rgb().array().join(', ')}],`
      }
    }
    if (row.match('~PALETTE~')) {
      row = ''
      for (const key of Object.keys(theme.color.palette)) {
        if (row) {
          row += '\n'
        }
        row += `\t\t\t\t${key}: [${theme.color.palette[key].rgb().array().join(', ')}],`
      }
    }
    if (row.match('~PALETTE-INTERFACE~')) {
      row = ''
      for (const key of Object.keys(theme.color.palette)) {
        if (row) {
          row += '\n'
        }
        row += `\t\t\t${key}: Color`
      }
    }
    fileDataRaw += row
  }
  getFile(fileDataRaw, 'theme.ts')
}

export default themeExport
