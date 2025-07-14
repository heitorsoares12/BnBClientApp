export interface User {
  name: {
    first: string;
    last: string;
  };
  phone: string;
  email: string; // Adicionado
  picture: {
    large: string;
    thumbnail: string;
  };
  location: {
    coordinates: {
      latitude: string;
      longitude: string;
    };
    city?: string;
  };
  login: {
    uuid: string; // Adicionado para identificador único
  };
}
