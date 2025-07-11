export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
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
    uuid: string;
  };
}
