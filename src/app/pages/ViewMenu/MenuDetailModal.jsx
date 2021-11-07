import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopDetail,
  updateInfomationItem,
  createNewItem,
} from "../../store/actions/admin-action";
import { useEffect } from "react";
import useToast from "../../hooks/useToast";
import { useParams } from "react-router-dom";

const MenuDetailModal = forwardRef((props, ref) => {
  const param = useParams();
  const { toastSuccess, toastError } = useToast();
  const dispatch = useDispatch();

  const inputFileRef = useRef(null);

  const [menu, setItem] = useState({
    id: "",
    image: "",
    name: "",
    price: "",
    shopId: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isClickUpd, setIsClickUpd] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const notification = useSelector((state) => state.notification);

  useImperativeHandle(ref, () => ({
    open(id) {
      setIsOpen(true);

      if (id) {
        const item = props.items
          .filter((item) => item.itemId === id)
          .map((filteredItem) => {
            return filteredItem;
          });

        setItem({
          id: item[0].itemId,
          shopId: item[0].shopId,
          name: item[0].name,
          price: item[0].price,
        });

        if (item[0].image) {
          const url = `data:image/png;base64,${item[0].image}`;

          fetch(url)
            .then((res) => res.blob())
            .then((response) => {
              setItem((prevState) => {
                return {
                  ...prevState,
                  image: URL.createObjectURL(response),
                };
              });
            });
        }
      } else {
        setItem({
          shopId: param.shopId,
          name: "",
          price: "",
          image: "",
        });
      }
    },
  }));

  const chooseFile = (e) => {
    /*Selected files data can be collected here.*/
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setItem((state) => ({
        ...state,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };
  const requestChooseFile = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

  const { id, image, name, price, shopId } = menu;

  const editItem = () => {
    var formData = new FormData();
    formData.append("ShopId", shopId);
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Image", selectedFile);
    if (!!id) {
      formData.append("ItemId", id);
      dispatch(updateInfomationItem(formData));
    } else {
      dispatch(createNewItem(formData));
    }
    setIsClickUpd(true);
  };

  useEffect(() => {
    if (isClickUpd) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Update is success !");
        dispatch(getShopDetail(shopId));
        setIsOpen(false);
        setIsClickUpd(false);
        setSelectedFile(null);
      }
      if (notification.status === "completed" && notification.error) {
        toastError("Update is wrong !");
        setIsClickUpd(false);
      }
    }
  }, [isClickUpd, notification, shopId, dispatch, toastSuccess, toastError]);

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="menu-modify-modal"
    >
      <Modal.Header>Modify Menu</Modal.Header>
      <Modal.Content image>
        {menu && (
          <>
            <Image
              rounded
              fluid
              src={image || "https://dummyimage.com/900x900/ecf0f1/aaa"}
              wrapped
            />
            <Modal.Description>
              <Form size={"small"}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setItem((state) => ({
                        ...state,
                        name: e.target.value,
                      }));
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setItem((state) => ({
                        ...state,
                        price: e.target.value,
                      }));
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={requestChooseFile}
                  >
                    <Button>
                      <Icon name="upload" />
                      Upload File
                    </Button>
                    <Label basic pointing="left">
                      {image || "Please select image"}
                    </Label>
                  </Button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={inputFileRef}
                    onChange={chooseFile}
                    accept="image/*"
                  />
                </Form.Field>
              </Form>
            </Modal.Description>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={editItem}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
});

export default MenuDetailModal;
