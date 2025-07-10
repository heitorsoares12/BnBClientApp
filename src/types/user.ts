export interface User {
  name: {
    first: string;
    last: string;
  };
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
}
