const fs = require("fs")
const csv = require("csvtojson")

const createCarsFromCSV = async () => {

  //Đọc data từ file  data.csv
  let newData = await csv().fromFile("data.csv")
  // turn JSON to Js object
  let data = JSON.parse(fs.readFileSync("db.json"))
  // // Process newData
  newData = newData.map((e) => {
    return {
      "make": e.Make,
      "model": e.Model,
      "release_date": e.Year,
      "transmission_type": e["Transmission Type"],
      "size": e["Vehicle Size"],
      "style": e["Vehicle Style"],
      "price": e.MSRP
    }
  })


  data.cars = newData
  fs.writeFileSync("db.json", JSON.stringify(data))
  // console.log('done')
  console.log(`data:`, data)

}
createCarsFromCSV();