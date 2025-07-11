import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { useUsers } from '../../contexts/UsersContext';
import { User } from '../../types/user';
import ClientModal from './components/ClientModal';
import { FeatureCollection, Point } from 'geojson';

MapboxGL.setAccessToken('SUA_CHAVE_DE_ACESSO_PUBLICA_DO_MAPBOX');

const layerStyles = {
  // Estilo para os clusters (círculos verdes)
  cluster: {
    circleColor: '#0B4B3C',
    circleRadius: 20,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },
  // Estilo para a contagem de pontos dentro do cluster
  clusterCount: {
    textField: ['get', 'point_count'],
    textSize: 12,
    textColor: 'white',
  },
  // Estilo para o ponto individual (quando não está em um cluster)
  singlePoint: {
    iconImage: ['get', 'avatar'], // Pega a URL do avatar da propriedade do ponto
    iconSize: 0.5,
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
  },
};

const MapScreen = () => {
  const { users } = useUsers();
  const [modalUser, setModalUser] = useState<User | null>(null);

  // Converte a lista de usuários para o formato GeoJSON, que o Mapbox entende.
  // Usamos useMemo para performance, evitando recalcular isso a cada renderização.
  const geoJsonSource = useMemo((): FeatureCollection<Point> => {
    return {
      type: 'FeatureCollection',
      features: users.map(user => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            Number(user.location.coordinates.longitude),
            Number(user.location.coordinates.latitude),
          ],
        },
        properties: {
          // Passamos os dados do usuário para as propriedades do ponto
          user,
          avatar: user.picture.thumbnail, // Usado pelo estilo 'singlePoint'
        },
      })),
    };
  }, [users]);

  // Função chamada ao pressionar um ponto no mapa
  const onPointPress = (event: any) => {
    const feature = event.features[0];
    if (feature.properties.cluster) {
      // Se for um cluster, não faz nada (o mapa dá zoom por padrão)
      return;
    }
    // Se for um ponto único, pega os dados do usuário e abre o modal
    const user = JSON.parse(feature.properties.user);
    setModalUser(user);
  };

  return (
    <View style={styles.page}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        logoPosition={{ bottom: 10, left: 10 }}
      >
        <MapboxGL.Camera
          zoomLevel={4}
          centerCoordinate={[-51.9, -14.2]}
          animationMode="flyTo"
          animationDuration={0}
        />

        {/* A fonte de dados (nossos usuários em formato GeoJSON) */}
        <MapboxGL.ShapeSource
          id="clientsSource"
          shape={geoJsonSource}
          cluster={true} // A MÁGICA DO CLUSTER ACONTECE AQUI
          clusterRadius={50}
          onPress={onPointPress}
        >
          {/* Camada para renderizar os pontos individuais */}
          <MapboxGL.SymbolLayer
            id="singlePointLayer"
            filter={['!has', 'point_count']} // Filtro para mostrar apenas pontos que NÃO são clusters
            style={layerStyles.singlePoint}
          />

          {/* Camada para renderizar os clusters */}
          <MapboxGL.CircleLayer
            id="clusterLayer"
            filter={['has', 'point_count']} // Filtro para mostrar apenas pontos que SÃO clusters
            style={layerStyles.cluster}
          />

          {/* Camada para renderizar a contagem dentro dos clusters */}
          <MapboxGL.SymbolLayer
            id="clusterCountLayer"
            filter={['has', 'point_count']}
            style={layerStyles.clusterCount}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>

      {/* O ClientModal pode ser 100% reaproveitado! */}
      <ClientModal user={modalUser} onClose={() => setModalUser(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;