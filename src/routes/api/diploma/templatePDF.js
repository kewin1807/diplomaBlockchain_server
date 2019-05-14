export default data => {
  let table = "<table>";
  Object.keys(data).forEach(item => {
    table += `<tr><td>${item}</td><td>${data[item]}</td></tr>`;
  });
  table += `</table>`;
  return `<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
  </head>
  <body>${table}</body>
  </html>`;
};
