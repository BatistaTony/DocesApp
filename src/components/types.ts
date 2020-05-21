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
  img: string;
  username: string;
  address: string;
  phonenumber: string;
}

export interface cartType {
  user: userType;
  prods?: Array<ItemType>;
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
