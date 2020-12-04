const fetch = require('node-fetch');
const { DateTime } = require('luxon');
const Timeout = require('await-timeout');
const { safeDump } = require('js-yaml');
const { writeFileSync } = require('fs');
const { groupBy } = require('lodash');

const fetchStartDates = async () => {
  try {
    let after = 0;
    // let objects = [];
    // do {
    //   const json = await (await fetch(`https://api.hubapi.com/crm/v3/objects/tickets/search?hapikey=${process.env.HUBSPOT_API_KEY}`, {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify({
    //       filterGroups: [
    //         {
    //           filters: [
    //             { propertyName: 'type', operator: 'EQ', value: 'Start Date' },
    //             { propertyName: 'start_date', operator: 'GTE', value: DateTime.local().minus({ weeks: 1 }).toMillis()},
    //             { propertyName: 'currently_enrolling', operator: 'NEQ', value: 'No' },
    //           ],
    //           filters: [{ propertyName: 'cohort_start', operator: 'EQ', value: 'true' },]
    //         },
    //       ],
    //       properties: ['subject', 'canonical_company_id', 'start_date', 'hs_object_id', 'currently_enrolling', 'cohort_start', 'course_type', 'course_subject', 'course_length', 'days', 'start_time', 'end_time'],
    //       sorts: ['start_date'],
    //     after, limit: 100 })
    //   })).json()
    //   objects = json.results ? [...objects, ...json.results] : objects;
    //   after = json.paging ? (json.paging.next ? json.paging.next.after : null) : null;
    //   await Timeout.set(3000);
    // } while (after);
    let objects = await ( await fetch('https://zql.zollege.com/api/5fca53b3d56aff00203dbc15?apiKey=f40aa249-2f29-49ac-9379-cdba5cd2c72d&format=json')).json();
    objects = objects.results.map(object => {
      let days = ''
      if(object.days){
        days = object.days.split(';')
        days = days.map(day => day + 's')
        days = days.join('/')
      }
      let endTime = ''
      let startTime = ''
      if(object.start_time && object.end_time){
        startTime = object.start_time.split(':');
        startTime = DateTime.fromISO(`${('0' + startTime[0]).slice(-2)}:${startTime[1]}`).toFormat('h:mm a');
        endTime = object.end_time.split(':');
        endTime = DateTime.fromISO(`${('0' + endTime[0]).slice(-2)}:${endTime[1]}`).toFormat('h:mm a')
      }
      return {
        name: object.subject,
        hubspot_ticket_id: object.hs_object_id,
        start_date: object.start_date,
        currently_enrolling: object.currently_enrolling,
        company_id: object.canonical_company_id,
        cohort_start: object.cohort_start,
        course_type: object.course_type,
        course_subject: object.course_subject,
        course_length: object.course_length,
        days: days,
        start_time: startTime,
        end_time: endTime
      }
    })
    objects = groupBy(objects, 'company_id')
    // console.log(objects)
    writeFileSync('_data/startMates.yml', safeDump(objects));
    return objects;
  }catch (error) {
    console.log(error);
  }
}

fetchStartDates();
