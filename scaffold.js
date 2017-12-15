let fs = require('fs')
let files = [
  ['Vue/Modell.vue', 'm'],
  ['Vue/ModellList.vue', 'l'],
  ['Vue/ModellForm.vue', 'f'],
  ['Vue/ApiListModell.vue', 'a'],
  ['Vue/FilterBar.vue', 's'],
  ['Store/modell.js', 'm'],
  ['Store/modell-types.js', 'm']
]

let modellName = process.argv[2]
let goHorse = process.argv.indexOf('--go-horse') !== -1
let writePath = goHorse ? 'src/components/' + modellName + '/' : 'templates/scaffold/out/'

function copyFiles (element) {
  fs.readFile('templates/scaffold/' + element[0], 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    if (!process.argv[3] || process.argv[3].indexOf(element[1]) !== -1) {
      var result = data.replace(/modell/g, modellName.toLowerCase())
      result = result.replace(/Modell/g, modellName)
      let outEl = element[0].replace(/modell/g, modellName.toLowerCase())
      if (!goHorse) {
        outEl = outEl.replace(/Modell/g, modellName)
      }
      else {
        outEl = outEl.replace(/Modell/g, modellName).replace(/Vue\//g, '')
      }
      console.log(outEl + ': criado')
      // console.log(writePath + outEl)
      fs.writeFile(writePath + outEl, result, 'utf8', function (err) {
        if (err) return console.log(err)
      })
    }
  })
}

files.forEach(element => copyFiles(element))
