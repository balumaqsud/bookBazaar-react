import React from "react";
import { Box, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CardItem } from "../../../libs/types/search";
import { Messages, serverApi } from "../../../libs/config";
import { sweetErrorHandling } from "../../../libs/sweetAlerts";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { Button, Card, Typography } from "@mui/joy";
import { KeyboardArrowRight } from "@mui/icons-material";

interface BasketProps {
  cardItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cardItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const itemsPrice: number = cardItems.reduce(
    (a: number, c: CardItem) => a + c.price * c.quantity,
    0
  );
  const shippingCost: number = itemsPrice <= 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(2);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderProcessHandler = async () => {
    try {
      handleClose();

      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cardItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cardItems.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Menu
        className="basket-manu"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "invisible",
            mt: 0,

            "& .MuiAvatar-root": {
              ml: -0.5,
              mr: 1,
              paddingTop: 0,

              backgroundColor: "black",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              margin: 0,
              paddingTop: 0,
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Card size="lg" variant="outlined" className="basket-frame">
          <Box className={"all-check-box"}>
            {cardItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack className="basket_all">
                <div>Card products</div>
                <Button
                  variant="soft"
                  color="warning"
                  onClick={() => onDeleteAll()}
                >
                  Clear All
                </Button>
              </Stack>
            )}
          </Box>
          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cardItems.map((item) => {
                const imagePath = `${serverApi}/${item.image}`;

                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <img
                      alt="fresh"
                      src={imagePath}
                      className={"product-img"}
                    />
                    <div className="info">
                      <Typography level="body-md">
                        {item.name.slice(0, 13) + "..."}
                      </Typography>
                      <Typography level="body-sm">
                        ${item.price} x {item.quantity}
                      </Typography>
                    </div>

                    <Box sx={{ minWidth: 100 }}>
                      <div className="col-2">
                        <Button
                          size="sm"
                          variant="plain"
                          color="warning"
                          onClick={() => {
                            console.log("clicked");
                            onRemove(item);
                          }}
                        >
                          -
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="plain"
                          color="success"
                          onClick={() => {
                            console.log("clicked");
                            onAdd(item);
                          }}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="plain"
                          color="danger"
                          onClick={() => {
                            console.log("clicked");
                            onDelete(item);
                          }}
                        >
                          x
                        </Button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cardItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <Typography color="neutral">Total: ${totalPrice}</Typography>
              <Button
                endDecorator={<KeyboardArrowRight />}
                variant={"soft"}
                color="success"
                onClick={orderProcessHandler}
              >
                Order
              </Button>
            </Box>
          ) : null}
        </Card>
      </Menu>
    </>
  );
}
