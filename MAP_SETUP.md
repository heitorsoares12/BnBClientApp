# Configurando o Mapa com Mapbox

Esta versão utiliza `@rnmapbox/maps`, que exibe mapas com dados do OpenStreetMap e não depende de chaves da Google.

## 1. Instalação

Execute:
```bash
npm install @rnmapbox/maps
```
Depois rode `npx pod-install` dentro da pasta `ios` para atualizar os pods.

## 2. Remover implementações anteriores (opcional)

Se houver referências ao `react-native-maps` ou ao `react-native-map-clustering`, remova-as do `package.json` e das importações do projeto.

## 3. Ajuste no AndroidManifest

O projeto já declara as permissões básicas de internet e localização em `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
Nenhuma configuração extra é necessária para o OpenStreetMap.

Depois de instalar as dependências, rode `npx pod-install` no diretório `ios` para atualizar os pods.

