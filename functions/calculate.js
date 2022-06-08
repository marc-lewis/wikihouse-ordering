import dotenv from 'dotenv';
dotenv.config();

const base = require('airtable').base(process.env.AIRTABLE_BASE);

exports.handler = async (event, context) => {
  var body = JSON.parse(event.body)

  try {
    const response = await base.table(process.env.AIRTABLE_TABLE).select().all()

    console.log('body', body)
    const items = Object.keys(body)

    let costings = {
      "Est. Assembly Time (person-hrs)": 0,
      "Manufacturing Time": 0,
      "Manufacturing Cost": 0,
      "Assembly_cost": 0,
      "Insulation_cost": 0,
      "Fixings_cost": 0,
      "Total_cost": 0,

    }

    response.forEach(item => {
      if(items.includes(item.fields.Name)) {
        costings["Est. Assembly Time (person-hrs)"] += item.fields["Est. Assembly Time (person-hrs)"] * body[item.fields.Name]
        costings["Manufacturing Time"] += item.fields["Manufacturing Time"] * body[item.fields.Name]
        costings["Manufacturing Cost"] += item.fields["Manufacturing Cost"] * body[item.fields.Name]
        costings["Assembly_cost"] += item.fields["Assembly_cost"] * body[item.fields.Name]
        costings["Insulation_cost"] += item.fields["Insulation_cost"] * body[item.fields.Name]
        costings["Fixings_cost"] += item.fields["Fixings_cost"] * body[item.fields.Name]
        costings["Total_cost"] += item.fields["Total_cost"] * body[item.fields.Name]
      }
    })

    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        costings,
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