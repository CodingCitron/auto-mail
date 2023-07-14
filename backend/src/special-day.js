import request from 'request'
import convert from 'xml-js'

import { SpecialDay } from './models/index.js'
// import fs from 'fs'

import path from 'path'
import { fileURLToPath } from "url"
import dotenv from 'dotenv'

const __dirname = fileURLToPath(new URL(".", import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const uri = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo`
const serviceKey = process.env.SERVICE_KEY

const options = {
    uri,
    qs: {
        serviceKey,
        pageNo: 1,
        _type: 'json',             
        numOfRows: 100,
        solYear: 2023,
    }
}

function initSpecialDay(run) {
    if(!run) return 

    request(options, async (error, response, body) => {
        try {
            // const json = convert.xml2json(body, {
            //     compact: true, // Compact JSON으로 받기
            //     spaces: 4, // XML 결과물 들여쓰기에 사용할 공백 수
            // })
            
            // // fs.writeFile('text.txt', result, function(err){
            // //     if (err === null) {
            // //         console.log('success');
            // //     } else {
            // //         console.log('fail');
            // //     }
            // // })

            // // console.log(response)
            const res = JSON.parse(body)
            const items = res.response.body.items.item

            const list = items.map((item, index) => {
                item.locdate = String(item.locdate)

                const year = item.locdate.substring(0, 4)
                const month = item.locdate.substring(4, 6)
                const day = item.locdate.substring(6, 8)

                return {
                    name: item.dateName,
                    isHoliday: item.isHoliday === 'N' ? false : true,
                    date: new Date(year, month - 1, day),
                    order: Number(item.seq)
                }
            })
            
            const result = await SpecialDay.bulkCreate([...list])
        } catch (error) {
            console.error(error)
        }
    })
}

export default initSpecialDay