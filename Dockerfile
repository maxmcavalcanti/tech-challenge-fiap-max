# Use a base image do Node.js
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

RUN npm install -g ts-node-dev

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Expõe a porta 3000 do contêiner
EXPOSE 3000

# Define o comando padrão a ser executado quando o contêiner for iniciado
CMD ["npm", "start"]
