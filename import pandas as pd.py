import pandas as pd

# Đọc dữ liệu từ file CSV
data = pd.read_csv('steamdata.csv')

# Làm sạch dữ liệu và loại bỏ các hàng có giá trị thiếu (NaN)
data = data.dropna()

# Loại bỏ các dòng trùng lặp
data = data.drop_duplicates()

# Chia dữ liệu thành tập huấn luyện và tập kiểm tra (80% - 20%)
train_data = data.sample(frac=0.8, random_state=1)
test_data = data.drop(train_data.index)

# Lưu tập huấn luyện vào file CSV
train_data.to_csv('train_data.csv', index=False)

# Lưu tập kiểm tra vào file CSV
test_data.to_csv('test_data.csv', index=False)