let fields;

export function showEvents(config) {
  const events = ['app.record.create.show', 'app.record.edit.show'];
  fields = config.getFieldRow();

  return {
    binding: () => {
      kintone.events.on(events, handleEvents);
    },
  };
}

function handleEvents(event) {
  enableFieldRow(event.record, fields);
  return event;
}

function enableFieldRow(record) {
  fields.forEach((fieldCode) => {
    record[fieldCode].disabled = false;
  });
}
