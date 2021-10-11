const fetch = require('node-fetch');
const { DateTime } = require('luxon');
const typeformUrl = 'https://api.typeform.com/forms';
const workspaceIds = {
  parent: 'HQ2eHx',
  children_coding: 'eUAwCt',
  children_dev: 'v9fyUJ'
};
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.TYPEFORM_TOKEN}`
};

const getForm = async formId => {
  const form = await (await fetch(`${typeformUrl}/${formId}`)).json();
  return form;
};

const getForms = async workspaceId => {
  const options = {
    method: 'GET',
    headers
  };
  const forms = await (await fetch(`${typeformUrl}?page_size=200&workspace_id=${workspaceId}`, options)).json();
  return forms;
};

const updateForm = async (formId, form) => {
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(form)
  };
  const updatedForm = await (await fetch(`${typeformUrl}/${formId}`, options)).json();
  updatedForm.code ? console.log(`${form.variables.school_key}: ${JSON.stringify(updatedForm, null, 2)}`) : console.log(form.variables.school_key);
};

// const assignDateQualifier = (startDateObj, schoolType) => {
//   let dateFilter;
//   if (schoolType === 'Dental') dateFilter = 12727400;
//   else if (schoolType === 'Medical') dateFilter = 31557600;
//   const { start_date, full } = startDateObj;
//   const now = (new Date().getTime() / 1000);
//   const date = (DateTime.fromISO(start_date).valueOf() / 1000);
//   const futureLimit = now + dateFilter;
//   const pastLimit = now - 604800;
//   const afterLimit = now + 604800;
//   const fourWeeksPast = now - 2419200;
//   let qualifier;
//   if (full || (date <= now && date <= afterLimit)) qualifier = 'Class full!';
//   else if (date >= now && date <= afterLimit && (schoolType === 'Dental' || schoolType === 'Medical')) qualifier = 'Few seats left!';
//   return qualifier;
// };

const createVariableLogic = (fieldRef, choiceRef, variable, value) => {
  const logic = {
    action: 'set',
    details: {
      target: {
        type: 'variable',
        value: variable
      },
      value: {
        type: 'constant',
        value: value ? value : choiceRef
      }
    },
    condition: {
      op: 'is',
      vars: [
        { 
          type: 'field',
          value: fieldRef
        },
        {
          type: 'choice',
          value: choiceRef
        }
      ]
    }
  };
  return logic;
};

// const skipPaymentLogic = {
//   action: "jump",
//   details: {
//     to: {
//       type: "thankyou",
//       value: "01F8D6ED9JRA3V6RY3DTFC1QPV"
//     }
//   },
//   condition: {
//     op: "always",
//     vars: []
//   }
// };

const updateStartDates = async startDates => {
  const { items } = await getForms(workspaceIds.children_coding);
  for (const { id } of items) {
    const form = await getForm(id);
    const { fields, logic, variables } = form;
    const { school_type, getaccept_entity_id } = variables;
    const startDateFields = fields.filter(field => field.title.split(' ').includes('Start'));
    startDateFields.forEach(startDateField => {
      const { choices } = startDateField.properties;
      const { actions } = logic.find(logicObj => logicObj.ref === startDateField.ref);
      const getAcceptLogic = !getaccept_entity_id ? actions.pop() : null;
      choices.splice(0);
      actions.splice(0);
      delete startDateField.properties.description;
      let description = '';
      const currentStartDates = startDates[startDateField.ref];
      if (currentStartDates) {
        let i = 0;
        let max = currentStartDates.length < 6 ? currentStartDates.length : 6;
        while (i < max) {
          const startDate = currentStartDates[i];
          const { hubspot_ticket_id, start_date, start_time, end_time } = startDate;
          const startDatePretty = DateTime.fromISO(start_date).toLocaleString(DateTime.DATE_FULL);
          const label = `${startDatePretty} (${start_time}-${end_time})`;
          choices.push({
            ref: hubspot_ticket_id,
            label
          })
          actions.push(createVariableLogic(startDateField.ref, hubspot_ticket_id, 'start_date_ticket_id'));
          if (!getaccept_entity_id) actions.push(getAcceptLogic);
          i++;
        }
        if (description) startDateField.properties.description = description;
      }
      if (!choices.length) {
        choices.push({
          ref: '306210152',
          label: 'Add me to a waitlist!'
        })
        actions.push(createVariableLogic(startDateField.ref, '306210152', 'start_date_ticket_id'), skipPaymentLogic);
      }
    })
    updateForm(id, form);
    // console.log('form: ', JSON.stringify(form.logic, null, 2));
  }
};

module.exports = {
  updateStartDates
};