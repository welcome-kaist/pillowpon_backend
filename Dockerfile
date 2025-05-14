FROM node:20

# 앱 디렉토리 생성
RUN mkdir -p /var/app
WORKDIR /var/app

# package.json과 package-lock.json만 먼저 복사
COPY package*.json ./

# 의존성 설치 (이 레이어는 캐시 가능)
RUN npm install

# 나머지 소스 복사 (이전 레이어 캐시 유지)
COPY . .

# 빌드 및 실행
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]