# app/Dockerfile

# --- Tầng 1: "Build" (Xây dựng) ---
# Tầng này dùng Node.js để cài đặt và "build" code React
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Lệnh này sẽ tạo ra thư mục /app/build chứa code tĩnh
RUN npm run build

# --- Tầng 2: "Serve" (Phục vụ) ---
# Tầng này chỉ lấy kết quả từ tầng 1 và phục vụ nó
# Chúng ta dùng 1 server siêu nhẹ tên là 'serve'
FROM node:18-alpine

# Cài đặt server 'serve'
RUN npm install -g serve

WORKDIR /app

# Copy *chỉ* thư mục "build" từ tầng 1 sang
COPY --from=build-stage /app/build .

EXPOSE 3000

# Lệnh khởi động: serve -s . -l 3000
# (Phục vụ thư mục hiện tại trên cổng 3000)
CMD [ "serve", "-s", ".", "-l", "3000" ]