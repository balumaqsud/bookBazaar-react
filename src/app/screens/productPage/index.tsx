import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { CardItem } from "../../../libs/types/search";

interface ProductsPageProps {
  onAdd: (item: CardItem) => void;
}

const ProductsPage = (props: ProductsPageProps) => {
  const { onAdd } = props;
  const products = useRouteMatch();
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
};

export default ProductsPage;
