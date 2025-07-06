import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Input from "@mui/joy/Input";
import {
  Card,
  CardContent,
  CardCover,
  CardOverflow,
  Chip,
  CssVarsProvider,
} from "@mui/joy";
import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../libs/config";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../libs/types/product";
import { createSelector } from "reselect";
import { ProductCategory } from "../../../libs/data/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CardItem } from "../../../libs/types/search";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../../../css/product.css";

//REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
//selector
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CardItem) => void;
}
const Products = (props: ProductsProps) => {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    const products = new ProductService();
    products
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  //handlers
  const productSortHandler = (category: ProductCategory) => {
    productSearch.page = 1;
    productSearch.productCategory = category;
    setProductSearch({ ...productSearch });
  };

  const productOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };
  //search handler
  const productSearchHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  //pagination
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  //chosen product detail page
  const chosenProductHandler = (productId: string) => {
    history.push(`/books/${productId}`);
  };

  const clearCategoryHandler = () => {
    productSearch.page = 1;
    delete productSearch.productCategory; // ❗ Remove the category key
    setProductSearch({ ...productSearch });
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-box">
            <Typography
              level="h2"
              color="success"
              sx={{ maxWidth: 480, lineHeight: 2 }}
            >
              Book Bazaar
            </Typography>
            <div className="search">
              <CssVarsProvider>
                <Input
                  type="search"
                  sx={{ width: "90%" }}
                  placeholder="Search a book"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") productSearchHandler();
                  }}
                />
              </CssVarsProvider>
              <Button
                variant="plain"
                color={"success"}
                onClick={productSearchHandler}
              >
                <SearchIcon />
                Search
              </Button>
            </div>
          </Stack>
          <Stack className="filter-section">
            <Stack className="filter-box">
              <Dropdown>
                <MenuButton>Category...</MenuButton>
                <Button
                  color="neutral"
                  size="sm"
                  onClick={clearCategoryHandler}
                  variant="plain"
                >
                  <RefreshIcon />
                </Button>
                <Menu>
                  <MenuItem>
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory === ProductCategory.KIDS
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.KIDS);
                      }}
                    >
                      KIDS
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory === ProductCategory.HORROR
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.HORROR);
                      }}
                    >
                      HORROR
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory ===
                        ProductCategory.FANTASY
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.FANTASY);
                      }}
                    >
                      FANTASY
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory ===
                        ProductCategory.ADVENTURE
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.ADVENTURE);
                      }}
                    >
                      ADVENTURE
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory === ProductCategory.POETRY
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.POETRY);
                      }}
                    >
                      POETRY
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory ===
                        ProductCategory.SCIENCE_FICTION
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.SCIENCE_FICTION);
                      }}
                    >
                      SCIENCE_FICTION
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory ===
                        ProductCategory.ROMANCE
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.ROMANCE);
                      }}
                    >
                      ROMANCE
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory ===
                        ProductCategory.HISTORY
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.HISTORY);
                      }}
                    >
                      HISTORY
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    {" "}
                    <Button
                      sx={{ width: "100%" }}
                      variant="plain"
                      color={
                        productSearch.productCategory ===
                        ProductCategory.THRILLER
                          ? "neutral"
                          : "success"
                      }
                      onClick={() => {
                        productSortHandler(ProductCategory.THRILLER);
                      }}
                    >
                      THRILLER
                    </Button>
                  </MenuItem>
                </Menu>
              </Dropdown>
              <Button
                variant="plain"
                color={
                  productSearch.order === "createdAt" ? "neutral" : "success"
                }
                className="order"
                onClick={() => {
                  productOrderHandler("createdAt");
                }}
              >
                New
              </Button>
              <Button
                variant="plain"
                color={
                  productSearch.order === "productPrice" ? "neutral" : "success"
                }
                className="order"
                onClick={() => {
                  productOrderHandler("productPrice");
                }}
              >
                Price
              </Button>
              <Button
                variant="plain"
                color={
                  productSearch.order === "productView" ? "neutral" : "success"
                }
                className="order"
                onClick={() => {
                  productOrderHandler("productView");
                }}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="products-wrapper">
              {products.length !== 0 ? (
                products.map((ele: Product) => {
                  const imagePath = `${serverApi}/${ele.productImages[0]}`;
                  return (
                    <Card
                      key={ele._id}
                      className="product-card"
                      onClick={() => chosenProductHandler(ele._id)}
                      sx={{
                        minHeight: "340px",
                        "&:hover": {
                          transform: "scale(1.05)",
                          transition: "transform 0.6s ease",
                        },
                      }}
                    >
                      <CardCover>
                        <img src={imagePath} loading="lazy" alt="book_image" />
                      </CardCover>
                      <CardCover
                        sx={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                        }}
                      />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Typography level="title-lg" textColor="#fff">
                          {ele.productName}
                        </Typography>
                        <Typography textColor="neutral.300">
                          {ele.productCategory}
                          <Chip
                            component="span"
                            size="sm"
                            variant="solid"
                            color="success"
                            sx={{ marginLeft: 0.7, marginBottom: 0.2 }}
                          >
                            {ele.productView} views
                          </Chip>
                        </Typography>
                      </CardContent>

                      <CardOverflow>
                        <Button
                          variant="solid"
                          color="danger"
                          size="lg"
                          onClick={(e) => {
                            console.log("clicked");
                            onAdd({
                              _id: ele._id,
                              quantity: 1,
                              name: ele.productName,
                              price: ele.productPrice,
                              image: ele.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          Add to cart
                        </Button>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Typography level="h2" color="success" sx={{ marginTop: 10 }}>
                  No products available yet
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Products;
