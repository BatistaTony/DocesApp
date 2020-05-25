export interface ItemType {
  img: string;
  name: string;
  price: number;
  isLoved: boolean;
  lovers: number;
  type: string;
  key: string;
  quantity?: number;
}

export interface userType {
  phonenumber: string;
  location: {
    coords: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface cartType {
  prods: Array<ItemType>;
}

export interface storyType {
  url: string;
  text: {
    valueText: string;
    styleText: {
      color: string;
      background: string;
    };
  };
}
