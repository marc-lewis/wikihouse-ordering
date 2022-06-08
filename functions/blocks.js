import dotenv from 'dotenv';
dotenv.config();

const base = require('airtable').base(process.env.AIRTABLE_BASE);

exports.handler = async (event, context) => {
  try {
    const response = await base.table(process.env.AIRTABLE_TABLE).select().all()

    const blockList = []
    response.forEach(item => {
      blockList.push(item.fields.Name)
    })

    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        blockList,
      })
    }
  } catch (e) {
    console.log('error', e)

    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 500,
      body: JSON.stringify({
        oof: "oof",
      })
    }
  }
}