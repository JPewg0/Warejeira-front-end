# STAGE 1: Build da aplicação
FROM node:21-alpine as builder

# Diretório de trabalho
WORKDIR /app

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build da aplicação em modo produção
RUN npm run build

# STAGE 2: Servidor web com apenas os arquivos de build
FROM nginx:alpine

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar arquivos de build do stage anterior
COPY --from=builder /app/dist/warejeira  /usr/share/nginx/html/

# Expor porta 80
EXPOSE 80

# Iniciar nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
