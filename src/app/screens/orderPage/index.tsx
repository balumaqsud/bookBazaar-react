import { Container, Stack, Box, Typography } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../libs/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../libs/data/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { MemberStatus, MemberType } from "../../../libs/data/enums/member.enum";
//REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const OrderPage = () => {
  const { authMember } = useGlobals();
  const history = useHistory();
  if (!authMember) history.push("/");
  //calling action dispatch
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  //here
  useEffect(() => {
    const order = new OrderService();
    order
      .getOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs example"
                  className="order_list"
                >
                  <Tab label="Paused Orders" value={"1"} />
                  <Tab label="Process Orders" value={"2"} />
                  <Tab label="Finished Orders" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Box className="order-box-info">
            <Box className="member-box">
              <div className="user-image">
                <img
                  src={
                    authMember?.memberImage
                      ? authMember.memberImage
                      : "/icons/default-user.svg"
                  }
                  alt=""
                  className={"order-user-avatar"}
                />
                <div className="order-user-icon-box">
                  <img
                    src={
                      authMember?.memberType === MemberType.RESTAURANT
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    alt=""
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <Typography className="user-name">
                {authMember?.memberNick}
              </Typography>
              <p className="user-type">{authMember?.memberType}</p>
              <div className="line"></div>
              <div className="location">
                <LocationOnIcon />
                <p>
                  {authMember?.memberAddress
                    ? authMember?.memberAddress
                    : "no address"}
                </p>
              </div>
            </Box>
          </Box>
          <Box className="user-card-info">
            <input
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              className="cardNumber"
            ></input>
            <div className="card-second-inputs">
              <input
                type="text"
                name="cardDate"
                placeholder="Expire date"
                className="card-second-info"
              />
              <input
                type="text"
                name="CVV"
                placeholder="CVV"
                className="card-second-info"
              />
            </div>
            <input
              type="text"
              name="cardUser"
              placeholder="Card Holder's Name"
              className="cardUser"
            />
            <div className="card-types-box">
              <img src={"/icons/western-card.svg"} alt="" />
              <img src={"/icons/master-card.svg"} alt="" />
              <img src={"/icons/paypal-card.svg"} alt="" />
              <img src={"/icons/visa-card.svg"} alt="" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default OrderPage;
