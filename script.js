// Đọc file CSV
function readCSV(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = () => reject(new Error(xhr.statusText));
    xhr.send();
  });
}

// Chuyển đổi dữ liệu CSV thành mảng đối tượng
function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j];
      }
      data.push(obj);
    }
  }
  return data;
}

// Tìm kiếm game
function searchGame(keyword, data) {
  const results = data.filter((game) => game.Name.toLowerCase().includes(keyword.toLowerCase()));
  return results;
}

// Hiển thị kết quả tìm kiếm
function displayResults(results) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchResults.textContent = 'Không tìm thấy kết quả phù hợp.';
    return;
  }

  const table = document.createElement('table');
  const headers = ['Tên game', 'Tháng', 'Người chơi trung bình', 'Gain', '% Gain', 'Số người chơi thời điểm đó'];
  const headerRow = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  results.forEach((game) => {
    const row = document.createElement('tr');
    headers.forEach((header) => {
      const td = document.createElement('td');
      td.textContent = game[header];
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  searchResults.appendChild(table);
}

// Xử lý sự kiện khi nhập từ khóa tìm kiếm
document.getElementById('search-input').addEventListener('keyup', async (event) => {
  if (event.key === 'Enter') {
    const keyword = event.target.value;
    const csv = await readCSV('test_data.csv');
    const data = parseCSV(csv);
    const results = searchGame(keyword, data);
    displayResults(results);
  }
});
