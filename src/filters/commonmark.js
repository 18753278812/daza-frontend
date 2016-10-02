import commonmark from 'commonmark';

module.exports = (value) => {
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(value);
  // transform parsed if you like...
  const result = writer.render(parsed);
  return result;
};
