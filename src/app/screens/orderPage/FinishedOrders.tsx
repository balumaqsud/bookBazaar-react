import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";
import { Order, OrderItem } from "../../../libs/types/order";
import { Typography } from "@mui/joy";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

const FinishedOrders = () => {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        height={"40px"}
                        width={"30px"}
                        className="order-dish-img"
                        alt="dish"
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography level="body-lg" color="success">
                          {product.productName}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography level="body-sm" color="neutral">
                            ${item.itemPrice}
                          </Typography>
                          <Typography
                            level="body-sm"
                            color="neutral"
                            sx={{ ml: 1 }}
                          >
                            {item.itemQuantity}x
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price">
                <Typography level="body-md" color="neutral">
                  Book Price: ${order.orderTotal - order.orderDelivery}
                </Typography>
                <Typography level="body-md" color="neutral">
                  Delivery cost: ${order.orderDelivery}
                </Typography>
                <Typography level="body-md" color="neutral">
                  Total: ${order.orderTotal}
                </Typography>
              </Box>
            </Box>
          );
        })}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/images/book1.jpg"}
                style={{ width: 300, height: 300 }}
                alt=""
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
};

export default FinishedOrders;
