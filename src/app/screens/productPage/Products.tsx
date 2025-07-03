import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy";
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
  const [productSearch, setProductSearch] = useState({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCategory: ProductCategory.HISTORY,
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
  const chosenProductHandler = (id: string) => {
    history.push(`/books/${id}`);
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
                variant="soft"
                color={"success"}
                onClick={productSearchHandler}
              >
                <SearchIcon />
                Search
              </Button>
            </div>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="soft"
                color={
                  productSearch.order === "createdAt" ? "neutral" : "warning"
                }
                className="order"
                onClick={() => {
                  productOrderHandler("createdAt");
                }}
              >
                New
              </Button>
              <Button
                variant="soft"
                color={
                  productSearch.order === "productPrice" ? "neutral" : "warning"
                }
                className="order"
                onClick={() => {
                  productOrderHandler("productPrice");
                }}
              >
                Price
              </Button>
              <Button
                variant="soft"
                color={
                  productSearch.order === "productView" ? "neutral" : "warning"
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
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant="soft"
                  color={
                    productSearch.productCategory === ProductCategory.KIDS
                      ? "neutral"
                      : "warning"
                  }
                  onClick={() => {
                    productSortHandler(ProductCategory.KIDS);
                  }}
                >
                  KIDS
                </Button>
                <Button
                  variant="soft"
                  color={
                    productSearch.productCategory === ProductCategory.HORROR
                      ? "neutral"
                      : "warning"
                  }
                  onClick={() => {
                    productSortHandler(ProductCategory.HORROR);
                  }}
                >
                  HORROR
                </Button>
                <Button
                  variant="soft"
                  color={
                    productSearch.productCategory === ProductCategory.FANTASY
                      ? "neutral"
                      : "warning"
                  }
                  onClick={() => {
                    productSortHandler(ProductCategory.FANTASY);
                  }}
                >
                  FANTASY
                </Button>
                <Button
                  variant="soft"
                  color={
                    productSearch.productCategory === ProductCategory.ADVENTURE
                      ? "neutral"
                      : "warning"
                  }
                  onClick={() => {
                    productSortHandler(ProductCategory.ADVENTURE);
                  }}
                >
                  ADVENTURE
                </Button>
                <Button
                  variant="soft"
                  color={
                    productSearch.productCategory === ProductCategory.POETRY
                      ? "neutral"
                      : "warning"
                  }
                  onClick={() => {
                    productSortHandler(ProductCategory.POETRY);
                  }}
                >
                  POETRY
                </Button>
              </div>
            </Stack>
            <Stack className="products-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chosenProductHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">
                          {product.productType}
                        </div>
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            console.log("clicked");
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                            alt="Cart"
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productView}
                            color="warning"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productView === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">No products available yet</Box>
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
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Container className={"brands"}>
          <Box className={"category-title"}>Our family brands</Box>
          <Stack className={"brand-list"}>
            <Box className={"review-box"}>
              <img src={"/img/gurme.webp"} alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/sweets.webp"} alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/seafood.webp"} alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/doner.webp"} alt="" />
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              title="unique"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d52439.55492114084!2d127.66387910076521!3d34.76888656098249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d34.7685234!2d127.70557059999999!4m3!3m2!1d34.769263599999995!2d127.7045868!5e0!3m2!1sen!2skr!4v1745401733570!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default Products;
