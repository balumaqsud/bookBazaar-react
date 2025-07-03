import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import { CardItem } from "../../../libs/types/search";
import "../../../css/product.css";

interface ProductsPageProps {
  onAdd: (item: CardItem) => void;
}

const ProductsPage = (props: ProductsPageProps) => {
  const { onAdd } = props;
  const books = useRouteMatch();
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${books.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${books.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
};

export default ProductsPage;
