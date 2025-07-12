# Configurando o Mapa com OpenStreetMap

Este projeto utiliza `react-native-maps` com tiles do OpenStreetMap e `react-native-map-clustering` para agrupamento de marcadores.

## 1. Remover Mapbox

1. Desinstale a dependência:
   ```bash
   npm uninstall @rnmapbox/maps
   ```
2. Remova qualquer referência do Mapbox nos arquivos nativos:
   - `android/settings.gradle` – exclua o repositório Mapbox.
   - `android/app/build.gradle` – remova campos relacionados a `MAPBOX_ACCESS_TOKEN`.
   - `ios/Podfile` – exclua as linhas referentes ao script do Mapbox.

## 2. Instalar novas bibliotecas

Execute:
```bash
npm install react-native-maps react-native-map-clustering
```
Essas bibliotecas funcionam em ambas as plataformas sem necessidade de chaves de API.

## 3. Ajuste no AndroidManifest

O projeto já declara as permissões básicas de internet e localização em `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
Nenhuma configuração extra é necessária para o OpenStreetMap.

Depois de instalar as dependências, rode `npx pod-install` no diretório `ios` para atualizar os pods.

