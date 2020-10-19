const fetch = require('node-fetch');
const { DateTime } = require('luxon');
const Timeout = require('await-timeout');
const { safeDump } = require('js-yaml');
const { writeFileSync } = require('fs');
const { groupBy } = require('lodash');

const fetchStartDates = async () => {
  try {
    let after = 0;
    let objects = [];
    do {
      const json = await (await fetch(`https://api.hubapi.com/crm/v3/objects/tickets/search?hapikey=${process.env.HUBSPOT_API_KEY}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                { propertyName: 'type', operator: 'EQ', value: 'Start Date' },
                { propertyName: 'start_date', operator: 'GTE', value: DateTime.local().minus({ weeks: 1 }).toMillis()},
                { propertyName: 'currently_enrolling', operator: 'NEQ', value: 'No' },
              ]
            },
          ],
          properties: ['subject', 'canonical_company_id', 'start_date', 'hs_object_id', 'currently_enrolling', 'days', 'start_time', 'end_time'],
          sorts: ['start_date'],
        after, limit: 100 })
      })).json()
      objects = json.results ? [...objects, ...json.results] : objects;
      after = json.paging ? (json.paging.next ? json.paging.next.after : null) : null;
      console.log('start dates', objects.length)
      await Timeout.set(3000);
    } while (after);
    objects = objects.map(object => {
      let days = ''
      if(object.properties.days){
        days = object.properties.days.split(';')
        days = days.map(day => day + 's')
        days = days.join('/')
      }
      let endTime = ''
      let startTime = ''
      if(object.properties.start_time && object.properties.end_time){
        startTime = object.properties.start_time.split(':');
        startTime = DateTime.fromISO(`${('0' + startTime[0]).slice(-2)}:${startTime[1]}`).toFormat('h:mm a');
        endTime = object.properties.end_time.split(':');
        endTime = DateTime.fromISO(`${('0' + endTime[0]).slice(-2)}:${endTime[1]}`).toFormat('h:mm a')
      }
      return {
        name: object.properties.subject,
        hubspot_ticket_id: object.properties.hs_object_id,
        start_date: object.properties.start_date,
        currently_enrolling: object.properties.currently_enrolling,
        company_id: object.properties.canonical_company_id,
        days: days,
        start_time: startTime,
        end_time: endTime
      }
    })
    objects = groupBy(objects, 'company_id')
    writeFileSync('_data/startDates.yml', safeDump(objects));
    return objects;
  }catch (error) {
    console.log(error);
  }
}

fetchStartDates();
