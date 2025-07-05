import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import React from "react";

//for redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../libs/types/product";
import { Messages, serverApi } from "../../../libs/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { sweetErrorHandling } from "../../../libs/sweetAlerts";
import { T } from "../../../libs/types/common";
import { OrderStatus } from "../../../libs/data/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { Button, Typography } from "@mui/joy";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

interface PausedProps {
  setValue: (input: string) => void;
}

const PausedOrders = (props: PausedProps) => {
  const { setValue } = props;
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();
  console.log("this", pausedOrders);

  //hanlders
  const deleteHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirm = window.confirm("wanna delete");

      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        //rebuild logic
        setOrderBuilder(new Date());
      }
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  const processHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirm = window.confirm("wanna proceed");

      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        //rebuild logic
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
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
                  Book Price:
                </Typography>
                <Typography level="body-md" color="neutral" sx={{ mr: 3 }}>
                  ${order.orderTotal - order.orderDelivery}
                </Typography>
                <Typography level="body-md" color="neutral">
                  Delivery cost:
                </Typography>
                <Typography level="body-md" color="neutral" sx={{ mr: 3 }}>
                  ${order.orderDelivery}
                </Typography>
                <Typography level="body-md" color="neutral">
                  Total:
                </Typography>
                <Typography level="body-md" color="neutral" sx={{ mr: 3 }}>
                  ${order.orderTotal}
                </Typography>

                <Button
                  value={order._id}
                  variant="outlined"
                  color="warning"
                  onClick={deleteHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="outlined"
                  color="success"
                  onClick={processHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
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

export default PausedOrders;
