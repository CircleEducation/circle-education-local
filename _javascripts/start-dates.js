const fetch = require('node-fetch');
const { DateTime } = require('luxon');
const { safeDump } = require('js-yaml');
const { writeFileSync } = require('fs');
const { groupBy } = require('lodash');

const fetchStartDates = async () => {
  try {
    let objects = await ( await fetch(process.env.ZQL_START_DATES_URL)).json();
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
        course_type: object.course_type ? object.course_type.replace('NULL', "'") : object.course_type,
        course_subject: object.course_subject,
        course_length: object.course_length,
        days: days,
        start_time: startTime,
        end_time: endTime,
        tbd: object.hs_pipeline_stage === '1597876' ? true : false
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
