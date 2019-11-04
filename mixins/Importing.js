import xlsx from 'xlsx'

export default {
  methods: {
    getExcelRows (data, maxRows) {
      const options = {
        type: 'binary'
      }

      if (maxRows) {
        options.sheetRows = maxRows
      }
      // Read the Excel File data.
      const workbook = xlsx.read(data, options)

      // Fetch the name of First Sheet.
      const firstSheet = workbook.SheetNames[0]

      // Read all rows from First Sheet into an JSON array.
      return xlsx.utils.sheet_to_json(workbook.Sheets[firstSheet], {
        header: 1
      })
    },
    processFile (files) {
      return new Promise((resolve, reject) => {
        if (typeof FileReader !== 'undefined') {
          const reader = new FileReader()

          // For Browsers other than IE.
          if (reader.readAsBinaryString) {
            reader.onload = ev => resolve(ev.target.result)
            reader.readAsBinaryString(files[0])
          } else {
          // For IE Browser.
            reader.onload = (ev) => {
              let data = ''
              const bytes = new Uint8Array(ev.target.result)
              for (let i = 0; i < bytes.byteLength; i++) {
                data += String.fromCharCode(bytes[i])
              }
              resolve(data)
            }
            reader.readAsArrayBuffer(files[0])
          }
        } else {
          reject(new Error('This browser does not support HTML5.'))
        }
      })
    }
  }
}
