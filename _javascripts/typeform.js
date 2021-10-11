const fetch = require('node-fetch');
const { DateTime } = require('luxon');
const typeformUrl = 'https://api.typeform.com/forms';
const workspaceIds = {
  children_coding: 'eUAwCt',
  children_coding_dev: 'v9fyUJ'
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

const skipPaymentLogic = {
  action: "jump",
  details: {
    to: {
      type: "thankyou",
      value: "01F8D6ED9JRA3V6RY3DTFC1QPV"
    }
  },
  condition: {
    op: "always",
    vars: []
  }
};

const updateStartDates = async startDates => {
  const { items } = await getForms(workspaceIds.children_coding);
  for (const { id } of items) {
    const form = await getForm(id);
    const { fields, logic, variables } = form;
    const { getaccept_entity_id } = variables;
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
          if (startDate.full) description += `${label}\n`;
          else choices.push({
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
  }
};

module.exports = {
  updateStartDates
};