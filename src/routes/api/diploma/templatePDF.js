export default data => {
  let content = [];
  let body = [];
  Object.keys(data).forEach(item => {
    body.push([item, data[item]]);
  });
  content.push({ text: 'Chứng chỉ bằng toeic', style: 'header' });
  content.push('Do trường đại học bách khoa hà nội cung cấp');
  content.push({ style: 'tableExample', table: { body: body } });
  const dd = {
    content: content,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      }
    }
  };
  return dd;
};