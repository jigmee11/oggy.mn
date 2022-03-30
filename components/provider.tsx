import axios from "axios";
import Cookies from "js-cookie";
import React, {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export interface itemType {
  name: string;
  category: string;
  price: number;
  img: string;
}

type ContextType = {
  count: Number;
  setCount: Dispatch<SetStateAction<number>>;
  products: itemType[];
  setProducts: Dispatch<SetStateAction<itemType[]>>;
  token: String | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};

export const Context = createContext<ContextType>({
  count: 0,
  setCount: () => void 0,
  products: [],
  setProducts: () => void 0,
  token: "",
  setToken: () => void 0,
});

export const Provider: FC = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  const [products, setProducts] = useState<itemType[]>([]);
  const [token, setToken] = useState(Cookies.get("token"));
  const update = async () => {
    const token = Cookies.get("token");
    const data = await (
      await axios.post("http://localhost:3000/myproducts", { token: token })
    ).data;
    setCount(data.length);
    setProducts(data);
  };
  return (
    <Context.Provider
      value={{ count, setCount, products, setProducts, token, setToken }}
    >
      {children}
    </Context.Provider>
  );
};
