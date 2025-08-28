import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { setChosenProduct, setAdmin } from "./slice";
import { Product } from "../../../libs/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveAdmin } from "./selector";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { useParams } from "react-router-dom";
import { Member } from "../../../libs/types/member";
import { serverApi } from "../../../libs/config";
import { CardItem } from "../../../libs/types/search";
import { Chip, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";

//REDUX SLICE define
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setAdmin(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
//selector define
const restaurantRetriever = createSelector(retrieveAdmin, (admin) => ({
  admin,
}));
const chosenProductRetriever = createSelector(retrieveChosenProduct, (ele) => ({
  ele,
}));

interface ChosenProductProps {
  onAdd: (item: CardItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  console.log("here", productId);
  //slice call, sets the redux data
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());

  //chosen product detail page

  // setting data for redux
  useEffect(() => {
    const product = new ProductService();
    const member = new MemberService();

    product
      .getProduct(productId)
      .then((data) => {
        setChosenProduct(data);
      })
      .catch((err) => console.log(err));
    member
      .getAdmin()
      .then((data) => {
        setRestaurant(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //selector call, gets the redux data
  const { admin } = useSelector(restaurantRetriever);
  const { ele } = useSelector(chosenProductRetriever);

  if (!ele) return null;
  const imagePath = `${serverApi}/${ele.productImages[0]}`;
  return (
    <div className="chosen-frame">
      <Typography
        level="h2"
        color="success"
        sx={{ maxWidth: 480, lineHeight: 2 }}
      >
        Product Detail
      </Typography>
      <Container className="chosen-container">
        <Stack className="product-box">
          <Box className="product-image" sx={{ height: 560 }}>
            <Stack className={"chosen-product-slider"}>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-area"
              >
                {ele?.productImages.map((ele: string, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={`${serverApi}/${ele}`} alt="" />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Stack>
          </Box>
          <Box className="product-detail">
            <Typography color="neutral" level="body-lg">
              {ele.productCategory}
            </Typography>
            <Chip component="span" size="md" variant="soft" color="success">
              {ele.productType}
            </Chip>
            <Chip
              component="span"
              size="md"
              variant="soft"
              color="success"
              sx={{ ml: 1 }}
            >
              {ele.productView} views
            </Chip>
            <Typography level="h2" fontWeight={600}>
              {ele.productName}
            </Typography>

            <Typography level="body-md">{ele.productDesc}</Typography>
            <Typography
              variant="soft"
              level="body-md"
              color="success"
              sx={{ mt: 1 }}
            >
              Store: {admin?.memberNick}. Email: {admin?.memberEmail}
            </Typography>
            <Box className="product-low">
              <p>${ele.productPrice}</p>
              <Button
                size="lg"
                variant={"soft"}
                color="warning"
                onClick={(e: any) => {
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
                Add to Card
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
